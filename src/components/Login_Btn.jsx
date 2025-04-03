import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background: ${({isActive}) => (isActive ? "#ab1a65" : "#6F7486")};
  text-align: center;
  font: bold 12px "arial";
  border: none;
  font-weight: 700;
  color: #e6e9f3;
  line-height: 12.5px;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease; /* 부드러운 전환 효과 추가 */

  &:hover {
    cursor: ${({isActive}) => (isActive ? "pointer" : "default")};
    box-shadow: ${({isActive}) => (isActive ? "0 0 10px rgba(171, 26, 101, 0.8)" : "none")}; /* 희미한 빛 효과 */
    transform: ${({isActive}) => (isActive ? "scale(1.05)" : "none")}; /* 살짝 확대 효과 */
  }
`;

const Complete_Btn = ({onClick, isActive}) => {
  return (
    <Button onClick={isActive ? onClick : null} isActive={isActive} type="submit">
      로그인
    </Button>
  );
};

export default Complete_Btn;
