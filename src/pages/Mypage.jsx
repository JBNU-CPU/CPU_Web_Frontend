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
`
const InfoMenu = styled.li`
    color: #BCC0CF;
    list-style: none;
    width : 40px;
    height : 30px;
    display : flex;
    align-items : center;
    background: transparent;
    font: 400 12px "arial";
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
        color:  #F5F7FF;
  }
`;

const NoStudyMessage = styled.p`
  color: #888;
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
    const [nickName, setnickName] = useState("");
    const [email, setEmail] = useState("");
    const [studies, setStudies] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        const fetchData = async () => {
            try {
                // Axios 요청에 쿠키 인증 정보를 포함하도록 설정
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true, // 쿠키를 포함하기 위해 설정
                });
            
                const { username, personName, nickName, email } = response.data;
            
                setPersonName(personName || ""); // 이름 설정
                setnickName(nickName || ""); // 닉네임 설정
                setEmail(email || ""); // 이메일 설정
                
                if (username) {
                    localStorage.setItem("username", username);
                }

                const studyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/mypage/studies`,{
                    withCredentials: true,
                });

                console.log("스터디 정보",studyResponse.data);

                setStudies(studyResponse.data || []);


            } catch (error) {
                console.error("마이페이지 데이터 로드 오류:", error);
                alert("마이페이지 정보를 불러오는 데 실패했습니다.");
            }
            
        };

        fetchData();
    }, []);

    //게시글로 이동
    const handleStudyOpen =(id)=> {
        navigate(`/studyinfo/${id}`);
    }

    const handleWithdraw = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/mypage/withdraw`, {
                    withCredentials: true, // 쿠키를 포함하여 인증
                });
                console.log("회원탈퇴 성공:", response.data);
                alert("회원탈퇴가 성공적으로 처리되었습니다.");
                // 탈퇴 후 초기 화면 또는 로그인 화면으로 이동
                window.location.href = "/";
            } catch (error) {
                console.error("회원탈퇴 실패:", error);
                alert("회원탈퇴 처리 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                        <Title>마이페이지</Title>
                </TitleWrapper>
                <Container>
                    <SubtitleWrapper>
                        <Subtitle>회원정보</Subtitle>
                        <StyledLink to="/revisememberinfo2">
                            수정
                            <RightIcon />
                        </StyledLink>
                    </SubtitleWrapper>
                    <Line/>
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
                    </MenuWrapper>
                    <SubtitleWrapper>
                        <Subtitle>개설/신청 스터디 목록</Subtitle>
                    </SubtitleWrapper>
                    <Line/>
                    <MenuWrapper>
                        <InfoWrapper>
                        {studies.length > 0 ? (
                            <StudyListContainer>
                            {studies.map((item) => (
                                <StudyItem key={item.id}>
                                <StudyButton onClick={() => handleStudyOpen(item.id)}>
                                    {item.name} <RightBtn/>
                                </StudyButton>
                                </StudyItem>
                            ))}
                            </StudyListContainer>
                        ) : (
                            <NoStudyMessage>개설/신청한 스터디가 없습니다</NoStudyMessage>
                        )}
                        </InfoWrapper>
                    </MenuWrapper>
                </Container>
                <Leave onClick={handleWithdraw}>회원탈퇴</Leave>
            </Wrapper>
            
        </>
    );
};

export default Mypage;