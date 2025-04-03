import React, {useState} from "react";
import styled from "styled-components";
import {IoFileTray} from "react-icons/io5";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #f5f7ff;
  border-radius: 10px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 700px) {
    width: 50%;
    padding: 10px 0;
  }
  @media screen and (min-width: 1024px) {
    width: 40%;
    padding: 10px 0;
  }
`;
const Title = styled.h4`
  background: none;
  color: #1b1b25;
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0;
  padding: 0;
  @media screen and (min-width: 700px) {
    width: 80%;
    margin-bottom: 10px;
  }
`;
const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px dashed #ccc;
  width: 100%;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background: #f5f7ff;
  border-color: ${props => (props.isDragging ? "#ab1a65" : "#BCC0CF")};
`;
const FileIcon = styled(IoFileTray)`
  background: none;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  color: #1b1b25;
`;
const Txt = styled.text`
  background: none;
  font: normal 12px "arial";
  width: 80%;
`;

const FileInput = styled.input`
  display: none;
`;

const BtnWrap = styled.div`
  margin-top: 10px;
  background: none;
`;
const Button = styled.button`
  margin: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background: ${props => (props.primary ? "#ab1a65" : "#878C9E")};
  color: #f5f7ff;
`;

const UploadUser = ({onClose}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = event => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = event => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  //회원 정보 보내기
  const handleUpLoad = () => {
    if (!file) {
      alert("파일을 선택하세요.");
      return;
    }

    alert("업로드 완료");
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>회원 정보 업데이트</Title>
        <Label htmlFor="file-upload">
          <DropZone
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDragging={isDragging}
          >
            <FileIcon />
            {file ? <Txt>{file.name}</Txt> : <Txt>클릭 또는 드래그하십셔</Txt>}
          </DropZone>
        </Label>
        <FileInput id="file-upload" type="file" onChange={handleFileChange} />
        <BtnWrap>
          <Button onClick={onClose}>취소</Button>
          <Button primary onClick={handleUpLoad}>
            완료
          </Button>
        </BtnWrap>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UploadUser;
