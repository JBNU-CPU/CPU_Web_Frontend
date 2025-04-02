import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  height: auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  margin: 100px auto 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 765px) {
    width: calc(80%);
  }
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background: transparent;
  text-align: center;
  width: auto;
  padding: 0;
  margin: 5px 0;
`;

const Content = styled.textarea`
  width: calc(90%);
  height: auto;
  font-size: 16px;
  color: #ddd;
  line-height: 1.6;
  white-space: pre-wrap;
  background: transparent;
  border: ${props => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
  border-radius: 5px;
  padding: 10px;
  outline: none;
  &:focus {
    outline: ${props => (props.editable ? "2px solid #ab1a65" : "none")};
  }
`;

const Input = styled.input`
  font-size: 16px;
  color: #ddd;
  background: transparent;
  border-bottom: ${props => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
  border-radius: 5px;
  padding: 10px;
  outline: none;
  &:focus {
    outline: ${props => (props.editable ? "2px solid #ab1a65" : "none")};
  }
  &.title {
    font: bold 20px "arial";
    color: white;
    text-align: center;
    width: auto;
  }
  &.info {
    margin: 0;
    padding: 0 10px;
    width: auto;
    min-width: 50px;
    max-width: 100px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  background: transparent;
`;

const Button = styled.button`
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  font: bold 13px "arial";
  cursor: pointer;
  color: white;
  background: ${props => (props.danger ? "#ab1a65" : "#4CAF50")};
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background: ${props => (props.danger ? "#e0004d" : "#45a049")};
  }

  &:active {
    background: ${props => (props.danger ? "#8b0037" : "#3d8b40")};
  }
`;

const SubWrapper = styled.div`
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  align-self: flex-end;
`;

const NotiContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("테스트 제목");
  const [editedContent, setEditedContent] = useState("테스트 내용을 여기에 작성하세요.");
  const content = {
    nickName: "테스트 사용자",
    createDate: "2025-01-23",
  };

  const handleDelete = () => {
    alert("삭제 버튼이 클릭되었습니다.");
  };

  const handleEdit = () => {
    alert("수정 내용이 저장되었습니다.");
    setIsEditing(false);
  };

  return (
    <Container>
      <Input
        editable={isEditing}
        readOnly={!isEditing}
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        className="title"
      />
      <SubWrapper>
        <Label>작성자</Label>
        <Input readOnly value={content.nickName} className="info" />
      </SubWrapper>
      <SubWrapper>
        <Label>작성일</Label>
        <Input readOnly value={content.createDate} className="info" />
      </SubWrapper>
      <Content
        editable={isEditing}
        readOnly={!isEditing}
        value={editedContent}
        onChange={e => setEditedContent(e.target.value)}
      />
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
    </Container>
  );
};

export default NotiContent;
