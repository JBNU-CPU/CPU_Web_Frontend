import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(90%);
    margin: 250px auto auto auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

const Title = styled.p`
    color: white;
    font: bold 25px 'arial';
    background: transparent;
`;

const Container = styled.div`
    width: calc(80%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    
`

const StyledInput = styled.input`
    width: 100%;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-radius: 14px;
    margin: 10px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
    outline: none;
    &:focus {
        border: 2px solid #ab1a65;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 5px;
    background: ${({ disabled }) => (disabled ? "#6F7486" : "#ab1a65")};
    font: bold 14px 'arial';
    padding: 5px 7px;
    color: white;
    margin: 5px 0 10px;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    &.verified{
        align-self: flex-end;
    }
    &.next{
        margin-bottom: 30px;
        width: 50px;
    }
`;

const checkIsValidMail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);

const Revisememberinfo = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // 이메일 상태
    const [storedEmail, setStoredEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false); // 인증 여부 상태
    const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 인증 요청 여부
    const [code, setCode] = useState(""); // 인증 코드 상태

    const isValidMail = checkIsValidMail(email); // 이메일 유효성 검사

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true,
                });

                const { email } = response.data;
                setStoredEmail(email || ""); // 가져온 이메일 저장
                setEmail(email || ""); // 기본 입력값을 저장된 이메일로 설정
            } catch (error) {
                alert("마이페이지 정보를 불러오는 데 실패했습니다. 다시 로그인 해주세요.");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    // 이메일 인증 코드 요청
    const handleEmailSend = async () => {
        if (!isValidMail) {
            alert("올바른 이메일을 입력해주세요.");
            return;
        }

        if (email !== storedEmail){
            alert("등록된 이메일이 아닙니다!");
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
            console.error("이메일 전송 오류:", error.response?.data || error.message);
            alert(error.response?.data?.message || "이메일 전송 중 오류가 발생했습니다.");
        }
    };    

    // 인증 코드 검증
    const handleCodeVerification = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("code", code);
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/verify-code`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            console.log("이메일 인증 성공:", response.data);
            alert("이메일 인증이 완료되었습니다.");
            setIsVerified(true);
        } catch (error) {
            console.error("이메일 인증 오류:", error.response?.data || error.message);
            alert(error.response?.data?.message || "올바르지 않은 코드입니다. 다시 입력해주세요.");
            setCode("");
        }
    };
    

    // 다음 페이지 이동
    const handleNext = () => {
        if (isVerified) {
            navigate("/revisememberinfo2");
        }
    };

    return (
        <Wrapper>
            <Title>이메일 인증</Title>
            <Container>
                <StyledInput
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isVerified} // 인증 완료 시 이메일 변경 불가능
                />

                {!isVerified && (
                    <Button className="verified" onClick={handleEmailSend} disabled={!isValidMail || isEmailSent}>
                        {isEmailSent ? "재전송" : "인증 요청"}
                    </Button>
                )}

                {isEmailSent && !isVerified && (
                    <>
                        <StyledInput
                            type="text"
                            placeholder="인증 코드 입력"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button className="verified"  onClick={handleCodeVerification} disabled={!code}>
                            인증
                        </Button>
                    </>
                )}
            </Container>
 
            {/* 인증 완료 후 "다음" 버튼 활성화 */}
            <Button className="next" onClick={handleNext} disabled={!isVerified}>
                다음
            </Button>
        </Wrapper>
    );
};

export default Revisememberinfo;
