import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  @media screen and (min-width: 1024px) {
    margin-top: 100px;
  }
`;

const Container = styled.div`
  width: 100%;
  background: rgba(121, 120, 120, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: calc(100%);
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid #6f7486;
  height: 30px;
  width: calc(80%);
  outline: none;
  color: #f5f7ff;
  font: normal 15px "arial";
  &:focus {
    border-bottom: 1px solid #f5f7ff;
  }
  @media screen and (min-width: 1024px) {
    width: calc(60%);
    font: normal 20px "arial";
    height: 40px;
  }
`;

const Text = styled.textarea`
  margin-top: 20px;
  background: none;
  width: calc(80%);
  min-height: 200px;
  outline: none;
  border: none;
  color: #f5f7ff;
  font: normal 12px "arial";
  resize: none;
  overflow-y: hidden;
  @media screen and (min-width: 1024px) {
    width: calc(60%);
    font: normal 14px "arial";
    min-height: 300px;
  }
`;

const Button = styled.button`
  padding: 3px 12px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font: normal 14px "arial";
  background: #ab1a65;
  margin: 20px 0;
  margin-bottom: 40px;
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;
  &:hover:not(:disabled) {
    box-shadow: 0 0 10px rgba(171, 26, 101, 0.8);
    transform: scale(1);
  }
  @media screen and (min-width: 1024px) {
    padding: 6px 20px;
    border-radius: 5px;
    margin-bottom: 100px;
  }
`;

const PostForm = ({isNotice}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "200px"; // 초기 높이 설정
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/post`,
        {isNotice, title, content},
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true,
        },
      );

      alert(isNotice ? "공지사항이 성공적으로 등록되었습니다!" : "게시글이 성공적으로 등록되었습니다!");
      navigate(isNotice ? "/notification" : "/community");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      alert("등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? (
        <Spinner text="등록 중..." />
      ) : (
        <Wrapper>
          <Container>
            <Form onSubmit={handleSubmit}>
              <SubWrapper>
                <Input
                  id="title"
                  type="text"
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
                <Text
                  id="content"
                  value={content}
                  ref={textAreaRef}
                  placeholder="내용을 입력해주세요"
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </SubWrapper>
              <Button type="submit" disabled={isSubmitting}>
                등록
              </Button>
            </Form>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default PostForm;
