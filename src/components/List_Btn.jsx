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
  margin-top: 50px;
  margin-bottom: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.span``;

const List_Btn = ({navigation}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1); // 누르면 이동할 url주소
  };

  return (
    <Button onClick={onClick}>
      <Text>목록</Text>
    </Button>
  );
};

export default List_Btn;
