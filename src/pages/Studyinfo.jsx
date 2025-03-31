import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import AdminContext from "../AdminContext";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px auto 50px auto;
  padding: 0;

  button:hover {
    cursor: pointer;
  }
`;

const Subtitle = styled.div`
  color: #bcc0cf;
  font: 700 14px "arial";
  margin-left: 20px;
`;

const HeadWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #6f7486;
`;

const MainTitle = styled.p`
  font: 700 20px "arial";
  color: white;
  margin-left: 20px;
`;

const RecuruitState = styled.p`
  width: 50px;
  height: 20px;
  border: 1px solid #ab1a65;
  border-radius: 15px;
  color: white;
  font: 500 10px "arial";
  text-align: center;
  line-height: 20px;
  margin-right: 20px;
`;

const IntroWrapper = styled.div`
  margin-top: 40px;
`;

const IntroTitle = styled.p`
  color: white;
  font: 700 14px "arial";
  margin: 0 20px 10px 20px;
`;

const IntroContent = styled.p`
  font: 400 12px "arial";
  color: #bcc0cf;
  margin: 0 25px;
`;

const ButtonContainer = styled.div`
  border-top: 1px solid gray;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApplicateButton = styled.button`
  width: 100px;
  height: 35px;
  background: #ab1a65;
  border: none;
  color: white;
  margin-top: 50px;
  font: 500 15px "arial";
  border-radius: 12px;
  margin-bottom: 100px;
  margin-inline: 10px;
`;

const FinishButton = styled.button`
  width: 100px;
  height: 35px;
  background: gray;
  border: none;
  color: white;
  margin-top: 20px;
  font: 500 15px "arial";
  border-radius: 12px;
  margin-bottom: 100px;
  margin-inline: 10px;
`;

const DeleteButton = styled.button`
  width: 100px;
  height: 35px;
  background: red;
  border: none;
  color: white;
  margin-top: 50px;
  font: 500 15px "arial";
  border-radius: 12px;
  margin-bottom: 100px;
  margin-inline: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Text = styled.p`
  background: transparent;
  color: white;
  font: bold 14px "arial";
  text-align: center;
  margin-top: 30px;
`;

