import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from './Pagination';
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    width: 80%;
    margin-top: 20px;
    text-align: center;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
`;

const Th = styled.th`
    background: #ab1a65;
    color: white;
    padding: 10px;
    font: bold 14px 'arial';

`;

const Td = styled.td`
    padding: 5px;
    color: white;
    font: bold 14px 'arial';
`;

const Button = styled.button`
    background: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
    color: white;
    border: none;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    font: bold 12px 'arial';

    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const UserManagementComponent = ({apiEndpoint}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/user/${apiEndpoint}`, {
                withCredentials: true, // 인증 정보 포함
            });

            console.log("서버 응답 데이터:", response.data);

            setItems(response.data.content); // 필터링된 데이터만 상태로 설정
        } catch (err) {
            console.error("유저 데이터 불러오기 오류:", err);
            setError("유저 데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [apiEndpoint]);

    // 🔹 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <Th>이름</Th>
                        <Th>학번</Th>
                        <Th>전화번호</Th>
                    </tr>
                </thead>
                {error && (
                    <p style={{ backgroundColor: "white", color: "red", textAlign: "center" }}>{error}</p>
                )}
                {loading &&(
                    <p style={{backgroundColor: "white", textAlign: "center" }}>데이터 로딩 중...</p>
                )}
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <Td>{item.personName || "이름 없음"}</Td>
                            <Td>{item.username || "학번 없음"}</Td>
                            <Td>{item.isAccepted || '전화번호 없음'}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </Container>
    );
};

export default UserManagementComponent;