import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Save from "../components/Save";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    margin-top: 200px;
    margin-bottom: 40px;
`;

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    border-radius: 20px;

`

const IDWrapper = styled.div`
    padding: 0;
    margin: 50px 0 0 0;
    width: 300px;
    height : 18px;
    display: flex;
    flex-direction: row;
    background: transparent;
`

const Line = styled.div`
    padding: 0;
    margin: 0;
    width: 340px;
    border-top: 2px solid gray;
    margin-top: 15px;
`

const ID = styled.p`
    padding: 0;
    margin: 0;
    font: bold 14px 'arial';
    color: white;
    padding-right: 20px;
    background: transparent;

`
const ApiId = styled.p`
    font: 400 14px 'arial';
    color : #878C9E;
    margin: 0;
    padding:0;
    background: transparent;

`
const Wrapper = styled.div`
    margin: 10px 0;
    padding: 0;
    width: 320px;
    height : auto;
    background: transparent;

`

const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1); /* 투명 배경 */
    border : 2px solid transparent;
    border-radius: 14px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
    outline: none; /* 기본 브라우저 outline 제거 */
    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const Text = styled.p`
    padding: 10px;
    padding-left: 15px;
    margin: 0;
    color: white;
    font: bold 14px 'arial';
    background: transparent;

`

const SaveWrapper = styled.div`
    padding: 0;
    margin: 0;
    padding-top: 40px;
    padding-bottom: 80px;
    background: transparent;

`

const Wrong = styled.p`
    font: bold 10px 'arial';
    color: #ab1a65;
    background: transparent;
    padding-bottom: 15px;
`

// ID자리에 api에서 가져온 id를 넣기 {id}
const ReviseMemInfo2 = () => {
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [phone, setPhone] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [currentNickName, setCurrentNickName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPhone, setCurrentPhone] = useState("");
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem("username");
    const shouldShowPasswordError = password && repassword && password !== repassword;    

    useEffect(() => {
        // 기존 정보 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true,
                });
                const { personName, nickName, email, phone } = response.data;

                // 기존 정보 상태에 저장
                setCurrentName(personName || "");
                setCurrentNickName(nickName || "");
                setCurrentEmail(email || "");
                setCurrentPhone(phone || "");
            } catch (error) {
                console.error("기존 정보 로드 실패:", error);
                alert("회원 정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        // 수정할 데이터 생성
        const payload = {
            nickName: nickName || currentNickName, // 입력값 없으면 기존 값 사용
            personName: name || currentName,
            email: email || currentEmail,
            password: password || undefined, // 비밀번호는 선택적 필드
            phone : phone || currentPhone
        };

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/mypage`,
                payload,
                {
                    withCredentials: true, // 인증 정보 포함
                }
            );
            console.log("회원정보 수정 성공:", response.data);
            alert("회원정보가 성공적으로 수정되었습니다.");
            navigate("/mypage"); // 마이페이지로 이동
        } catch (error) {
            console.error("회원정보 수정 실패:", error);
            alert("회원정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <MainWrapper>
                <Container>
                    <IDWrapper><ID>사용자 아이디(학번)</ID><ApiId>{storedUsername}</ApiId></IDWrapper>
                    <Line></Line>
                    <Wrapper>
                        <Text>이름</Text>
                        <StyledInput
                            type="text"
                            placeholder={currentName || "이름을 입력해주세요"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Text>닉네임</Text>
                        <StyledInput
                            type="text"
                            placeholder={currentNickName || "닉네임을 입력해주세요"}
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Text>이메일</Text>
                        <StyledInput
                            type="email"
                            placeholder={currentEmail || "이메일을 입력해주세요"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Text>전화번호</Text>
                        <StyledInput
                            type="text"
                            placeholder={currentPhone || "전화번호를 입력해주세요"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Text>비밀번호</Text>
                        <StyledInput
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Text>비밀번호 확인</Text>
                        <StyledInput
                            type="password"
                            placeholder="비밀번호를 다시 입력해주세요"
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                        />
                    </Wrapper>
                    {shouldShowPasswordError && <Wrong>비밀번호가 틀립니다</Wrong>}
                    <SaveWrapper>
                        <Save isActive={true} onClick={handleSave} />
                    </SaveWrapper>
                </Container>
            </MainWrapper>
    
        </>
    );
};

export default ReviseMemInfo2;
