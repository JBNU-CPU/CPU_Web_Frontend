import React from "react";
import styled, {keyframes} from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
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

const SpinnerAnimation = styled.div`
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

const Spinner = ({text = "로딩 중..."}) => (
  <SpinnerWrapper>
    <SpinnerAnimation />
    <LoadingText>{text}</LoadingText>
  </SpinnerWrapper>
);

export default Spinner;
