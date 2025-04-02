import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background: #ab1a65;
  text-align: center;
  font: bold 12px "arial";
  border: none;
  font-weight: 700;
  color: #e6e9f3;
  line-height: 12.5px;
  &:hover {
    cursor: pointer;
  }
`;

const Resend_Btn = ({onClick}) => {
  return <Button onClick={onClick}>재발송</Button>;
};

export default Resend_Btn;
