import React,{useState, useRef, useEffect, useContext} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import axios from "axios";
import { LuDot } from "react-icons/lu";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-block: 60px;
    cursor : default;
    @media screen and (min-width : 1024px) {
        margin-block: 0;
        margin-top : 100px;
    }
`;
const TitleWrapper = styled.div`
    margin: 20px 0 10px 0;
    padding: 0;
    background: transparent;
`
const Title = styled.p`
    color: white;
    background: transparent;
    font: bold 25px 'arial';
    @media screen and (min-width : 1024px) {
        font: bold 35px 'arial';
    }
`
const Container = styled.div`
    width : 90%;
    min-height : 200px;
    padding : 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    border-radius: 20px;
    @media screen and (min-width : 700px) {
      width : 60%;
      min-height : 250px;
    }
    @media screen and (min-width : 1024px) {
      width : 50%;
      min-height : 300px;
    }

`
const SubtitleWrapper = styled.div`
    background: transparent;
    width: 90%;
    height : auto;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items:center;
    margin-top : 10px;
    @media screen and (min-width : 1024px) {
       margin-top : 20px;
    }
`
const Subtitle = styled.p`
    color: #F5F7FF;
    font: normal 14px "arial";
    background: transparent;
    align-self : start;
    margin:0;
    @media screen and (min-width : 1024px) {
       font: normal 18px "arial";
    }
