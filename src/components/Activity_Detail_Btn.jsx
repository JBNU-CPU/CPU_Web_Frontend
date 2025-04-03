import React from "react";
import styled from "styled-components";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ab1a65;
  border-radius: 5px;
  background: none;
  font: bold 12px "arial";
  font-weight: 700;
  width: 70px;
  height: 30px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled(MdOutlineArrowForwardIos)`
  margin-left: 1px;
  font-size: 12.5px;
  color: white;
`;

const Text = styled.span`
  margin-left: 4px;
`;

const Activity_Detail_Btn = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/gallery"); // 누르면 이동할 url주소
  };

  return (
    <Button onClick={onClick}>
      <Text>Detail</Text>
      <Arrow />
    </Button>
  );
};

export default Activity_Detail_Btn;
