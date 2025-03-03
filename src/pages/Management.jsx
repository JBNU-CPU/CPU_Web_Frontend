import React, { useState } from "react";
import styled from 'styled-components';
import { HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import UploadUser from "../components/UpLoadUser";
const Wrapper = styled.div`
    width: 100%;
    margin-top : 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width : 700px) {
      margin-top : 100px;
    }
`

const Title = styled.p`
    color: #F5F7FF;
    font: bold 30px 'airal';
    margin: 40px 0 40px 0;
    @media screen and (min-width : 700px) {
      margin: 50px 0 40px 0;
      font: bold 40px 'airal';
    }
`

const Content = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items : center;
    width: 90%;
    margin: 10px 0 ;
    border-radius: 15px;
    border: 1px solid #424755;
    padding : 15px 20px;
    background: #1B1B25;
    color: #F5F7FF;
    font: normal 14px 'arial';
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
    &:hover {
        cursor: pointer;
        border: 1px solid #BCC0CF;
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(0.98); /* 살짝 확대 */
        color: #BCC0CF;
    }
    @media screen and (min-width : 700px) {
      width: 50%;
      margin: 15px 0 ;
    }
`;

const Management = () => {
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    return(
        <>
            <Wrapper>
                <Title>Management</Title>
                    <Content onClick={() => navigate('/usermanage')}>
                        유저관리
                        <HiChevronRight />
                    </Content>
                    <Content onClick={() => navigate('/studyManagement')}>
                        세션/스터디/프로젝트트 신청 관리
                        <HiChevronRight />
                    </Content>
                    <Content onClick={() => setIsUpdating(true)}>
                        회원 정보 업데이트
                        <HiChevronRight />
                    </Content>
                    <Content onClick={() => navigate('/eventcode')}>
                        이벤트 코드 변경
                        <HiChevronRight />
                    </Content>
            </Wrapper>
            {isUpdating && <UploadUser onClose={() => setIsUpdating(false)} />}
        </>
    );
};

export default Management;