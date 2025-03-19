import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
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

const Groupinfo = () => {
    const { id } = useParams();
    const [groupInfo, setgroupInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLeader, setIsLeader] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const Id = localStorage.getItem("isAuth") === 'true';
    const isAdmin = localStorage.getItem("isAdmin") === 'true';

    const navigate = useNavigate();

    useEffect(() => {
        const fetchgroupInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/gathering/${id}`, {
                    withCredentials: true,
                });
                setgroupInfo(response.data);
                setIsLeader(response.data.leaderId === Number(Id));

                if (response.data.memberStudies?.length > 0) {
                    const myMemberData = response.data.memberStudies.find(member => member.memberId === Number(Id));
                    setIsApplied(!!myMemberData);
                }
            } catch (err) {
                setError("소모임 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchgroupInfo();
    }, [id]);

    const handleDelete = async () => {
        const isConfirm = window.confirm("정말 삭제하시겠습니까?");
        if(!isConfirm) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/gathering/${id}`, {
                withCredentials: true,
            });
            alert("소모임이 삭제되었습니다.");
            navigate('/groupmain');

        } catch (err) {
            alert("소모임 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleApply = async() => {
        if(groupInfo.currentCount>=groupInfo.maxMembers){
            alert("정원이 초과되었습니다.");
            return;
        }
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/gathering/apply/${id}`,
                {},
                {withCredentials: true}
            );
            alert('소모임 신청이 완료되었습니다');
            navigate('/groupmain');

        }catch(err){
            alert('소모임 신청 중 오류 발생')
        }
    }

    // 영어 요일을 한글로 변환하는 함수
    const convertEnglishToKoreanDays = (gatheringDays) => {
        if (!gatheringDays|| !Array.isArray(gatheringDays)) return [];
    
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
    
        return gatheringDays.map((dayString) => {
            const parts = dayString.split(" "); // 요일과 시간을 분리
            if (parts.length < 2) return dayString; // 형식이 다르면 원본 유지
    
            const engDay = parts[0]; // 영어 요일
            const time = parts.slice(1).join(" "); // 나머지 시간
            const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환
    
            return `${korDay} ${time}`;
        });
    };

    const handleEdit = () => {
        navigate("/groupopen", { state: { groupData: groupInfo } });
    }

    const handleCancel = async () => {
        const isConfirm = window.confirm("신청을 취소하시겠습니까?");
        if(!isConfirm) return;

        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/gathering/apply/${id}`, {
                withCredentials: true,
            });
            alert('소모임 신청이 취소되었습니다.');
            navigate(-1);
        }catch(err){
            alert('소모임 신청 취소 중 오류 발생');
        }

    }

    return (
        <>
            <Container>
                <Subtitle>소모임</Subtitle>
                <HeadWrapper>
                    <MainTitle>{groupInfo?.title || "소모임 이름 없음"}</MainTitle>
                    <RecuruitState> {groupInfo?.currentCount === groupInfo?.maxMembers ? "모집완료" : "모집중"}</RecuruitState>
                </HeadWrapper>
                <IntroWrapper>
                    <IntroTitle>활동소개</IntroTitle>
                    <IntroContent>{groupInfo?.content || "설명이 없습니다."}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행요일</IntroTitle>
                    <IntroContent style={{ whiteSpace: "pre-line" }}>{groupInfo?.gatheringDays
            ? convertEnglishToKoreanDays(groupInfo.gatheringDays).join("\n") 
            : "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>신청인원</IntroTitle>
                    <IntroContent>{groupInfo?.currentCount} / {groupInfo?.maxMembers || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>팀장</IntroTitle>
                    <IntroContent>{groupInfo?.leaderName ? `${groupInfo.leaderName}` : "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기타</IntroTitle>
                    <IntroContent>{groupInfo?.etc || "없음"}</IntroContent>
                </IntroWrapper>
                <ButtonContainer>
                {groupInfo && (
                    <>
                        {isLeader?( //개설자 여부
                            groupInfo.isAccepted ? (
                                <Wrapper>
                                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                                </Wrapper>
                            ):(
                                <Wrapper>
                                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                                    <ApplicateButton onClick={handleEdit}>수정하기</ApplicateButton>
                                </Wrapper>
                            )
                        ):(
                            groupInfo.isAccepted && (
                                <>
                                {isAdmin && <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>}
                                {isApplied ? (
                                    <ApplicateButton onClick={handleCancel}>신청취소</ApplicateButton>
                                ):(
                                    <ApplicateButton onClick={handleApply}>신청하기</ApplicateButton>
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

export default Groupinfo;