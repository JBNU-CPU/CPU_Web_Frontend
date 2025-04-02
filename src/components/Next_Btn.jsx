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
  &:hover {
    cursor: ${({isActive}) => (isActive ? "pointer" : "default")};
  }
`;

const Next_Btn = ({onClick, isActive}) => {
  return (
    <Button onClick={isActive ? onClick : null} isActive={isActive}>
      다음
    </Button>
  );
};

export default Next_Btn;
