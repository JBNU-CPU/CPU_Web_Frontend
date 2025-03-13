import React,{useState,useRef,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import Header from "../components/Header";
import Complete_Btn from "../components/Complete_Btn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-block: 250px;
`

const Container = styled.main`
    height: auto;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: rgba(255, 255, 255, 0.1); /* 반투명한 배경 */
    backdrop-filter: blur(10px); /* 블러 효과 */
    border-radius: 5px;
`

const MainName = styled.p`
    font: bold 30px 'arial';
    color: white;
    background: none;
    padding-top: 10px;
`
const NickText = styled.p`
    padding: 0px;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 260px;
`
const IDText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 230px;
`

const PasswordText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 250px;
`

const RePasswordText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 220px;
`


const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border : 2px solid transparent;
    border-radius: 14px;
    margin: 25px;
    margin-top: 0;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
    outline: none; /* 기본 브라우저 outline 제거 */

    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const CompleteWrapper = styled.div`
    margin: 0;
    padding: 0;
    padding-top: 15px;
    background: none;
`

const QuestWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
`

const Quest = styled.p`
    font: bold 12px 'arial';
    background: none;
    color: white;
    padding : 20px 20px;
`

const StyledLink = styled(Link)`
    background: none;
    color: #ab1a65;
    text-decoration: none;
    font: bold 12px 'arial';
    &.login:hover{
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`

const Wrong = styled.p`
    font: bold 10px 'arial';
    color: #ab1a65;
    background: transparent;
    padding-bottom: 15px;
`
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

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBox = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const ModalText = styled.p`
    background: transparent;
    font: bold 14px 'arial';
    color: black;
    margin-bottom: 20px; 
`;

const CloseButton = styled.button`
    background: #ab1a65;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font: bold 12px 'arial';
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #d12b7f;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 5px;
    background: ${({ disabled }) => (disabled ? "#6F7486" : "#ab1a65")};
    font: normal 10px 'arial';
    padding: 5px 8px;
    color: white;
    margin: 5px 0 10px auto;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    margin-right: 30px;
`;


const checkIsValidMail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Join2 = () => {
    const [nickName, setNickName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [personName, setPersonName] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [isValidMail, setIsValidMail] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [code, setCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true); // 가입 안내 모달

    const navigate = useNavigate();
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setIsValidMail(checkIsValidMail(email));
    }, [email]);

    // 이메일 인증 요청
    const handleEmailSend = async () => {
        if (!isValidMail) {
            alert("올바른 이메일을 입력해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/send-code`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("인증 코드 전송 성공:", response.data);
            alert("인증 코드가 이메일로 전송되었습니다.");
            setIsEmailSent(true);
        } catch (error) {
            console.error("인증 코드 전송 실패:", error);
            alert("이메일 전송 중 오류가 발생했습니다.");
        }
    };

    // 인증 코드 검증
    const handleCode = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("code", code);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/verify-code`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("인증 완료:", response.data);
            alert("이메일 인증이 완료되었습니다.");
            setIsVerified(true);
        } catch (error) {
            console.error("인증 실패:", error);
            alert("올바르지 않은 코드입니다. 다시 입력해주세요.");
            setCode("");
        }
    };

    // 회원가입 요청
    const onClick = async () => {
        if (!isVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        if (password !== repassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("nickName", nickName);
            formData.append("personName", personName);
            formData.append("email", email);
            formData.append("phone",phone);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200 || response.status === 201) {
                alert("회원가입이 완료되었습니다.");
                navigate("/login");
            }
        } catch (error) {
            console.error("회원가입 오류:", error);
            alert(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* 🔹 가입 안내 모달 */}
            {isModalOpen && (
                <ModalBackground>
                    <ModalBox>
                        <ModalText>
                            CPU 부원이신 분들만 회원가입이 가능합니다! <br /> <br />
                            CPU 부원 확인 후 승인 절차를 통해 회원가입이 이루어집니다! <br /> <br />
                            혹시 회원가입하셨지만 3일 이내에 승인이 되지 않으신 분들은 오픈카톡으로 문의해주세요!
                        </ModalText>
                        <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
                    </ModalBox>
                </ModalBackground>
            )}

            <Wrapper>
                <Container>
                    <MainName>Join</MainName>
                    <StyledInput type="text" placeholder="아이디(학번)" ref={firstInputRef} value={username} onChange={(e) => setUsername(e.target.value)} />

                    <StyledInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <StyledInput type="password" placeholder="비밀번호 확인" value={repassword} onChange={(e) => setRepassword(e.target.value)} />

                    <StyledInput type="text" placeholder="닉네임" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                    <StyledInput type="text" placeholder="이름" value={personName} onChange={(e) => setPersonName(e.target.value)} />
                    <StyledInput type="text" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    {/* 🔹 이메일 인증 추가 */}
                    <StyledInput type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button onClick={handleEmailSend} disabled={!isValidMail || isVerified}>
                            {isEmailSent ? "재전송" : "인증 요청"}
                        </Button>

                    {isEmailSent && !isVerified && (
                        <>
                            <StyledInput type="text" placeholder="인증 코드 입력" value={code} onChange={(e) => setCode(e.target.value)} />
                            <Button onClick={handleCode} disabled={!code}>인증</Button>
                        </>
                    )}

                    <CompleteWrapper>
                        <Complete_Btn onClick={onClick} isActive={isVerified} />
                    </CompleteWrapper>

                    <QuestWrapper>
                        <Quest>이미 계정이 있으신가요?</Quest>
                        <StyledLink className="login" to="/login">로그인</StyledLink>
                    </QuestWrapper>
                </Container>
            </Wrapper>

            {/* 🔹 로딩 모달 */}
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>회원가입 중..</LoadingText>
                </Overlay>
            )}
        </>
    );
};

export default Join2;
