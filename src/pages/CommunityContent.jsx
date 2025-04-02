import React, {useContext, useEffect, useState, useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../components/Spinner"; // 스피너 컴포넌트 임포트
import AdminContext from "../AdminContext";
import Comment from "../components/Comment";
import AuthContext from "../AuthContext";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  @media screen and (min-width: 1024px) {
    margin-top: 120px;
  }
`;
const Container = styled.div`
  width: 80%;
  background: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1024px) {
    width: 60%;
  }
`;
const Form = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: 0;
  gap: 5px;
  p {
    margin: 0;
    margin-top: 5px;
    font: normal 10px "arial";
    color: #bcc0cf;
    cursor: default;
  }
`;

const Content = styled.textarea`
  background: none;
  width: calc(100%);
  min-height: 150px;
  outline: none;
  border: ${props => (props.editable ? "1px solid #6F7486" : "none")};
  border-bottom: 1px solid #6f7486;
  color: #f5f7ff;
  font: normal 12px "arial";
  resize: none;
  overflow-y: hidden;
  margin-top: 20px;
  cursor: ${props => (props.editable ? "auto" : "default")};
  &:focus {
    border: ${props => props.editable && "1px solid #BCC0CF"};
  }
  @media screen and (min-width: 1024px) {
    font: normal 14px "arial";
    min-height: 300px;
  }
`;

const Input = styled.input`
  font-size: 10px;
  color: #ddd;
  background: transparent;
  border: 1px solid transparent;
  padding: 0;
  outline: none; /* 기본 클릭 시 테두리 제거 */
  cursor: ${props => (props.editable ? "auto" : "default")};

  &.title {
    background: none;
    border: none;
    border-bottom: 1px solid #6f7486;
    height: 30px;
    width: calc(100%);
    outline: none;
    color: #f5f7ff;
    font: normal 15px "arial";
    &:focus {
      border-bottom: ${props => props.editable && "1px solid #F5F7FF"};
    }
    @media screen and (min-width: 1024px) {
      font: normal 20px "arial";
      height: 40px;
    }
  }

  &.info {
    margin: 0;
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 5px;
  background: transparent;
`;

const Button = styled.button`
  padding: 1px 2px;
  border: 0;
  margin-top: 5px;
  font: normal 12px "arial";
  cursor: pointer;
  color: #ab1a65;
  background: none;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
  &:hover {
    color: #f5f7ff;
  }
  @media screen and (min-width: 1024px) {
    padding: 6px 20px;
  }
`;

const NotiContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = location.state || {};
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const localUserId = localStorage.getItem("userId");
  const [userid, setUserid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setError("ID가 없습니다.");
      return;
    }
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`, {
          withCredentials: true,
        });
        setContent(response.data);
        setUserid(response.data.memberId);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
      } catch (err) {
        console.error("데이터 로드 오류:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true); // 삭제 작업 중 로딩 표시
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`, {
          withCredentials: true,
        });
        console.log("삭제 성공:", response);
        alert("게시글이 삭제되었습니다.");
        navigate("/community");
      } catch (err) {
        console.error("삭제 요청 오류:", err);
        alert("게시글 삭제에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    if (window.confirm("수정 내용을 저장하시겠습니까?")) {
      setIsLoading(true); // 수정 작업 중 로딩 표시
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/post/${id}`,
          {
            title: editedTitle,
            content: editedContent,
          },
          {
            withCredentials: true,
          },
        );
        console.log("수정 성공:", response);
        alert("게시글이 수정되었습니다.");
        setIsEditing(false);
        setContent(prev => ({
          ...prev,
          title: editedTitle,
          content: editedContent,
        }));
        navigate("/community");
      } catch (err) {
        console.error("수정 요청 오류:", err);
        alert("게시글 수정에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editedContent]);

  const handleContentChange = e => {
    setEditedContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  if (isLoading) return <Spinner text="로딩 중..." />; // 스피너 표시

  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );

  return (
    <Wrapper>
      <Container>
        {content ? (
          <Form>
            <Input
              editable={isEditing}
              readOnly={!isEditing}
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              className="title"
            />
            <InfoWrapper>
              <p>{content.nickName}</p>
              <p>|</p>
              <p>{content.createDate.slice(0, 10)}</p>
            </InfoWrapper>
            <Content
              editable={isEditing}
              readOnly={!isEditing}
              value={editedContent}
              onChange={handleContentChange}
              ref={textareaRef}
            />
            {(userid === Number(localUserId) || isAdmin) && (
              <ButtonWrapper>
                {isEditing ? (
                  <Button onClick={handleEdit}>저장</Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>수정</Button>
                )}
                <Button danger onClick={handleDelete}>
                  삭제
                </Button>
              </ButtonWrapper>
            )}
          </Form>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
        <Comment id={id} />
      </Container>
    </Wrapper>
  );
};

export default NotiContent;
