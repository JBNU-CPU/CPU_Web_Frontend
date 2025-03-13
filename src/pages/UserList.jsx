import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UserManagementComponent from "../components/UserManageComponent";

const Container = styled.div`
    width: 100%;
    margin: 0px;
    padding: 0px;
    margin-top: 100px;
    @media screen and (min-width : 1024px) {
      margin-top: 120px;
    }
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
    border-bottom: 2px solid ${({ isActive }) => (isActive ? "#ab1a65" : "transparent")};
    transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
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

const UserList = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("guest");

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    return (
        <Container>
            <SelectWrapper>
                <Select isActive={activeTab === "guest"} onClick={() => setActiveTab("guest")}>
                    게스트
                </Select>
                <Select isActive={activeTab === "member"} onClick={() => setActiveTab("member")}>
                    멤버
                </Select>
                <Select isActive={activeTab === "admin"} onClick={() => setActiveTab("admin")}>
                    관리자
                </Select>
            </SelectWrapper>
            <MainWrapper>
                {activeTab === "guest" && <UserManagementComponent apiEndpoint="guest" />}
                {activeTab === "member" && <UserManagementComponent apiEndpoint="member" />}
                {activeTab === "admin" && <UserManagementComponent apiEndpoint="admin" />}
            </MainWrapper>
        </Container>
    );
};

export default UserList;
