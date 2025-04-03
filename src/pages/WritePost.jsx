import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header"; // 경로 수정
import Footer from "../components/Footer"; // 경로 수정
import CommentSection from "./CommentSection";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: white;
  background-color: #1a1a1a;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 150px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 5px;
  &:hover {
    background-color: #777;
  }
`;

const WritePost = ({navigateBack}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostSubmit = () => {
    const newPost = {
      id: Date.now(),
      title,
      author: "사용자",
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      content,
    };
    navigateBack(); // 커뮤니티 페이지로 돌아가기
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <Input type="text" placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
      <TextArea placeholder="내용을 입력하세요" value={content} onChange={e => setContent(e.target.value)} />
      <div style={{textAlign: "center"}}>
        <Button onClick={handlePostSubmit}>게시하기</Button>
        <Button onClick={navigateBack}>목록</Button>
      </div>
      <CommentSection />
      <Footer />
    </Container>
  );
};

export default WritePost;
