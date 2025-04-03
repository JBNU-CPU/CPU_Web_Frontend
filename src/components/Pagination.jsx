import React from "react";
import styled from "styled-components";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";
// 스타일 정의
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const PaginationButton = styled.button`
  background-color: none;
  border: none;
  color: ${props => (props.disabled ? "#424755" : "white")};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  padding: 5px;
  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.7)};
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;
const BackBtn = styled(PaginationButton).attrs({
  as: IoIosArrowBack,
})``;

const ForwardBtn = styled(PaginationButton).attrs({
  as: IoIosArrowForward,
})``;
const PageNumber = styled.span`
  color: white;
  font: normal 15px "arial";
  padding: 5px;
  margin: 0 2px;
  cursor: pointer;
  color: ${props => (props.isCurrent ? "white" : "#6F7486")};
  &:hover {
    color: white;
    text-shadow: 0 0 5px #d1cecf; /* 글자 주변 빛나는 효과 */
    transform: scale(1.05); /* 살짝 확대 */
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }
`;

// Pagination 컴포넌트
const Pagination = ({currentPage, totalPages, handlePageChange}) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPage - 2); // currentPage - 2
    let end = Math.min(totalPages, currentPage + 2); // currentPage + 2

    // 5개 페이지가 최대이므로
    if (end - start < 4) {
      if (start === 1)
        end = Math.min(5, totalPages); // 왼쪽 끝일 경우
      else start = Math.max(1, totalPages - 4); // 오른쪽 끝일 경우
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      <BackBtn onClick={handlePrev} disabled={currentPage === 1} />
      {generatePageNumbers().map(page => (
        <PageNumber key={page} isCurrent={currentPage === page} onClick={() => handlePageChange(page)}>
          {page}
        </PageNumber>
      ))}
      <ForwardBtn onClick={handleNext} disabled={currentPage === totalPages} />
    </PaginationWrapper>
  );
};

export default Pagination;
