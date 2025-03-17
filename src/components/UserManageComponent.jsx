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
    background: #b6b5b5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
`;

const SearchInput = styled.input`
    padding: 8px;
    width: 50%;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: white;
`;

const Th = styled.th`
    background: #ab1a65;
    color: white;
    padding: 10px;
    font: bold 14px 'arial';

`;

const Td = styled.td`
    padding: 10px 5px;
    color: white;
    font: bold 14px 'arial';
    background: #b6b5b5;
`;


const UserManagementComponent = ({ apiEndpoint }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);  // 현재 페이지에서 표시할 데이터
    const [allItems, setAllItems] = useState([]); // 전체 데이터 저장
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // 🔹 검색어 상태 추가
    const itemsPerPage = 10;

    // 🔹 서버에서 전체 데이터 가져오기
    const fetchUsers = async () => {
        setLoading(true);
        try {
            let allData = [];
            let page = 0;
            let totalPageCount = 1;

            // 모든 페이지 데이터 가져오기
            while (page < totalPageCount) {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/admin/user/${apiEndpoint}?page=${page}&size=${itemsPerPage}`,
                    { withCredentials: true }
                );

                allData = [...allData, ...response.data.content];
                totalPageCount = response.data.totalPages;
                page++;
            }

            setAllItems(allData); // 전체 데이터 저장
            setTotalPages(Math.ceil(allData.length / itemsPerPage));
        } catch (err) {
            console.error("유저 데이터 불러오기 오류:", err);
            setError("유저 데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 검색 기능 (전체 데이터에서 필터링)
    useEffect(() => {
        const filteredData = allItems.filter(user =>
            user.personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setItems(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [searchTerm, allItems, currentPage]);

    // 🔹 API 호출 (최초 로딩 시 실행)
    useEffect(() => {
        fetchUsers();
    }, [apiEndpoint]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Container>
            {/* 🔹 검색 입력 필드 추가 */}
            <SearchInput
                type="text"
                placeholder="이름 또는 학번 검색"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {error && (
                <p style={{ backgroundColor: "#1b1d25", color: "red", textAlign: "center" }}>{error}</p>
            )}
            {loading && (
                <p style={{ backgroundColor: "#1b1d25", textAlign: "center", color:"white"  }}>데이터 로딩 중...</p>
            )}
            {!loading && items.length === 0 && (
                <p style={{ backgroundColor: "#1b1d25", textAlign: "center", color:"white" }}>유저 데이터가 없습니다.</p>
            )}
            {!loading && items.length > 0 && (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <Th>이름</Th>
                                <Th>닉네임</Th>
                                <Th>학번</Th>
                                <Th>전화번호</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <Td>{item.personName || "이름 없음"}</Td>
                                    <Td>{item.nickName || "닉네임 없음"}</Td>
                                    <Td>{item.username || "학번 없음"}</Td>
                                    <Td>{item.phone || "전화번호 없음"}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* 페이지네이션 컴포넌트 */}
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </Container>
    );
};

export default UserManagementComponent;