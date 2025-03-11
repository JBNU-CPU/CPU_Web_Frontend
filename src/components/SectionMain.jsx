import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import axios from "axios";
import Pagination from './Pagination';


const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    @media screen and (min-width : 375px) {
      margin-inline: 20px;
    }
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  width: 100%;
  margin-top: 30px;
  font: bold 40px 'arial';
  @media screen and (max-width : 700px) {
      font-size: 30px;
      margin-bottom : 10px;
    }
`;

const Summary = styled.p`
    color: white;
    font: 400 14px 'arial';
    text-align: center;
    padding-bottom: 20px;
    @media screen and (min-width : 375px) {
      width:calc(80%);
    }
`;

const SubmitWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    width: calc(90%);
    border-bottom: 1.5px solid #ab1a65;
    margin: 0px;
    padding: 0px;
    margin-bottom: 40px;
`;

const SubmitButton = styled.button`
    position: relative;
    right: 10px;
    margin-bottom: 20px;
    width: 70px;
    height: 25px;
    border-radius: 10px;
    color: white;
    font: 600 10px 'arial';
    border: 1px solid #ab1a65;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(1); /* 살짝 확대 */
        a{
            color: gray;
        }
    }
`;

const ContentWrapper = styled.div`
    width: calc(90%);
    height: auto;
    &:hover {
        cursor: pointer;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    height: auto;
    border-radius: 15px;
    border: 1px solid #424755;
    padding: 0;
    margin: 0;
    margin-bottom: 30px;
    background: #1B1B25;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(1); /* 살짝 확대 */
    }
`;

const Head = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px 10px 30px;
    align-items: center;
    background: none;
`;

const RecruitState = styled.div`
    width: 50px;
    height: 20px;
    color: white;
    border: 1px solid #ab1a65;
    border-radius: 15px;
    font: 500 10px 'arial';
    text-align: center;
    line-height: 20px;
    background: none;
`;

const StudyName = styled.p`
    font: 500 14px 'arial';
    color: #ab1a65;
    padding: 0;
    margin: 0;
    background: none;
`;

const Teacher = styled.p`
    font: 500 10px 'arial';
    color: white;
    background: none;
    margin: 0;
    margin-left: 35px;
    margin-bottom: 10px;
    &.last{
      margin-bottom: 20px;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SectionMain = () => {
  const [studyData, setStudyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/study?studyType=session&page=${currentPage - 1}&size=${itemsPerPage}`, {
            withCredentials: true,
          }
        );
        const filteredData = (response.data.content || []).filter(item => item.isAccepted === true);
        console.log(filteredData);
        setStudyData(filteredData); // 필터링된 데이터만 저장
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("스터디 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchStudies();
  }, [currentPage]);

  const handleClick = (id) => {
    if (isAuthenticated) {
      console.log(`move to ${id}`);
      navigate(`/sectioninfo/${id}`);
    } else {
      alert("비회원은 접근 불가합니다.");
    }
  };

  const OpenClick = () => {
    if (isAuthenticated) {
      navigate("/sectionopen");
    } else {
      alert("비회원은 개설할 수 없습니다.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const convertEnglishToKoreanDays = (studyDays) => {
    if (!studyDays || !Array.isArray(studyDays)) return [];

    const dayMapping = {
      "Monday": "월요일",
      "Tuesday": "화요일",
      "Wednesday": "수요일",
      "Thursday": "목요일",
      "Friday": "금요일",
      "Saturday": "토요일",
      "Sunday": "일요일",
      "MON": "월요일",
      "TUE": "화요일",
      "WED": "수요일",
      "THU": "목요일",
      "FRI": "금요일",
      "SAT": "토요일",
      "SUN": "일요일",
  };

    return studyDays.map((dayString) => {
        // 불필요한 공백 제거 후 요일과 시간을 분리
        const parts = dayString.trim().split(/\s+/);
        if (parts.length < 2) return dayString; // 변환 실패 시 원본 유지

        const engDay = parts[0]; // 영어 요일
        const time = parts.slice(1).join(" "); // 시간 정보

        const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환

        return `${korDay} ${time}`;
    });
  };
  


  return (
    <Container>
      <Title>세션</Title>
      <Summary>동아리 회원이 다른 동아리 회원에게 강의 형식으로 지식을 제공하는 활동입니다</Summary>
      <SubmitWrapper>
        <SubmitButton type="button" onClick={OpenClick}>
          개설 신청
        </SubmitButton>
      </SubmitWrapper>
      {studyData.length > 0 ? (
        studyData.map((item) => (
          <ContentWrapper key={item.id} onClick={() => handleClick(item.id)}>
            <Content>
              <Head>
                <StudyName>{item.studyName || "세션 이름 없음"}</StudyName>
                <RecruitState>
                  {item?.currentCount === item?.maxMembers ? "모집완료" : "모집중"}
                </RecruitState>
              </Head>
                <Teacher >세션장 : {item.leaderName || "세션장 정보 없음"}</Teacher>
              <Wrapper>
              <Teacher>
                  {item.studyDays && item.studyDays.length > 0
                      ? convertEnglishToKoreanDays(item.studyDays).join(" / ")
                      : "세션 일정 없음"}
              </Teacher>
              </Wrapper>
              <Wrapper>
                <Teacher>장소 : {item.location}</Teacher>  
              </Wrapper>
              <Teacher className="last">현재 인원 : {item?.currentCount} / {item?.maxMembers || "미정"}</Teacher>
            </Content>
          </ContentWrapper>
        ))
      ) : (
        <p style={{color:"white", font:"bold 15px arial"}}>현재 등록된 세션이 없습니다.</p>
      )}
      <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
    </Container>
  );
};

export default SectionMain;
