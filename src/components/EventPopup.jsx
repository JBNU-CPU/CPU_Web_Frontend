import React,{useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";
import AdminContext from '../AdminContext';
import axios from 'axios';

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1003;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  padding: 15px 0;
  border-radius: 8px;
  text-align: center;
  @media screen and (min-width: 768px) {
    width:60%;
  }  
  @media screen and (min-width: 1024px) {
    width:50%;
  }  
  p {
    margin: 0;
    margin-bottom: 10px;
    background:none;
    font: bold 14px 'arial';
    @media screen and (min-width: 768px) {
      font: bold 20px 'arial';
    }  
  }
  img{
    background: none;
    width:100px;
    height : auto;
    padding: 0;
    filter:drop-shadow(5px 5px 2px rgba(0,0,0,0.5));
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction : row;
  width: 100%;
  justify-content: space-between;
  background: none;
  align-items: center;
`

const PopupXBtn = styled(AiOutlineClose)`
  margin: 0 10px;
  width:20px;
  height: 20px;
  cursor: pointer;
  background:none;
  color: black;
  border: none;
  border-radius: 5px;
`
const RankingBtn = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  padding: 0 10px;
  filter:drop-shadow(1px 1px 0.5px rgba(0,0,0,0.5));
`

const PopupBtn = styled.button`
  margin: 10px;
  width: fit-content;
  cursor: pointer;
  padding:8px 20px;
  background:  #4CAF50;
  color: white;
  font: bold 16px 'arial';
  border: none;
  border-radius: 5px;
`;

const EventPopUp = ({ showPopup, setShowPopup, closeMenu }) => {
  const navigate = useNavigate();
  const [secretCode, setSecretCode] = useState("1234"); // 기본값 설정

  useEffect(() => {
    const fetchSecretCode = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/eventcode`);
        if (response.data) {
          setSecretCode(response.data); // API 응답이 있으면 설정
        } else {
          setSecretCode("1234"); // 응답이 없으면 기본값 사용
        }
      } catch (error) {
        console.error("코드 불러오기 오류:", error);
        setSecretCode("1234"); // 요청 실패 시 기본값 사용
      }
    };

    fetchSecretCode();
  }, []);

  // secretCode 값이 변경될 때마다 로그 출력
  useEffect(() => {
    console.log(`secretCode : ${secretCode}`);
    console.log(`type : ${typeof(secretCode)}`);
  }, [secretCode]); // secretCode가 변경될 때마다 실행

  const handlePlay = () => {
    let inputCode;
    while (true) {
      inputCode = window.prompt("코드를 입력해주세요!");
      if (inputCode === null) {
        return;
      } else if (inputCode === String(secretCode)) {
        handleNavigateToEventGame();
        return;
      } else {
        alert("🚨 코드가 올바르지 않습니다. 다시 입력해주세요.");
      }
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    closeMenu();
  };

  const handleNavigateToEventGame = () => {
    navigate("/eventGame", { state: { isInputPw: true } });
    setShowPopup(false);
    closeMenu();
  };

  const handleNavigateToEventRank = () => {
    navigate("/gameRank");
    setShowPopup(false);
    closeMenu();
  };

  if (!showPopup) return null;

  return (
    <Popup onClick={handlePopupClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <Wrap>
          <RankingBtn onClick={handleNavigateToEventRank}>🏆</RankingBtn>
          <PopupXBtn onClick={handlePopupClose} />
        </Wrap>
        <img src="/coboogi.png" alt="Coboogi" />
        <p>코북이 게임</p>
        <PopupBtn onClick={handlePlay}>Play!</PopupBtn>
      </PopupContent>
    </Popup>
  );
};

export default EventPopUp;

