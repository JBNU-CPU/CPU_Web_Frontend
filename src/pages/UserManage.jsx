import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from "../components/Pagination";

const Container = styled.div`
  width: 80%;
  margin: 100px auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: white;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #676666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const Th = styled.th`
  background: #ab1a65;
  color: white;
  padding: 10px;
  font: bold 10px "arial";
`;

const Td = styled.td`
  padding: 10px 5px;
  color: white;
  font: bold 14px "arial";
  background: #b6b5b5;
`;

const Button = styled.button`
  background: ${props => (props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  font: bold 12px "arial";

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

// 페이지네이션 스타일

const UserManage = () => {
  const [users, setUsers] = useState([]); // 현재 페이지에서 표시할 유저 데이터
  const [allUsers, setAllUsers] = useState([]); // 전체 유저 데이터 저장
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 전체 유저 데이터 불러오기
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        let allData = [];
        let page = 0;
        let totalPageCount = 1;

        // 서버에서 모든 페이지의 데이터를 가져오기 (반복 요청)
        while (page < totalPageCount) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/user/guest?page=${page}&size=${itemsPerPage}`,
            {withCredentials: true},
          );
          allData = [...allData, ...response.data.content];
          totalPageCount = response.data.totalPages;
          page++;
        }

        setAllUsers(allData); // 전체 유저 리스트 저장
        setTotalPages(Math.ceil(allData.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        console.error("유저 데이터 불러오기 오류:", err);
        setError("유저 데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // 🔹 승인 처리 (PUT 요청)
  const handleApprove = async id => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/user/${id}?role=member`, {}, {withCredentials: true});
      setAllUsers(allUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error(`유저 ${id} 승인 중 오류 발생:`, err);
      alert("승인 요청 중 오류가 발생했습니다.");
    }
  };

  const handleAdminApprove = async id => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/user/${id}?role=admin`, {}, {withCredentials: true});
      setAllUsers(allUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error(`유저 ${id} 관리자 승인 중 오류 발생:`, err);
      alert("관리자 승인 요청 중 오류가 발생했습니다.");
    }
  };

  // 🔹 삭제 처리 (DELETE 요청)
  const handleDelete = async id => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/user/${id}`, {withCredentials: true});
      setAllUsers(allUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error(`유저 ${id} 삭제 중 오류 발생:`, err);
      alert("삭제 요청 중 오류가 발생했습니다.");
    }
  };

  // 🔹 검색 기능 (전체 데이터에서 필터링)
  useEffect(() => {
    const filteredData = allUsers.filter(
      user =>
        user.personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setUsers(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [searchTerm, allUsers, currentPage]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p style={{textAlign: "center"}}>데이터 로딩 중...</p>;
  if (error) return <p style={{color: "red", textAlign: "center"}}>{error}</p>;

  return (
    <Container>
      <Title>유저 승인 관리</Title>
      <SearchInput
        type="text"
        placeholder="유저 이름 또는 아이디 검색"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Table>
        <thead>
          <tr>
            <Th>이름</Th>
            <Th>아이디</Th>
            <Th>역할</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <Td>{user.personName || "이름 없음"}</Td>
              <Td>{user.username || "아이디 없음"}</Td>
              <Td>{user.role || "역할 없음"}</Td>
              <Td>
                {user.role === "ROLE_GUEST" && (
                  <>
                    <Button onClick={() => handleApprove(user.id)}>일반 멤버 승인</Button>
                    <Button onClick={() => handleAdminApprove(user.id)}>관리자 승인</Button>
                    <Button danger onClick={() => handleDelete(user.id)}>
                      삭제
                    </Button>
                  </>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </Container>
  );
};

export default UserManage;
