import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from './Spinner'; // 스피너 컴포넌트 임포트
import AdminContext from "../AdminContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`
const Title = styled.text`
  color: #BCC0CF;
  font: normal 16px 'arial';
`
const Line = styled.div`
  background-color: #6F7486;
  margin-top: 10px;
  width: 100%;
  height: 1.5px;
`
const ItemWrapper = styled.div`
 border-bottom: 1px solid #6F7486;
 padding: 10px 0;

`
const Input = styled.textarea`
  background: none;
  width:100%;
  padding: 0;
  margin:0;
  color: white;
  outline: none;
  resize: none;
  overflow-y: hidden;
  font: normal 12px 'arial';
  cursor: ${(props) => (props.editable ? "auto" : "default")};
  border: ${(props) => (props.editable ? "1px solid #6F7486" : "none")};
  &:focus {
    border: ${(props) => (props.editable && "1px solid #BCC0CF")};
  }
  @media screen and (min-width : 1024px) {
    font: normal 14px 'arial';
  } 
`
const ButtonWrapper = styled.div`
    display: flex;
    width:100%;
    justify-content: flex-end;
    gap: 5px;
    background: transparent;
`;

const Button = styled.button`
    padding: 1px 2px;
    border: 0;
    font: normal 12px 'arial';
    cursor: pointer;
    color: #6F7486;
    background: none;
    transition: background 0.3s ease, transform 0.2s ease;
    &:hover {
        color: #F5F7FF;
    }
    @media screen and (min-width : 1024px) {
        padding: 6px 20px;
    }
`;

const Comment = ({id}) =>{
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState({});
  const [editedContent,setEditedContent] = useState({});
  const limit = 10;

  useEffect(()=>{
    fetchComments();
  },[]);

  const fetchComments = async (newPage = 1) =>{
    setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${id}`, {
          withCredentials: true,
        });
        if (newPage === 1) {
          setComment(response.data); // 첫 페이지면 댓글 덮어쓰기
        } else {
          setComment((prev) => [...prev, ...response.data]); // 다음 페이지면 기존 댓글에 추가
        }
        console.log("댓글: ",response.data)
      } catch (err) {
        console.error("데이터 로드 오류:", err);
      }finally {
      setIsLoading(false);
    }
  };

  const handleWrite = async() => {
    setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment`,
          { 
            postId : id,
            content: "test1"
          },
          {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
          }
      );
      console.log("성공");
      } catch (err) {
        console.error("데이터 로드 오류:", err);
      }finally {
        fetchComments();
      }
  };
  
  const handleDelete = async(commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")){
      return
    }
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`, {
        withCredentials: true,
      });
      console.log("삭제 성공:", response);
      alert("댓글이 삭제되었습니다.");
    } catch (err) {
      console.error("삭제 실패:", err);
    }finally {
      fetchComments();
    }
  };

  const handleEditClick = (index, content) => {
    setIsEditing((prev) => ({ ...prev, [index]: true }));
    setEditedContent((prev) => ({ ...prev, [index]: content }));
  };

  const handleSaveEdit = async(index) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/comment/${id}`,
        {
          postId: index,
          comment: editedContent[index]
        }, 
        {
        withCredentials: true,
      });
      console.log("수정 성공:", response);
      alert("수정이 완료되었습니다다.");
    } catch (err) {
      console.error("수정 실패:", err);
    }finally {
      setIsEditing((prev) => ({ ...prev, [index]: false }));
      fetchComments();
    }
  }

  const textareaRefs = useRef({});
  useEffect(() => {
    Object.values(textareaRefs.current).forEach((textarea) => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [editedContent]);

  return (
    <Wrapper>
      <Title>댓글</Title>
      <Line/>
      {isLoading && <p>로딩 중...</p>}
      {!isLoading && comment.length === 0 && <p>댓글이 없습니다.</p>}
      {comment.map((data, index)=>(
        <ItemWrapper key = {index}>
          <Input
            editable={isEditing[index]}
            readOnly={!isEditing[index]}
            value={editedContent[index] || data.content}
            ref={(el) => (textareaRefs.current[index] = el)}
            onChange={(e) =>
              setEditedContent((prev) => ({ ...prev, [index]: e.target.value }))
            }
          />
          <ButtonWrapper>
          {isEditing[index] ? (
            <Button onClick={() => handleSaveEdit(index)}>저장</Button>
          ) : (
            <>
            <Button onClick={() => handleEditClick(index, data.content)}>수정</Button>
            <Button onClick={() => handleDelete(index)}>삭제</Button>
            </>
          )}
          </ButtonWrapper>
        </ItemWrapper>
      ))}
      <Button onClick={()=>handleWrite()}>댓글달기</Button>
    </Wrapper>
  );
};
export default Comment