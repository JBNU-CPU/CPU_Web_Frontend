import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from './Pagination';
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

const StudyManagementComponent = ({apiEndpoint}) => {
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 🔹 API 요청하여 사용자 데이터 가져오기
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/study/${apiEndpoint}`, {
                    withCredentials: true, // 인증 정보 포함
                });

                console.log("서버 응답 데이터:", response.data);
                const filteredData = (response.data.content || []).filter(item => item.isAccepted === false);

                setItems(filteredData); // 필터링된 데이터만 상태로 설정
            } catch (err) {
                console.error("유저 데이터 불러오기 오류:", err);
                setError("유저 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [apiEndpoint]);

    // 🔹 승인 처리 (PUT 요청)
    const handleApprove = async (id) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/study/${id}`,
                {},
                { withCredentials: true, }
            );
            console.log(response);
            console.log(`유저 ${id} 승인 완료`, response.data);
            setItems(items.filter(user => user.id !== id));

        } catch (err) {
            console.error(`유저 ${id} 승인 중 오류 발생:`, err);
            alert("승인 요청 중 오류가 발생했습니다.");
        }
    };

    // 🔹 삭제 처리 (DELETE 요청)
    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/admin/study/cancel/${id}`,{},
                {
                withCredentials: true,
            });

            console.log(`유저 ${id} 삭제 완료`);

            // UI 업데이트: 삭제된 유저 제거
            setItems(items.filter(user => user.id !== id));
        } catch (err) {
            console.error(`유저 ${id} 삭제 중 오류 발생:`, err);
            alert("삭제 요청 중 오류가 발생했습니다.");
        }
    };

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
                        <Th>스터디명</Th>
                        <Th>관리</Th>
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
                            <Td>{item.leaderName || "이름 없음"}</Td>
                            <Td>{item.studyName || "스터디명 없음"}</Td>
                            <Td>
                                <>
                                    <Button onClick={() => handleApprove(item.id)}>승인</Button>
                                    <Button danger onClick={() => handleDelete(item.id)}>삭제</Button>
                                </>
                            </Td>
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

export default StudyManagementComponent;