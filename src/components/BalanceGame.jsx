import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

// 🔹 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 15px;
    font-size: 22px;
    background: white;
    font-family: "cat";
    margin-top: 0;
  }

  p {
    background: white;
    font-family: "cat";
    font-size: 16px;
    margin-bottom: 15px;
    &.small {
      color: #ab1a65;
      background: white;
      font-family: "cat";
      font-size: 12px;
      margin-bottom: 0;
    }
  }

  button {
    font-family: "cat";
    background: #ab1a65;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #9c155b;
    }
  }
  img {
    background: none;
    width: 100px;
    height: auto;
    padding: 0;
    filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.5));
  }
`;

// 🔹 체크박스 스타일
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
  font-family: "Arial";
  background: white;
  font-family: "cat";
  input {
    margin-right: 8px;
    cursor: pointer;
  }
`;

const BalanceGame = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dontShow = localStorage.getItem("dontShowAgain");

    // 🔹 "다시 보지 않기"를 체크하지 않은 경우만 모달 표시
    if (!dontShow) {
      setIsVisible(true);
    }
  }, []);

  // 🔹 "다시 보지 않기" 체크 시 상태 업데이트
  const handleCheckboxChange = e => {
    setDontShowAgain(e.target.checked);
  };

  // 🔹 "바로 가기" 클릭 시 /party 페이지로 이동
  const handleGoToParty = () => {
    if (dontShowAgain) {
      localStorage.setItem("dontShowAgain", "true"); // "다시 보지 않기" 선택 시 저장
    }
    setIsVisible(false);
    navigate("/party");
  };

  // 🔹 "닫기" 클릭 시
  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("dontShowAgain", "true"); // "다시 보지 않기" 선택 시 저장
    }
    setIsVisible(false);
  };

  return (
    isVisible && (
      <ModalOverlay>
        <ModalContent>
          <img src="/coboogi.png" alt="Coboogi" />
          <h2>코북이의 이주의 밸런스 게임</h2>
          <p>CPU 40주년 기념 이벤트가 열립니다!</p>

          <button onClick={handleGoToParty}>바로 가기</button>
          <button onClick={handleGoToParty}>바로 가기</button>

          <button onClick={handleClose} style={{background: "#ccc", marginLeft: "10px"}}>
            닫기
          </button>

          {/* 🔹 "다시 보지 않기" 체크박스 */}
          <CheckboxWrapper>
            <input type="checkbox" checked={dontShowAgain} onChange={handleCheckboxChange} />
            다시 보지 않기
          </CheckboxWrapper>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default BalanceGame;
