import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { LuConstruction } from "react-icons/lu";
import { FaRegHandPointDown } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import pic from './Pic/eventpic.jpeg'; // ✅ 이미지 추가

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
    const [clickCount, setClickCount] = useState(0);
    const [showEventCode, setShowEventCode] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // ✅ margin-top 변경 상태
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        if (clickCount + 1 === 10) {
            setShowEventCode(true); // 10번 클릭하면 코드 보이기

            // ✅ 1초 후 이미지 등장
            setTimeout(() => {
                setShowImage(true);
            }, 1000);

            // ✅ 2초 후 margin-top 변경
            setTimeout(() => {
                setIsExpanded(true);
            }, 2000);
        }
        setClickCount(clickCount + 1);
    };

    useEffect(() => {
        const detectDevTools = () => {
          const threshold = 160; // 개발자 도구 창 크기 기준
          if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
          ) {
            setIsVisible(false); // 개발자 도구가 열리면 요소 숨김
          }
        };
      
        window.addEventListener("resize", detectDevTools);
        detectDevTools();
      
        return () => window.removeEventListener("resize", detectDevTools);
      }, []);

      return (
        <>
            {isVisible && ( // ✅ 개발자 도구 감지 시 Recruit 컴포넌트 숨김
                <Wrapper isExpanded={isExpanded}>
                    <Icon/>
                        <Text>현재 모집은 중단되었습니다! <br /> CPU와 함께하고 싶으신 분은 아래 오픈카톡으로 문의해주세요!</Text>
                        <Hand />
                        <Text>
                            <a
                                href="https://open.kakao.com/o/sBm1PnEg"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "white", textDecoration: "underline" }}
                            >
                                오픈카카오톡으로 이동하기
                            </a>
                        </Text>
                </Wrapper>
            )}
        </>
    );
};

export default Recruit;
