import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

// 스타일링 추가
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: transparent;
`;

const Title = styled.h2`
    font: bold 24px 'arial';
    color: white;
    margin-bottom: 20px;
`;

const Input = styled.input`
    color: white;
    width: 250px;
    padding: 10px;
    font: bold 16px 'arial';
    border: 2px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        cursor: pointer;
        border-color: #ab1a65;
    }
`;

const Button = styled.button`
    width: 260px;
    padding: 10px;
    margin-top: 15px;
    font: bold 16px 'arial';
    color: white;
    background-color: #ab1a65;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #c14484;
    }
`;

const Eventcode = () => {
    const [inputCode, setInputCode] = useState("");

    const handleCodeSubmit = async () => {
        if (!inputCode.trim()) {
            alert("이벤트 코드를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/event/eventcode?eventCode=${encodeURIComponent(inputCode)}`, // API URL
                {}, // POST 요청의 body (빈 객체 필요)
                {
                    withCredentials: true // 올바른 위치
                }
            );
            alert("코드가 성공적으로 전송되었습니다.");
        } catch (error) {
            console.error("코드 전송 오류:", error);
            alert("코드 전송에 실패했습니다.");
        }
    };

    return (
        <Container>
            <Title>이벤트 코드 입력</Title>
            <Input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="이벤트 코드를 입력하세요"
            />
            <Button type="button" onClick={handleCodeSubmit}>
                코드 설정
            </Button>
        </Container>
    );
};

export default Eventcode;
