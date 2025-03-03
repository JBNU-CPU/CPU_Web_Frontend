import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Footer from "../components/Footer"; 
import Slider from "../components/ImgSlider";
import room1 from "../Picture/CPU_Room.jpg";
import room2 from "../Picture/CPU_Room2.jpg";
import { BsGithub } from "react-icons/bs";
import map from "../Picture/map.png";
import logo from "../Picture/CPU_logo_full.jpeg";
import miss from "../managerpic/miss.jpg";
import img from '../managerpic/test.png';
import dj from '../managerpic/dj.jpeg';
import dh from '../managerpic/dh.jpeg';
import jh from '../managerpic/jh.jpeg';
import dy from '../managerpic/dy.jpeg';
import mk from '../managerpic/mk.jpeg';
import tj from '../managerpic/tj.jpeg';
import yj from '../managerpic/youjin.jpeg';
import jt from '../managerpic/jt.jpeg';
import h from '../managerpic/h.jpeg';
import s from '../managerpic/s.jpeg';
import dg from '../managerpic/dg.jpeg';
import sh from '../managerpic/sh.jpeg';
import ej from '../managerpic/ej.png';
import baek from '../managerpic/baek.png';

// 메인 컨테이너 스타일
const Container = styled.div`
  padding: 0 20px;
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  width: 100%;
  text-align: center;
  @media screen and (min-width : 768px) {
    gap: 20px;
  }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? 'gray' : 'white')};
  cursor: pointer;
  font: bold 14px 'arial';
  padding-bottom: 5px;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? '#ab1a65' : 'transparent')};
  &:hover {
    border-bottom: 2px solid #ab1a65;
  }
  @media screen and (min-width : 768px) {
    font: bold 18px 'arial';
  }
`;

// 이미지와 텍스트 스타일
const Section = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  margin: 10px 0;
  &.logo{
    width: calc(60%);
    @media screen and (min-width : 768px) {
      width: calc(60%);
    }
  }
`;

const Text = styled.p`
  font: normal 13px 'arial';
  margin: 15px 0;
  text-align: center;
  line-height: 1.5; 
  @media screen and (min-width : 768px) {
      font-size: 15px;
  }
