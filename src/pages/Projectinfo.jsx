import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import AdminContext from "../AdminContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 100px auto 50px auto;
    padding: 0;
`;

const Subtitle = styled.div`
    color: #BCC0CF;
    font: 700 14px 'arial';
    margin-left: 20px;
`;

const HeadWrapper = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #6F7486;
`;

const MainTitle = styled.p`
    font: 700 20px 'arial';
    color: white;
    margin-left: 20px;
`;

const RecuruitState = styled.p`
    width: 50px;
    height: 20px;
    border: 1px solid #ab1a65;
    border-radius: 15px;
    color: white;
    font: 500 10px 'arial';
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
`;

const IntroWrapper = styled.div`
    margin-top: 40px;
`;

const IntroTitle = styled.p`
    color: white;
    font: 700 14px 'arial';
    margin: 0 20px 10px 20px;
`;

const IntroContent = styled.p`
    font: 400 12px 'arial';
    color: #BCC0CF;
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
    font: 500 15px 'arial';
    border-radius: 12px;
    margin-bottom: 100px;
`;

const DeleteButton = styled.button`
    width: 100px;
    height: 35px;
    background: red;
    border: none;
    color: white;
    margin-top: 50px;
    font: 500 15px 'arial';
    border-radius: 12px;
    margin-bottom: 100px;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
`

const Studyinfo = () => {
    const { id } = useParams();
    const [studyInfo, setStudyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");

    const {isAdmin} = useContext(AdminContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchStudyInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/study/${id}`, {
                    withCredentials: true,
                });
                console.log('info');
                console.log(response.data.members)
                console.log(userId, response.data.leaderId);
                setStudyInfo(response.data);
            } catch (err) {
                setError("스터디 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudyInfo();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/study/${id}`, {
                withCredentials: true,
            });
            alert("스터디가 삭제되었습니다.");
            navigate('/studymain');

        } catch (err) {
            alert("스터디 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleApply = async() => {
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/study/apply/${id}`,
                {withCredentials: true}
            );
            alert('스터디 신청이 완료되었습니다');
            navigate('/studymain');

        }catch(err){
            alert('스터디 신청 중 오류 발생')
        }
    }

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
            const parts = dayString.split(" "); // 요일과 시간을 분리
            if (parts.length < 2) return dayString; // 형식이 다르면 원본 유지
    
            const engDay = parts[0]; // 영어 요일
            const time = parts.slice(1).join(" "); // 나머지 시간
            const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환
    
            return `${korDay} ${time}`;
        });
    };
    

    if (loading) {
        return <p style={{ color: "white", textAlign: "center" }}>스터디 정보를 불러오는 중...</p>;
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    return (
        <>
            <Container>
                <Subtitle>세션</Subtitle>
                <HeadWrapper>
                    <MainTitle>{studyInfo?.studyName || "스터디 이름 없음"}</MainTitle>
                    <RecuruitState>모집중</RecuruitState>
                </HeadWrapper>
                <IntroWrapper>
                    <IntroTitle>활동소개</IntroTitle>
                    <IntroContent>{studyInfo?.studyDescription || "설명이 없습니다."}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기술스택</IntroTitle>
                    <IntroContent>{studyInfo?.techStack || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행요일</IntroTitle>
                    <IntroContent style={{ whiteSpace: "pre-line" }}>{studyInfo?.studyDays 
            ? convertEnglishToKoreanDays(studyInfo.studyDays).join("\n") 
            : "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행장소</IntroTitle>
                    <IntroContent>{studyInfo?.location || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>최대인원</IntroTitle>
                    <IntroContent>{studyInfo?.maxMembers || "미정"}명</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>세션장</IntroTitle>
                    <IntroContent>{studyInfo?.leaderName ? `${studyInfo.leaderName}` : "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기타</IntroTitle>
                    <IntroContent>{studyInfo?.etc || "없음"}</IntroContent>
                </IntroWrapper>
                <ButtonContainer>
                {studyInfo && (
                    <>
                        {/* isAdmin인 경우 "삭제하기"와 "신청하기" 둘 다 표시 */}
                        {isAdmin && (
                            <>
                                <Wrapper>
                                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                                    <ApplicateButton onClick={handleApply}>신청하기</ApplicateButton>
                                </Wrapper>
                            </>
                        )}

                        {/* 일반 사용자가 자신이 작성한 글을 볼 때 "삭제하기"만 표시 */}
                        {!isAdmin && Number(userId) === studyInfo.memberId && (
                            <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                        )}

                        {/* 일반 사용자가 글을 볼 때 (isAdmin이 아니고, 본인이 작성한 글이 아닐 경우) "신청하기"만 표시 */}
                        {!isAdmin && Number(userId) !== studyInfo.memberId && (
                            <ApplicateButton onClick={handleApply}>신청하기</ApplicateButton>
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