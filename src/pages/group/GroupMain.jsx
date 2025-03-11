import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { LuConstruction } from "react-icons/lu";
import { FaRegHandPointDown } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

// 🔹 아래에서 위로 올라오는 애니메이션
const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// 🔹 좌우에서 나타나는 애니메이션
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

// 🔹 반짝이는 애니메이션 (빛나는 효과)
const glow = keyframes`
    0% { text-shadow: 0 0 5px #fff, 0 0 10px #ff0077, 0 0 15px #ff0077; }
    50% { text-shadow: 0 0 10px #fff, 0 0 20px #ff0077, 0 0 30px #ff0077; }
    100% { text-shadow: 0 0 5px #fff, 0 0 10px #ff0077, 0 0 15px #ff0077; }
`;

// 🔹 팝퍼 흔들리는 애니메이션
const popperShake = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(5deg); }
`;

// 🔹 이미지가 위에서 아래로 떨어지는 애니메이션
const dropDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// ✅ Wrapper 스타일 동적 변경 가능
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    text-align: center;
    transition: margin-top 0.5s ease-in-out; /* ✅ margin-top 변경 시 애니메이션 효과 */
    
    ${({ isExpanded }) =>
        isExpanded
            ? css`
                  margin-top: 10px; /* ✅ 이벤트 발생 후 줄어든 margin-top */
                  @media screen and (min-width: 768px) {
                      margin-top: 80px;
                  }
              `
            : css`
                  margin-top: 130px;
                  @media screen and (min-width: 768px) {
                      margin-top: 150px;
                  }
              `}
`;

const Icon = styled(LuConstruction)`
    color: white;
    width: 100px;
    height: auto;
    transition: opacity 0.3s ease;
    @media screen and (min-width: 768px) {
        width: 200px;
    }
`;

const Text = styled.p`
    color: white;
    font: bold 20px "arial";
    margin: 0;
    margin-block: 20px;
    word-break: keep-all;
    box-sizing: border-box;
    @media screen and (min-width: 768px) {
        font: bold 30px "arial";
    }
`;

const Hand = styled(FaRegHandPointDown)`
    color: white;
    width: 40px;
    height: auto;
`;

// 🔹 이벤트 코드 스타일 (반짝이는 효과 추가)
const EventCodeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 150px;
    animation: ${fadeUp} 0.8s ease-out;
`;

const EventCode = styled.p`
    color: white;
    font: bold 24px "arial";
    margin: 0;
    animation: ${glow} 1.5s infinite alternate; /* 반짝이는 애니메이션 적용 */
`;

// 🔹 파티 팝퍼 아이콘 스타일 (흔들리는 애니메이션 추가)
const PopperLeft = styled(GiPartyPopper)`
    color: white;
    font-size: 30px;
    animation: ${fadeIn} 0.8s ease-in-out, ${popperShake} 1s infinite alternate;
`;

const PopperRight = styled(GiPartyPopper)`
    color: white;
    font-size: 30px;
    animation: ${fadeIn} 0.8s ease-in-out, ${popperShake} 1s infinite alternate-reverse;
`;

// 🔹 이벤트 이미지 (위에서 아래로 떨어지는 효과)
const EventImage = styled.img`
    width: 250px; /* ✅ 이미지 크기 */
    height: auto;
    margin-top: 20px;
    animation: ${dropDown} 0.8s ease-in-out;
`;

const Recruit = () => {
    return (
        <Wrapper >
                <>
                    <Icon/>
                    <Text>현재 공사 중 곧 오픈!</Text>
                </>
        </Wrapper>
    );
};

export default Recruit;
