import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionMain from "../components/SectionMain";
import StudyMain from "../components/StudyMain";
import ProjectMain from "../components/ProjectMain";
import MainPicture from "./Pic/StudyMain.png";
import Slider from "../components/ImgSlider";

const Container = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

const SelectWrapper = styled.ul`
  color: white;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 20px 0 0 0;
`;

const Select = styled.li`
  width: 100px;
  color: white;
  margin: 0px;
  padding: 5px 10px;
  text-align: center;
  border-bottom: 2px solid ${({isActive}) => (isActive ? "#ab1a65" : "transparent")};
  transition:
    color 0.3s ease,
    text-shadow 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    color: gray;
    cursor: pointer;
    text-shadow: 0 0 10px #d1cecf; /* 텍스트 희미하게 빛나는 효과 */
    transform: scale(1); /* 살짝 확대 */
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Study = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("section");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <Container>
      <Slider title="Study" content="세션 / 스터디 / 프로젝트" />
      <SelectWrapper>
        <Select isActive={activeTab === "section"} onClick={() => setActiveTab("section")}>
          세션
        </Select>
        <Select isActive={activeTab === "study"} onClick={() => setActiveTab("study")}>
          스터디
        </Select>
        <Select isActive={activeTab === "project"} onClick={() => setActiveTab("project")}>
          프로젝트
        </Select>
      </SelectWrapper>
      <MainWrapper>
        {activeTab === "section" && <SectionMain />}
        {activeTab === "study" && <StudyMain />}
        {activeTab === "project" && <ProjectMain />}
      </MainWrapper>
      <Footer />
    </Container>
  );
};

export default Study;
