import { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: none;
  margin-top: 60px;
  img{
    background: none;
    width:100px;
    height : auto;
    padding: 0;
    filter:drop-shadow(5px 5px 2px rgba(0,0,0,0.5));
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  background: none;
  color: #F5F7FF;
  padding-bottom: 5px;
  border-bottom: 1px solid #ab1a65;
`;

const RankList = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: none;
  gap: 10px 0;
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  background: #1B1B25;
  border: 1px solid #424755;
  border-radius: 10px;
`;

const RankingTxt = styled.text`
  display: flex;
  background: none;
  text-align: center;
  font: bold 15px 'arial';
  color: #ab1a65;
  margin-right: 20px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background: none;
  align-items: center;
  gap: 0 5px;
`;

const Nickname = styled.text`
  background: none;
  font-size: 14px;
  font-weight: bold;
  color: #F5F7FF;
`;

const UserId = styled.div`
  background: none;
  font-size: 12px;
  color: #7f8c8d;
`;

const Score = styled.div`
background: none;
  font-size: 14px;
  font-weight: bold;
  color: orange;
`;
const NoData = styled.p`
  font-size: 16px;
  color: #7f8c8d;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #3498db;
  margin-top: 20px;
`;


const EventGameRank = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/event?sort=score,desc`,
          { withCredentials: true }
        );

        // API 응답이 배열인지 확인하고 추가
        setEventData(response.data);
      } catch (error) {
        console.error("이벤트 목록을 불러오는 중 오류 발생:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []); // ✅ 페이지 로드시 한 번만 실행됨

  return (
    <Container>
      <img src="/coboogi.png" alt="Coboogi" />
      {loading ? (
        <LoadingText>로딩 중...</LoadingText>
      ) : (
        <RankList>
          {eventData.length > 0 ? (
            eventData.map((event, index) => (
              <UserWrap key={index}>
                <RankingTxt>{index+1}.</RankingTxt>
                <Wrap>
                  <Nickname>{event.nickName || "익명"}</Nickname>
                  <UserId>{event.userId ? "( " + event.userId.slice(-4) + " )" : "미 입력"}</UserId>
                </Wrap>
                <Score>{event.score}</Score>
              </UserWrap>
            ))
          ) : (
            <NoData>데이터가 없습니다.</NoData>
          )}
        </RankList>
      )}
    </Container>
  );
};

export default EventGameRank;

