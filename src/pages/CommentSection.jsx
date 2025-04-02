import React, {useState} from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentTitle = styled.h2`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 80px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #777;
  }
`;

const CommentList = styled.ul`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  padding: 10px;
  background-color: #2a2a2a;
  margin-bottom: 5px;
  border-radius: 4px;
  color: white;
`;

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <CommentContainer>
      <CommentTitle>댓글</CommentTitle>
      <CommentInput placeholder="내용을 입력해 주세요" value={comment} onChange={e => setComment(e.target.value)} />
      <Button onClick={handleCommentSubmit}>등록</Button>
      <CommentList>
        {comments.map((cmt, index) => (
          <CommentItem key={index}>{cmt}</CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSection;