`

const StyledLink = styled(Link)`
    font: 400 12px 'arial';
    text-decoration: none;
    display : flex;
    align-items : center;
    background: transparent;
    color: #ab1a65;
    &:hover {
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
    @media screen and (min-width : 1024px) {
       font: normal 15px "arial";
    }
`;

const RightIcon = styled(FaChevronRight)`
    color: #ab1a65;
    background: transparent;
    height : 10px;
`

const MenuWrapper = styled.ul`
    width: 90%;
    background: none;
    margin : 0;
    padding:0;
    margin-bottom : 5px;
    
`
const InfoWrapper = styled.div`
    display: flex;
    background: transparent;
    flex-direction: row;
    flex-wrap: wrap;
    padding : 5px 0;
    align-items : center;
    width : 100%;
    &.no{
        justify-content: center;
    }
`
const InfoMenu = styled.li`
    color: #BCC0CF;
    list-style: none;
    width : 55px;
    height : 30px;
    display : flex;
    align-items : center;
    background: transparent;
    font: 400 12px "arial";
    padding-left: 10px;
    @media screen and (min-width : 1024px) {
       font: normal 14px "arial";
       width : 80px;
    }
`
const Info = styled.p`
    color: #878C9E;
    margin: 0;
    margin-left : 3px;
    height : 16px;
    background: transparent;
    font: 400 14px "arial";
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width : 100%;
    @media screen and (min-width : 1024px) {
       font: normal 16px "arial";
    }
`

const Leave = styled.p`
    margin-top : 30px;
    pad: 0;
    font: normal 12px 'arial';
    background: transparent;
    color: darkred;
    &:hover {
        cursor: pointer;
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`;
const Line = styled.div`
    width : 90%;
    height : 1px;
    background :#878C9E;
    margin: 5px 0 10px 0;
`
const StudyListContainer = styled.ul`
    margin : 0;
    padding: 0;
    background: none;
    list-style : none;
    width: 90%;
    display : flex;
    flex-direction : column;
    justify-content: center;

`;

const StudyItem = styled.li`
    background: none;
    margin-bottom : 10px;
    color : white;
    width: 90%;
    padding-left: 10px;
`;

const StudyButton = styled.button`
    background: none;
    color: #878C9E;
    border: none;
    padding : 5px 0;
    margin-left: 5px;
    cursor: pointer;
    display : flex;
    align-items : center;
    font-size :15px;
    &:hover {
        color:  #ab1a65;
  }
`;

const NoStudyMessage = styled.p`
  color: #888;
  background: transparent;
  font: 400 14px "arial";
`;
const RightBtn = styled(FaChevronRight)`
    margin-left : 10px;
    background: none;
    width: 12px;
    height: auto;
`

const Mypage = () => {
    const navigate = useNavigate();
    const [personName, setPersonName] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [openedStudies, setOpenedStudies] = useState([]); // 내가 개설한 스터디
    const [joinedStudies, setJoinedStudies] = useState([]); // 내가 참여한 스터디

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 🔹 마이페이지 회원 정보 가져오기
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true,
                });

                const { username, personName, nickName, email, phone } = response.data;
                setPersonName(personName || "");
                setNickName(nickName || "");
                setEmail(email || "");
                setPhone(phone || "");

                if (username) {
                    localStorage.setItem("username", username);
                }

                // 🔹 개설한 스터디 목록 가져오기
                const openedStudiesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/mypage/opened-studies`, {
                    withCredentials: true,
                });
                console.log("내가 개설한 스터디:", openedStudiesResponse.data);
                setOpenedStudies(openedStudiesResponse.data || []);

                // 🔹 참여한 스터디 목록 가져오기
                const joinedStudiesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/mypage/joined-studies`, {
                    withCredentials: true,
                });
                console.log("내가 참여한 스터디:", joinedStudiesResponse.data);
                setJoinedStudies(joinedStudiesResponse.data || []);

            } catch (error) {
                alert("마이페이지 정보를 불러오는 데 실패했습니다. 다시 로그인 해주세요.");
                navigate("/login");
            }
        };

        fetchData();
    }, []);

    // 게시글로 이동
    const handleStudyOpen = (id, studyType) => {
        if(studyType === "session"){
            navigate(`/sectioninfo/${id}`)
        }else{
            navigate(`/${studyType}info/${id}`);
        }
    };

    const handleWithdraw = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/mypage/withdraw`, {
                    withCredentials: true,
                });
                alert("회원탈퇴가 성공적으로 처리되었습니다.");
                window.location.href = "/";
            } catch (error) {
                console.error("회원탈퇴 실패:", error);
                alert("회원탈퇴 처리 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>마이페이지</Title>
            </TitleWrapper>
            <Container>
                <SubtitleWrapper>
                    <Subtitle>회원정보</Subtitle>
                    <StyledLink to="/revisememberinfo2">
                        수정 <RightIcon />
                    </StyledLink>
                </SubtitleWrapper>
                <Line />
                <MenuWrapper>
                    <InfoWrapper>
                        <InfoMenu>이름</InfoMenu>
                        <Info>{personName}</Info>
                    </InfoWrapper>
                    <InfoWrapper>
                        <InfoMenu>닉네임</InfoMenu>
                        <Info>{nickName}</Info>
                    </InfoWrapper>
                    <InfoWrapper>
                        <InfoMenu>이메일</InfoMenu>
                        <Info>{email}</Info>
                    </InfoWrapper>
                    <InfoWrapper>
                        <InfoMenu>전화번호</InfoMenu>
                        <Info>{phone}</Info>
                    </InfoWrapper>
                </MenuWrapper>

                {/* 🔹 개설한 스터디 목록 */}
                <SubtitleWrapper>
                    <Subtitle>내가 개설한 스터디</Subtitle>
                </SubtitleWrapper>
                <Line />
                <MenuWrapper>
                    <InfoWrapper>
                        {openedStudies.length > 0 ? (
                            <StudyListContainer>
                                {openedStudies.map((study) => (
                                    <StudyItem key={study.id}>
                                        <StudyButton onClick={() => handleStudyOpen(study.id, study.studyType)}>
                                            {study.name} <RightBtn />
                                        </StudyButton>
                                    </StudyItem>
                                ))}
                            </StudyListContainer>
                        ) : (
                            <InfoWrapper className="no">
                                <NoStudyMessage>개설한 스터디가 없습니다</NoStudyMessage>
                            </InfoWrapper>
                        )}
                    </InfoWrapper>
                </MenuWrapper>

                {/* 🔹 참여한 스터디 목록 */}
                <SubtitleWrapper>
                    <Subtitle>내가 참여한 스터디</Subtitle>
                </SubtitleWrapper>
                <Line />
                <MenuWrapper>
                    <InfoWrapper>
                        {joinedStudies.length > 0 ? (
                            <StudyListContainer>
                                {joinedStudies.map((study) => (
                                    <StudyItem key={study.id}>
                                        <StudyButton onClick={() => handleStudyOpen(study.id)}>
                                            {study.name} <RightBtn />
                                        </StudyButton>
                                    </StudyItem>
                                ))}
                            </StudyListContainer>
                        ) : (
                            <InfoWrapper className="no">
                                <NoStudyMessage>개설한 스터디가 없습니다</NoStudyMessage>
                            </InfoWrapper>
                        )}
                    </InfoWrapper>
                </MenuWrapper>
            </Container>
            <Leave onClick={handleWithdraw}>회원탈퇴</Leave>
        </Wrapper>
    );
};

export default Mypage;
