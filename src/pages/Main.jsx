import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/ImgSlider";
import Detail_Btn from "../components/Detail_Btn";
import studyImg from "../components/SliderImg/img1.png";
import networkingimg from "../components/img/networking.jpg";
import sectionimg from "../components/img/section.jpg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const MainWrap = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
  h1 {
    background-color: rgba(0, 0, 0, 0);
    color: #f5f7ff;
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 0;
    border-bottom: 2px solid #ab1a65;
    padding: 0px 20px 10px 20px;
    &.bottom {
      border: none;
      margin-top : 40px;
      margin-bottom : 30px;
    }
    @media screen and (min-width: 768px) {
      font-size: 40px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 50px;
      margin-top:50px;
    }
  }
  p {
    background-color: rgba(0, 0, 0, 0);
    color: #f5f7ff;
    font: 400 13px "arial";
    line-height: 2;
    margin: 0;
    text-align: center;
    padding-block: 10px;
    @media screen and (min-width: 768px) {
      width: 90%;
      font: 400 15px "arial";
      line-height: 2;
    }
    @media screen and (min-width: 1024px) {
      width: 85%;
      font: 400 16px "arial";
      line-height: 2;
      margin: 15px 0;
    }  
  }
  img {
    width: 100%;
    aspect-ratio: 5/3;
    margin: 20px 0 0 0;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  background: #ab1a65;
  font: bold 12px "arial";
  width: 100px;
  height: 35px;
  color: white;
  margin: 10px 0 80px 0;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(171, 26, 101, 0.8);
    transform: scale(1.05);
  }
  @media screen and (min-width: 1024px) {
      width: 120px;
      height : 45px;
      font: bold 16px "arial";
      margin-bottom : 100px;
  }  
  
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #c5bfc2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: 0 0 15px #c5bfc2;
    transform: scale(1.1);
  }
  svg {
    font-size: 24px;
	background: transparent;
  }
`;

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
    margin-bottom: 20px;
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
const PopupXBtn = styled(AiOutlineClose)`
  align-self: flex-end;
  margin: 0 10px;
  width:25px;
  height: 25px;
  cursor: pointer;
  background:none;
  color: black;
  border: none;
  border-radius: 5px;
`

const PopupBtn = styled.button`
  margin: 10px;
  width: fit-content;
  cursor: pointer;
  padding:8px 20px;
  background: #4CAF50;
  color: white;
  font: bold 16px 'arial';
  border: none;
  border-radius: 5px;
`;

const EventPopUp = ({ showPopup, onClose, onPlay }) => {
  if (!showPopup) return null;

  return (
    <Popup onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <PopupXBtn onClick={onClose} />
        <img src="/coboogi.png" alt="Coboogi" />
        <p>코북이 게임</p>
        <PopupBtn onClick={onPlay}>Play!</PopupBtn>
      </PopupContent>
    </Popup>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handlePopupClose = () => {
    setShowPopup(false); // 팝업을 닫는 함수
  };

  const handleNavigateToEventGame = () => {
    navigate('/eventGame'); // EventGame 페이지로 이동
    setShowPopup(false); // 팝업 닫기
  };



  const handleRecruit = () => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSdRVK-FqquWklAH8BZO69FnnGzRnioZ51jf3OpBXnUMGvDeUQ/viewform?usp=dialog";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get('https://api.jbnucpu.co.kr/api/check-session', {
        withCredentials: true, // 필요한 경우 쿠키를 포함한 요청
      });
  
      // 세션 데이터 콘솔에 출력
      console.log('Session Data:', response.data); // 응답 데이터 출력
    } catch (err) {
      // 오류가 발생하면 오류 메시지 출력
      console.error('세션 확인 중 오류 발생:', err);
    }
  };

  return (
    <Wrap>
      <Slider title={"Creative Personal computer\nUser Club"} content="전북대학교 중앙 컴퓨터동아리  CPU" isMain={true} />
      <MainWrap>
        <h1>CPU</h1>
        <p>
          전북대학교 중앙동아리 유일 학술 컴퓨터 동아리인 CPU는 전북 지역 컴퓨터
          동아리의 선구자로서 주도적인 역할을 해왔으며, 다양한 배경을 가진
          학생들과 교류하며 서로가 배울 수 있는 가르침의 장을 만들어가고
          있습니다.
        </p>
        <Detail_Btn navigation="about" />
        <h1>Study</h1>
        <img src={studyImg} alt="study" />
        <p>
          부원들의 코딩 역량 향상을 위한 세션,스터디,프로젝트를 운영하고
          있습니다.
        </p>
        <Detail_Btn navigation="studymain" />
        <h1>Activity</h1>
        <img src={networkingimg} alt="study" />
        <p>
          격주로 진행되는 세미나를 통해 부원들과 함께 소통하고 서로의 지식을
          공유하는 자리를 마련하고 있습니다.
        </p>
        <img src={sectionimg} alt="study" />
        <p>
          학기 말 CPU 데이를 개최하여 세션,스터디,프로젝트를 통해 이뤄낸
          부원들의 성과를 독려하는 시간을 갖고 있습니다.
        </p>
        <Detail_Btn navigation="gallery" />
        <h1 className="bottom">CPU와 함께하고 싶다면</h1>
        <Button onClick={handleRecruit}>
          지원하기
        </Button>
      </MainWrap>
      {isScrollVisible && (
        <ScrollToTopButton onClick={scrollToTop}>
          <MdKeyboardArrowUp />
        </ScrollToTopButton>
      )}
      {/* 팝업 모달 */}
      <EventPopUp 
        showPopup={showPopup} 
        onClose={handlePopupClose} 
        onPlay={handleNavigateToEventGame} 
      />
      <Button onClick={checkSession}>세션 확인</Button>
      <Footer />
    </Wrap>
  );
};

export default Main;
