import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from './Spinner'; // 스피너 컴포넌트 임포트
import AdminContext from "../AdminContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 40px 0;
  margin-bottom: 100px;
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
const NoItemTxt = styled.text`
  color: #BCC0CF;
  font: normal 14px 'arial';
  width: 100%;
  text-align:center;
  margin:20px 0;
`
const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #6F7486;
  padding: 10px 0;
`
const TopWrapper = styled.div`
  width: 100%;
  display: flex;
`
const Name = styled.text`
  color: #BCC0CF;
  font: normal 14px 'arial';
  margin-right:10px;

`
const Input = styled.textarea`
  background: none;
  width:95%;
  padding: 5px 2.5%;
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
const CommentInput = styled.textarea`
  background: none;
  width:95%;
  padding: 5px 2.5%;
  margin:0;
  color: white;
  outline: none;
  resize: none;
  overflow-y: hidden;
  font: normal 12px 'arial';
  border:1px solid #6F7486;
  &:focus {
    border:1px solid #BCC0CF;
  }
  @media screen and (min-width : 1024px) {
    font: normal 14px 'arial';
  } 
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    background: transparent;
    margin-left: auto;
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
        color: #BCC0CF;
    }
    @media screen and (min-width : 1024px) {
        padding: 6px 20px;
    }
`;
const SaveBtn = styled.button`
  padding: 3px 12px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font: normal 12px 'arial';
  background: #ab1a65;
  margin-top: 5px;

  @media screen and (min-width : 1024px) {
    padding: 6px 20px;
    border-radius: 5px;
  }
`;
const DisabledSaveBtn = styled(SaveBtn)`
  margin-top: 10px;
  background: ${({ disabled }) => (disabled ? "#6F7486" : "#ab1a65")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
const Comment = ({id}) =>{
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent,setEditedContent] = useState({});
  const limit = 10;

  const {isAdmin, setIsAdmin} = useContext(AdminContext);
  const localUserId = localStorage.getItem("userId");

  useEffect(()=>{
    fetchComments();
    const adminStatus = isAdmin === "true";
    setIsAdmin(adminStatus);
  },[]);

  //댓글 불러오기
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

  //댓글 작성
  const handleWrite = async() => {
    setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment`,
          { 
            postId : id,
            content: newComment
          },
          {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
          }
      );
      console.log("성공");
      alert("댓글이 등록되었습니다.")
      } catch (err) {
        console.error("데이터 로드 오류:", err);
      }finally {
        fetchComments();
        setNewComment("");
      }
  };
  //댓글 삭제
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

  //댓글 수정 버튼 클릭
  const handleEditClick = (index, content) => {
    setEditingIndex(index);
    setEditedContent({ [index]: content });
  };
  

  //수정한 댓글 저장
  const handleSaveEdit = async(index, commentId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/comment/${commentId}`,
        {
          postId: id,
          content: editedContent[index]
        }, 
        {
        withCredentials: true,
      });
      console.log("수정 성공:", response);
      alert("수정이 완료되었습니다.");
    } catch (err) {
      console.error("수정 실패:", err);
      alert(err.response.data.message);
    }finally {
      setEditingIndex(null);
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

  //newComment
  const textAreaRef = useRef(null);
    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "50px"; // 초기 높이 설정
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
      }
    }, [newComment]);

  if (isLoading) return <Spinner text="로딩 중..." />; // 스피너 표시
  return (
    <Wrapper>
      <Title>댓글 {comment.length}</Title>
      <Line/>
      {comment.length === 0 && <NoItemTxt>작성된 댓글이 없습니다.</NoItemTxt>}
      {comment.map((data, index)=>(
        <ItemWrapper key = {index}>
          <TopWrapper>
          <Name>{data.nickName}</Name>
            {editingIndex !== index && (
              <ButtonWrapper>
                {localUserId == data.userId && (
                  <Button onClick={() => handleEditClick(index, data.content)}>수정</Button>
                )}
                {(isAdmin || localUserId==data.userId)&&(
                  <Button onClick={() => handleDelete(data.commentId)}>삭제</Button>
                ) }
              </ButtonWrapper>
            )}
          </TopWrapper>
          <Input
            editable={editingIndex === index}
            readOnly={editingIndex !== index}
            value={editedContent[index] ?? data.content}
            ref={(el) => (textareaRefs.current[index] = el)}
            onChange={(e) =>
              setEditedContent((prev) => ({ ...prev, [index]: e.target.value }))
            }
          />
          <ButtonWrapper>
          {editingIndex === index && (
            <SaveBtn onClick={() => handleSaveEdit(index,data.commentId)}>저장</SaveBtn>
          )}
          </ButtonWrapper>
        </ItemWrapper>
      ))}
      <CommentInput
        value={newComment}
        placeholder="댓글을 입력해주세요"
        ref={textAreaRef}
        onChange={(e)=> setNewComment(e.target.value)}
      />
      <ButtonWrapper>
        <DisabledSaveBtn onClick={()=>handleWrite()} disabled={newComment == ""}>등록</DisabledSaveBtn>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Comment