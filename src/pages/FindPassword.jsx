import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Login_Btn from "../components/Login_Btn";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import logo from '../Picture/CPU_logo_full.jpeg'
import axios from "axios";
const EmailBtn = styled.button`
    margin-top: 100px;
    background: white;
`

const FindPassword = () => {


    const handleEmail= async () => {

        try {
            console.log(`click`)
            const response = await axios.post("https://api.example.com/auth/send-code", {
                email: 'bsy8470@gmail.com'
            });
            console.log("인증 코드 전송 성공:", response.data);
        } catch (error) {
            console.error("인증 코드 전송 실패:", error);
        }
        
    }

    return(
        <EmailBtn onClick={handleEmail}>findpassword</EmailBtn>
    );
};

export default FindPassword;