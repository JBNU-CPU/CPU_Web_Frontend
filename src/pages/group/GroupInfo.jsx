import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {useParams} from "react-router-dom";
import Footer from "../../components/Footer";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px auto 50px auto;
  padding: 0;
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
  cursor: pointer;
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
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const GroupInfo = () => {
  const {id} = useParams();
  const [gatheringInfo, setGatheringInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLeader, setIsLeader] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGatheringInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/gathering/${id}`, {
          withCredentials: true,
        });

        console.log(response.data);
        setGatheringInfo(response.data);
        setIsLeader(response.data.leaderId == userId);

        if (response.data.memberGatherings?.length > 0) {
          const myMemberData = response.data.memberGatherings.find(member => member.memberId == userId);
          setIsApplied(!!myMemberData);
        }
      } catch (err) {
        setError("소모임 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGatheringInfo();
  }, [id]);

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/gathering/${id}`, {
        withCredentials: true,
      });
      alert("소모임이 삭제되었습니다.");
      navigate("/group");
    } catch (err) {
      alert("소모임 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleApply = async () => {
    if (gatheringInfo.currentCount >= gatheringInfo.maxMembers) {
      alert("정원이 초과되었습니다.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/gathering/apply/${id}`,
        {},
        {withCredentials: true},
      );
      alert("소모임 신청이 완료되었습니다");
      navigate("/group");
    } catch (err) {
      alert("소모임 신청 중 오류 발생");
    }
  };

  // 영어 요일을 한글로 변환하는 함수
  const convertEnglishToKoreanDays = days => {
    if (!days || !Array.isArray(days)) return [];

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

    return days.map(dayString => {
      const parts = dayString.split(" "); // 요일과 시간을 분리
      if (parts.length < 2) return dayString; // 형식이 다르면 원본 유지

      const engDay = parts[0]; // 영어 요일
      const time = parts.slice(1).join(" "); // 나머지 시간
      const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환

      return `${korDay} ${time}`;
    });
  };

  const handleEdit = () => {
    navigate("/groupopen", {state: {gatheringData: gatheringInfo}});
  };

  const handleCancel = async () => {
    const isConfirm = window.confirm("신청을 취소하시겠습니까?");
    if (!isConfirm) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/gathering/apply/${id}`, {
        withCredentials: true,
      });
      alert("소모임 신청이 취소되었습니다.");
      navigate(-1);
    } catch (err) {
      alert("소모임 신청 취소 중 오류 발생");
    }
  };

  return (
    <>
      <Container>
        <Subtitle>소모임</Subtitle>
        <HeadWrapper>
          <MainTitle>{gatheringInfo?.gatheringTitle || "소모임 이름 없음"}</MainTitle>
          <RecuruitState>
            {" "}
            {gatheringInfo?.currentCount === gatheringInfo?.maxMembers ? "모집완료" : "모집중"}
          </RecuruitState>
        </HeadWrapper>
        <IntroWrapper>
          <IntroTitle>활동소개</IntroTitle>
          <IntroContent>{gatheringInfo?.gatheringContent || "설명이 없습니다."}</IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>진행요일</IntroTitle>
          <IntroContent style={{whiteSpace: "pre-line"}}>
            {(gatheringInfo?.gatheringDays?.length ?? 0) > 0
              ? convertEnglishToKoreanDays(gatheringInfo.gatheringDays).join("\n")
              : "미정"}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>신청인원</IntroTitle>
          <IntroContent>
            {gatheringInfo?.currentCount} / {gatheringInfo?.maxMembers || "미정"}
          </IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>소모임장</IntroTitle>
          <IntroContent>{gatheringInfo?.leaderName ? `${gatheringInfo.leaderName}` : "미정"}</IntroContent>
        </IntroWrapper>
        <IntroWrapper>
          <IntroTitle>기타</IntroTitle>
          <IntroContent>{gatheringInfo?.etc || "없음"}</IntroContent>
        </IntroWrapper>
        <ButtonContainer>
          {gatheringInfo && (
            <>
              {isLeader ? ( //개설자 여부
                gatheringInfo.currentCount < 2 && ( // 신청자가 없을 때만 보여줌
                  <Wrapper>
                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                    <ApplicateButton onClick={handleEdit}>수정하기</ApplicateButton>
                  </Wrapper>
                )
              ) : (
                <Wrapper>
                  {isAdmin && gatheringInfo.currentCount < 2 && (
                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                  )}
                  {isApplied ? (
                    <ApplicateButton onClick={handleCancel}>신청취소</ApplicateButton>
                  ) : (
                    <ApplicateButton onClick={handleApply}>신청하기</ApplicateButton>
                  )}
                </Wrapper>
              )}
            </>
          )}
        </ButtonContainer>
      </Container>
      <Footer />
    </>
  );
};

export default GroupInfo;
