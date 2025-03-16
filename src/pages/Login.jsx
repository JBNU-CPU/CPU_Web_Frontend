import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Login_Btn from "../components/Login_Btn";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import logo from '../Picture/CPU_logo_full.jpeg'
import AdminContext from "../AdminContext";
import InputField from "../components/InputField";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
`;

const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 90%;
    @media screen and (min-width : 375px) {
        width: 70%;
    }
    @media screen and (min-width : 768px) {
        width: 40%;
    }
    @media screen and (min-width : 1024px) {
        width: 30%;
    }
`;

const MainName = styled.p`
    font: bold 20px "arial";
    color: white;
    background: transparent;
    margin: 5px 0 20px 0;
    &.year{
        margin: 0;
        font: bold 8px 'arial';
    }
`;
const ContentWrap = styled.div`
    width: 90%;
    background: none;
    display: flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;
`


const FindPassWrapper = styled.div`
    text-align: right;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 20px;
    background: transparent;
`;

const FindPass = styled.p`
    color: white;
    cursor: pointer;
    font-size: normal;
    background: transparent;
    &:hover {
        color: gray;
    }
`;

const JoinWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
    background: transparent;
`;

const StyledLink = styled(Link)`
    color: #ab1a65;
    text-decoration: none;
    font: normal 12px "arial";
    background: transparent;
    &.signup:hover {
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`;


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* 상위 레이어에 표시 */
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top: 5px solid #ab1a65;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 20px; /* 아래 텍스트와 간격 */
`;

const LoadingText = styled.p`
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
`;

const Logo = styled.img`
    height: 70px;
    width: 70px;
    margin: 30px 0 0 0;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const firstInputRef = useRef(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const {setIsAdmin} = useContext(AdminContext);
    const {Id, setId} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/loginProc`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // 쿠키 포함
                body: JSON.stringify({ username: username, password: password })
            });
        
            if (response.ok) {
                // JSON 데이터로 변환
                const data = await response.json();
                // role과 userId 가져오기
                const { role, userId } = data;
        
                // 로컬스토리지에 userId 저장
                setId(userId);
                // localStorage.setItem("userId", userId);
                
                // role에 따라 관리자 여부 설정
                if (role === "ROLE_ADMIN") {
                    setIsAdmin(true);
                    setIsAuthenticated(true);
                } else if (role === "ROLE_GUEST") {
                    setIsAdmin(false);
                    setIsAuthenticated(false);
                } else if (role === "ROLE_MEMBER") {
                    setIsAdmin(false);
                    setIsAuthenticated(true);
                }
                
        
                alert("로그인 되었습니다.");


                // 홈으로 이동
                navigate("/");
            } else {
                console.error("Response error:", response.status, response.statusText);
                alert("로그인 실패!");
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error.message);
            alert("로그인 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };
    

    
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const isButtonActive = username.trim() && password.trim();

    return (
        <>
            <Wrapper>
                <Container onSubmit={handleLogin}>
                    <Logo src={logo}/>
                    <MainName>CPU</MainName>
                    <ContentWrap>
                        <InputField 
                            type="text" 
                            placeholder="아이디를 입력해주세요"
                            ref={firstInputRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div style={{ height: "10px" }} />
                        <InputField 
                            type="password" 
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FindPassWrapper>
                            <StyledLink to="/findpassword">
                                <FindPass>비밀번호 찾기</FindPass>
                            </StyledLink>
                        </FindPassWrapper>
                            <Login_Btn
                                type="submit"
                                isActive={isButtonActive && !isLoading}
                                disabled={!isButtonActive || isLoading}
                            >
                                {isLoading ? "로그인 중..." : "로그인"}
                            </Login_Btn>
                        <JoinWrapper>
                            <StyledLink className='signup' to="/join2">회원가입</StyledLink>
                        </JoinWrapper>
                    </ContentWrap>
                </Container>
            </Wrapper>
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>로그인 중...</LoadingText>
                </Overlay>
            )}
        </>
    );
};

export default Login;
