import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import Footer from '../components/Footer'; // 푸터 컴포넌트 임포트
import MainPicture from './Pic/StudyMain.png';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Slider from '../components/ImgSlider';
import Pagination from '../components/Pagination';
// 전체 페이지를 감싸는 컨테이너
const Container = styled.div`
  font-family: Arial, sans-serif;
  color: white;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  width: calc(60%);
  @media screen and (max-width : 768px) {
    width: calc(85%);
  }
`;

const Select = styled.select`
  padding: 5px;
  background:transparent;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  font-size : 13px;
  cursor: pointer;
  @media screen and (max-width : 768px) {
    font: bold 10px 'arial';
    padding: 5px 0;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  background-color: transparent;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  padding-left: 20px;
  padding-block: 6px;
  width: calc(60%);
  outline: none; /* 기본 브라우저 outline 제거 */
  font-size : 13px;
  &:focus {
      border: 1px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
  }
  @media screen and (max-width : 768px) {
    font: bold 10px 'arial';
  }
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font: bold 13px 'arial';
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ab1a65;
  background: #ab1a65;
  width: 60px;
  transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
  &:hover {
    box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
    transform: scale(1); /* 살짝 확대 */
  }
  @media screen and (max-width : 768px) {
    width: 45px;
    font: bold 10px 'arial';
    padding: 3px;
  }
`;

const Table = styled.table`
  width: calc(90%);
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
  @media screen and (min-width : 768px) {
    width: calc(80%);
  }
`;

const TableHead = styled.th`
  padding: 5px;
  color: #aaa;
  font: bold 12px 'arial';
  background: #3d3d3d;
  &:nth-child(1) {width: 60%; }
  &:nth-child(2) {width: 20%; }
  &:nth-child(3) {width: 20%; }
  @media screen and (min-width : 765px) {
    font: bold 14px 'arial';
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #444;
  font: normal 12px 'arial';
  &:nth-child(1) { width: 60%; } /* 제목 */
  &:nth-child(2) { width: 20%; } /* 작성자 */
  &:nth-child(3) { width: 20%; } /* 작성일 */
  @media screen and (min-width : 768px) {
    font: bold 14px 'arial';
  }
`;


const PageButton = styled.button`
  padding: 5px 10px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font: bold 13px 'arial';
  background: #ab1a65;
  margin:20px 10px;
  margin-bottom: 40px;
  transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
  &:hover:not(:disabled) {
    box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
    transform: scale(1); /* 살짝 확대 */
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
  &.write{
    background: transparent;
    border: 1px solid #ab1a65;
    background: #ab1a65;
    margin: 0;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
    &:hover {
      box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
      transform: scale(1); /* 살짝 확대 */
    }
    @media screen and (max-width : 768px) {
     width: 50px;
     font: bold 10px 'arial';
     padding: 3px 0;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: calc(80%); /* 부모 컨테이너의 전체 너비를 차지 */
  display: flex;
  justify-content: flex-end; /* 오른쪽으로 정렬 */
  margin-top: 20px;
`
const StyledP = styled.p`
  margin-top: 30px;
`

const Community = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        // 서버에서 모든 데이터를 가져옴
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post`, {
          params: {
            size: 100, // 큰 값을 설정하여 전체 데이터를 가져옴
          },
          withCredentials: true,
        });
        console.log(response);
    
        // isNotice: false인 데이터만 필터링
        const allFilteredPosts = response.data.content.filter((post) => post.isNotice === false);
    
        // 페이지네이션 처리 (5개씩 나타내기)
        const startIndex = (currentPage - 1) * postsPerPage;
        const paginatedPosts = allFilteredPosts.slice(startIndex, startIndex + postsPerPage);
    
        if (paginatedPosts.length > 0) {
          setPosts(paginatedPosts); // 현재 페이지의 게시글 설정
          setTotalPages(Math.ceil(allFilteredPosts.length / postsPerPage)); // 총 페이지 수 설정
        } else {
          console.warn("필터링 결과가 빈 배열입니다."); // 경고 출력
          setPosts([]); // 빈 배열 설정
          setTotalPages(1); // 총 페이지 수를 1로 설정
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    
    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handleSearch = async () => {
    setIsLoading(true); // 로딩 시작
    console.log(`검색 유형: ${searchType}, 검색어: ${searchTerm}`);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/search`, {
        params: {
          [searchType]: searchTerm, // 제목 또는 작성자로 검색
        },
        withCredentials: true,
      });
      const postsData = (Array.isArray(response.data) ? response.data : []).filter((post)=>post.isNotice === false);
      setPosts(postsData);
      setTotalPages(Math.max(1, Math.ceil(postsData.length / postsPerPage)));
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const writeClick = () => {
    if (isAuthenticated) {
      navigate("/write");
    } else {
      alert("비회원은 접근 불가합니다.");
    }
  };

  const handleClick = (id) => {
    if (isAuthenticated) {
      navigate("/content", {
        state: { id },
      });
    } else {
      alert("비회원은 접근 불가합니다.");
    }
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <Slider title="커뮤니티" content="부원들과 소통하는 공간입니다."/>

      <SearchSection>
        <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">제목</option>
          <option value="author">작성자</option>
        </Select>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchSection>

      {isLoading ? (
        <Spinner text="로딩 중..." />
      ) : (
        <>
        {posts.length === 0 ? (
          <StyledP>내용이 없습니다.</StyledP>
        ):(
          <Table>
            <thead>
              <tr>
                <TableHead scope="col">제목</TableHead>
                <TableHead scope="col">작성자</TableHead>
                <TableHead scope="col">작성일</TableHead>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <TableRow key={post.id} onClick={() => handleClick(post.id)}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.nickName}</TableCell>
                  <TableCell>{post.createDate.slice(0,10)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
          <ButtonWrapper>
            <PageButton className="write" onClick={writeClick}>
              글쓰기
            </PageButton>
          </ButtonWrapper>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}

      <Footer />
    </Container>
  );
};

export default Community;