`;

const SectionHeader = styled.h2`
  align-items: center;
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
  @media screen and (min-width : 768px) {
    font: bold 30px 'arial';
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.wide{
    display: flex;
    flex-direction: row;
    gap: 40px;
  }
`

const Img = styled.img`
  width: 150px;
  max-width: 150px;
  height: 200px;
  border-radius: 5px;
  display: block;
`

const Name = styled.p`
  color: white;
  font: bold 14px 'arial';
  &.stack{
    font : bold 12px 'arial';
    margin: 0;
    padding-bottom: 10px;
  }
`

const H2 = styled.h2`
  font: bold 25px 'arial';
  margin-top: 30px;
  padding: 2px;
  display:flex;
`

const Github = styled(BsGithub)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: white;
    background: transparent;

`;

const StyledLink = styled(Link)`
    background: transparent;

`;

// 섹션 컴포넌트
const AboutSection = () => (
  <Section>
    <Image src={logo} className='logo'/>
    <SectionHeader>Creative Personal computer User Club</SectionHeader>
    <Text>
      CPU는 전북대학교와 주도적인 개인 컴퓨터 사용자 모임으로써 지역 활성화에 힘쓰는 동아리로, 전북 지역 사회의 Computer Mind 가치 확산에 기여하고 있습니다.
    </Text>
    <Text>
      동아리 회원들은 학습 연구 및 평가 교육을 통해 프로그래밍 언어 및 컴퓨터 공학 지식을 체득할 수 있습니다.
    </Text>
  </Section>
);

const LocationSection = () => (
  <Section>
    <SectionHeader>동아리방 위치</SectionHeader>
    <Image src={map} alt="동아리방 위치" />
    <Text>전북대학교 제2학생회관 403호</Text>
    <SectionHeader>동아리방 내부</SectionHeader>
    <Image src={room1} alt="동아리방 내부" />
    <Image src={room2} alt="동아리 활동 모습" />
  </Section>
);

const ManagementSection = () => (
  <Section>
    <H2>회장단</H2>
    <Wrapper>
      <Img src={dy}/>
      <Name>회장 - 이다영</Name>
    </Wrapper>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={jt}/>
        <Name>부회장 - 이진태</Name>
      </Wrapper>
      <Wrapper>
        <Img src={dh}/>
        <Name>총무 - 박도현</Name>
      </Wrapper>
    </Wrapper>
    <H2>학술부</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={dj}/>
        <Name>부장 - 김동준</Name>
      </Wrapper>
      <Wrapper>
        <Img src={h}/>
        <Name>부원 - 안 현</Name>
      </Wrapper>
    </Wrapper>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
    </Wrapper>
    <H2>기획부</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={sh}/>
        <Name>부장 - 정서현</Name>
      </Wrapper>
      <Wrapper>
        <Img src={jh}/>
        <Name>부원 - 신재희</Name>
      </Wrapper>
    </Wrapper>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={dg}/>
        <Name>부원 - 이동규</Name>
      </Wrapper>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
    </Wrapper>
    <H2>복지부</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={tj}/>
        <Name>부장 - 박태정</Name>
      </Wrapper>
      <Wrapper>
        <Img src={yj}/>
        <Name>부원 - 김유진</Name>
      </Wrapper>
    </Wrapper>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>      
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
    </Wrapper>
    <H2>홍보부</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={mk}/>
        <Name>부장 - 채민경</Name>
      </Wrapper>
      <Wrapper>
        <Img src={s}/>
        <Name>부원 - 심은수</Name>
      </Wrapper>
    </Wrapper>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
      <Wrapper>
        <Img src={miss}/>
        <Name>부원 - 모집중</Name>
      </Wrapper>
    </Wrapper>
  </Section>
);

const DevelopeSection = () => (
  <Section>
    <H2>BackEnd</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={dh}/>
        <Name>박도현</Name>
        <Name className='stack'>Java, SpringBoot, Python, MySQL</Name>
        <StyledLink to="https://github.com/dodohy25n"><Github /></StyledLink>
      </Wrapper>
      <Wrapper>
        <Img src={h}/>
        <Name>안현</Name>
        <Name className='stack'>Java, SpringBoot, Python</Name>
        <StyledLink to="https://github.com/slyhyun"><Github /></StyledLink>
      </Wrapper>
    </Wrapper>
    <H2>FrontEnd</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={dj}/>
        <Name>김동준</Name>
        <Name className='stack'>Python, JS, React, ML/DL</Name>
        <StyledLink to="https://github.com/Coti00"><Github /></StyledLink>
      </Wrapper>
      <Wrapper>
        <Img src={baek}/>
        <Name>백서영</Name>
        <Name className='stack'>React</Name>
        <StyledLink to="https://github.com/BaekCCI"><Github /></StyledLink>
      </Wrapper>
    </Wrapper>
    <H2>EventGame</H2>
    <Wrapper className='wide'>
      <Wrapper>
        <Img src={ej}/>
        <Name>오예준</Name>
        <Name className='stack'>C++, C#, Unity</Name>
        <StyledLink to="https://github.com/ImYeJun"><Github /></StyledLink>
      </Wrapper>
    </Wrapper>
  </Section>
);

// 메인 컴포넌트
const App = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'location':
        return <LocationSection />;
      case 'management':
        return <ManagementSection />;
      case 'develope':
        return <DevelopeSection/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Slider title="CPU" content="전북대학교 중앙 컴퓨터동아리  CPU"/>
      <TabContainer>
          <TabButton isActive={activeTab === 'about'} onClick={() => setActiveTab('about')}>소개</TabButton>
          <TabButton isActive={activeTab === 'location'} onClick={() => setActiveTab('location')}>동아리방</TabButton>
          <TabButton isActive={activeTab === 'management'} onClick={() => setActiveTab('management')}>운영진</TabButton>
          <TabButton isActive={activeTab === 'develope'} onClick={() => setActiveTab('develope')}>개발자</TabButton>
      </TabContainer>
      <Container>
        {renderContent()}
      </Container>
      <Footer />
    </>
  );
};

export default App;
