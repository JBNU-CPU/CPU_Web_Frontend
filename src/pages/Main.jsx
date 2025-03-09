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
      margin-top : 50px;
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
      font: 400 18px "arial";
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
    @media screen and (min-width: 1024px) {
      width: 60%;
    }  
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
      margin: 20px 0 120px 0;
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

const Main = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const navigate = useNavigate();

  const handleRecruit = () => {
    // window.location.href =
    //   "https://docs.google.com/forms/d/e/1FAIpQLSdRVK-FqquWklAH8BZO69FnnGzRnioZ51jf3OpBXnUMGvDeUQ/viewform?usp=dialog";
    navigate("/recruit")
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/check-session`, {
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
      <Footer />
    </Wrap>
  );
};

export default Main;