const Studyinfo = () => {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [isLeader, setIsLeader] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isClose, setIsClose] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudyInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/study/${id}`,
          {
            withCredentials: true,
          }
        );
        setStudyInfo(response.data);
        setIsLeader(response.data.leaderId === Number(userId));
        setIsClose(response.data.isClosed);
        if (response.data.memberStudies?.length > 0) {
          const myMemberData = response.data.memberStudies.find(
            (member) => member.memberId === Number(userId)
          );
          setIsApplied(!!myMemberData);
        }
      } catch (err) {
        console.log("스터디 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudyInfo();
  }, [id]);

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/study/${id}`, {
        withCredentials: true,
      });
      alert("스터디가 삭제되었습니다.");
      navigate("/studymain");
    } catch (err) {
      alert("스터디 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleApply = async () => {
    if (studyInfo.currentCount >= studyInfo.maxMembers) {
      alert("정원이 초과되었습니다.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/study/apply/${id}`,
        {},
        { withCredentials: true }
      );
      alert("스터디 신청이 완료되었습니다");
      navigate("/studymain");
    } catch (err) {
      alert("스터디 신청 중 오류 발생");
    }
  };

  const convertEnglishToKoreanDays = (studyDays) => {
    if (!studyDays || !Array.isArray(studyDays)) return [];

    const dayMapping = {
      Monday: "월요일",
      Tuesday: "화요일",
      Wednesday: "수요일",
      Thursday: "목요일",
      Friday: "금요일",
      Saturday: "토요일",
      Sunday: "일요일",
      MON: "월요일",
      TUE: "화요일",
      WED: "수요일",
      THU: "목요일",
      FRI: "금요일",
      SAT: "토요일",
      SUN: "일요일",
    };

    return studyDays.map((dayString) => {
      const parts = dayString.split(" "); // 요일과 시간을 분리
      if (parts.length < 2) return dayString; // 형식이 다르면 원본 유지

      const engDay = parts[0]; // 영어 요일
      const time = parts.slice(1).join(" "); // 나머지 시간
      const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환

      return `${korDay} ${time}`;
    });
  };

  const handleEdit = () => {
    navigate("/studyopen", { state: { studyData: studyInfo } });
  };

  const handleCancel = async () => {
    const isConfirm = window.confirm("신청을 취소하시겠습니까?");
    if (!isConfirm) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/study/apply/${id}`,
        {
          withCredentials: true,
        }
      );
      alert("스터디 신청이 취소되었습니다.");
      navigate(-1);
    } catch (err) {
      alert("스터디 신청 취소 중 오류 발생");
    }
  };

  const handleFinish = async () => {
    const isConfirm = window.confirm("신청을 마감하시겠습니까?");
    if (!isConfirm) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/study/${id}/close`,
        {},
        {
          withCredentials: true,
        }
      );
      alert("세션 신청을 마감하였습니다.");
      navigate(-1);
    } catch (err) {
      alert("세션 마감 중 오류 발생");
    }
  };

  return (
    <>
      <Container>
        <Subtitle>스터디</Subtitle>
        <HeadWrapper>
          <MainTitle>{studyInfo?.studyName || "스터디 이름 없음"}</MainTitle>
          <RecuruitState>
            {studyInfo?.currentCount === studyInfo?.maxMembers || isClose
              ? "모집완료"
              : "모집중"}
          </RecuruitState>
        </HeadWrapper>
        <IntroWrapper>
          <IntroTitle>활동소개</IntroTitle>
          <IntroContent style={{ whiteSpace: "pre-line" }}>
            {studyInfo?.studyDescription || "설명이 없습니다."}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>기술스택</IntroTitle>
          <IntroContent>{studyInfo?.techStack || "미정"}</IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>진행요일</IntroTitle>
          <IntroContent style={{ whiteSpace: "pre-line" }}>
            {studyInfo?.studyDays
              ? convertEnglishToKoreanDays(studyInfo.studyDays).join("\n")
              : "미정"}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>진행장소</IntroTitle>
          <IntroContent>{studyInfo?.location || "미정"}</IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>신청인원</IntroTitle>
          <IntroContent>
            {studyInfo?.currentCount} / {studyInfo?.maxMembers || "미정"}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>세션장</IntroTitle>
          <IntroContent>
            {studyInfo?.leaderName ? `${studyInfo.leaderName}` : "미정"}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>기타</IntroTitle>
          <IntroContent style={{ whiteSpace: "pre-line" }}>
            {studyInfo?.etc || "없음"}
          </IntroContent>
        </IntroWrapper>
        {(isLeader || isAdmin) && ( // ✅ isLeader 또는 isAdmin이 true일 때만 렌더링
          <IntroWrapper>
            <IntroTitle>신청자 목록</IntroTitle>
            <IntroContent>
              {studyInfo?.memberStudies?.length > 0
                ? studyInfo.memberStudies.map((member, index) => (
                    <div key={index}>
                      이름: {member.personName}, 전화번호: {member.phone}
                    </div>
                  ))
                : "신청자가 없습니다."}
            </IntroContent>
          </IntroWrapper>
        )}
        <ButtonContainer>
          {studyInfo && (
            <>
              {isLeader ? ( //개설자 여부
                studyInfo.isAccepted ? (
                  <Wrapper>
                    {studyInfo?.memberStudies?.length > 1 ? (
                      <>
                        <Text>
                          지원한 사람이 있습니다. 삭제를 원하시면 운영진에게
                          연락주세요.
                        </Text>
                        {isClose ? <FinishButton onClick={handleFinish}>모집하기</FinishButton> : <FinishButton onClick={handleFinish}>
                          마감하기
                        </FinishButton> }
                      </>
                    ) : (
                      <>
                        <DeleteButton onClick={handleDelete}>
                          삭제하기
                        </DeleteButton>
                        {studyInfo?.memberStudies?.length <= 1 && (
                          <ApplicateButton onClick={handleEdit}>
                            수정하기
                          </ApplicateButton>
                        )}
                      </>
                    )}
                  </Wrapper>
                ) : (
                  <Wrapper>
                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                    <ApplicateButton onClick={handleEdit}>
                      수정하기
                    </ApplicateButton>
                  </Wrapper>
                )
              ) : (
                studyInfo.isAccepted && (
                  <>
                    {isAdmin && (
                      <DeleteButton onClick={handleDelete}>
                        삭제하기
                      </DeleteButton>
                    )}
                    {isApplied ? (
                      <ApplicateButton onClick={handleCancel}>
                        신청취소
                      </ApplicateButton>
                    ) : studyInfo?.currentCount < studyInfo?.maxMembers ? (
                      (isClose ?  <Text>프로젝트가 마감되었습니다</Text> : <ApplicateButton onClick={handleApply}>
                        신청하기
                      </ApplicateButton>)
                    ) : (
                      <Text>정원이 다 찼습니다</Text>
                    )}
                  </>
                )
              )}
            </>
          )}
        </ButtonContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Studyinfo;
