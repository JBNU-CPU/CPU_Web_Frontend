import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Login_Btn from "../components/Login_Btn";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import logo from '../Picture/CPU_logo_full.jpeg'
import axios from "axios";

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
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 90%;
    min-height: 250px;
    padding: 30px 0;
    @media screen and (min-width : 375px) {
        width: 70%;
    }
    @media screen and (min-width : 768px) {
        width: 50%;
    }
    @media screen and (min-width : 1024px) {
        width: 30%;
    }
`;
const Logo = styled.img`
    height: 70px;
    width: 70px;
`;
const Title = styled.p`
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

const Button = styled.button`
    align-items: center;
    border: none;
    border-radius: 5px;
    background: ${({ disabled }) => (disabled ? "#6F7486" : "#ab1a65")};
    font: normal 10px 'arial';
    padding: 5px 8px;
    color: white;
    margin: 5px 0 10px auto;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;


const checkIsValidMail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const FindPassword = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [isValidMail, setIsValidMail] = useState(false); //입력 형식이 이메일인지 확인
    const [isEmailSent, setIsEmailSent] = useState(false); //이메일이 보내졌는지
    const [code, setCode] = useState("");

    //코드 인증 완료 여부
    const [varified, setVerified] = useState(false);

    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    
    // 이메일 형식 검증 (이메일이 유효하면 true)
    useEffect(() => {
        setIsValidMail(checkIsValidMail(email));
    }, [email]);

    const handleEmailSend = async () => {
        try {
            const requestData = {
                username: userId,
                email: email
            };
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/find/validate-user`,
                JSON.stringify(requestData), 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("인증 코드 전송 성공:", response.data);
            alert("인증 코드가 전송되었습니다.");
            
            // 상태 업데이트
            setIsEmailSent(true);
        } catch (error) {
            console.error("인증 코드 전송 실패:", error);
            alert("아이디와 이메일을 다시 확인해주세요.")
        }
    };

    const handleCode = async () => {
        try {
            console.log("click");
    
            // FormData 생성
            const formData = new FormData();
            formData.append("email", email); // 임시 이메일일
            formData.append("code",code); // 임시 인증 코드
    
            // Axios POST 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/verify-code`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // FormData 전송 시 필수
                    },
                }
            );
    
            console.log("인증 완료:", response.data);
            alert("인증되었습니다.");
            setVerified(true);
        } catch (error) {
            console.error("인증 실패:", error);
            alert("올바르지 않은 코드입니다. 다시 입력해주세요.")
            setCode("")
        }
    }

    const handleChangePassWord = async () => {
        if(password !== checkPassword){
            alert("비밀번호가 일치하지 않습니다.");
            return
        }
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("newPassword",password);
    
            // Axios POST 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/find/reset-password`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // FormData 전송 시 필수
                    },
                }
            );
    
            console.log("변경완료 :", response.data);
            alert("비밀번호 변경이 완료되었습니다.");
        } catch (error) {
            console.error("인증 실패:", error);
            alert("변경에 실패하였습니다. 다시 시도해주세요");
            
            window.location.reload();
        }
    }

    return (
        <Wrapper>
            <Container>
                <Logo src={logo}/>
                <Title>비밀번호 찾기</Title>
                <ContentWrap>
                    {!varified?(
                        <>
                        <InputField 
                            type="text" 
                            placeholder="아이디(학번)을 입력해주세요"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <div style={{ height: "10px" }} />
                        <InputField 
                            type="text" 
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="button" onClick={handleEmailSend} disabled={!isValidMail}>
                            {isEmailSent ? "재전송" : "인증 요청"}
                        </Button>
                        {isEmailSent &&(
                            <>
                            <InputField 
                                type="text" 
                                placeholder="인증 코드를 입력해 주세요"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Button type="button" onClick={handleCode} disabled={!code}>
                                인증
                            </Button>
                            </>
                        )}
                        </>
                    ):(
                        <>
                        <InputField 
                            type="password" 
                            placeholder="새 비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ height: "10px" }} />
                        <InputField 
                            type="password" 
                            placeholder="비밀번호 확인"
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                        />
                        <Button 
                            type="button" 
                            onClick={handleChangePassWord}
                            disabled={password.length === 0 || checkPassword.length === 0}
                        >
                            완료
                        </Button>
                        </>
                    )}
                </ContentWrap>
            </Container>
        </Wrapper>
    );
};

export default FindPassword;