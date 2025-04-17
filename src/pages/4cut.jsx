import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 150px;
`;

const Photodisplay = styled.video`
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.button{
    flex-direction: row;
    gap: 20px;
    background: transparent;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  background: white;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  font: bold 15px 'arial';
  &.watch{
    margin-top: 30px;
  }
`;

const TakeButton = styled(MdOutlineRadioButtonChecked)`
  width: 60px;
  height: auto;
  color: white;
  margin-block: 50px;
  &:hover{
    cursor: pointer;
    color: gray;
  }
`;

const SmallImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const SmallImage = styled.img`
  width: 80px;
  height: 60px;
  margin: 5px;
  object-fit: cover;
`;

const FrameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  margin-top: 30px;
  width: 320px;
  height: 240px;
  border: 2px solid #000;
  background: white;
  padding: 10px;
`;

const SmallImageForFrame = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative; /* to position the close button */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
`;

const Save = styled(MdSaveAlt)`
  background: transparent;
  color: black;
  width: 30px;
  height: auto;
  &:hover{
    cursor: pointer;
  }
`

const Restart = styled(VscDebugRestart)`
  background: transparent;
  color: black;
  width: 30px;
  height: auto;
  &:hover{
    cursor: pointer;
  }
`

const CameraCapture = () => {
  const [photos, setPhotos] = useState([]);  // 찍은 사진들을 배열로 저장
  const [selectedPhotos, setSelectedPhotos] = useState([]);  // 선택된 사진 배열
  const [isCameraStarted, setIsCameraStarted] = useState(false);  // 카메라 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열기/닫기 상태 관리
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 카메라 시작
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);  // 카메라가 시작되면 상태 업데이트
      })
      .catch((error) => {
        console.error('카메라에 접근할 수 없습니다:', error);
      });
  };

  // 사진 찍기
  const takePhoto = () => {
    if (photos.length >= 10) return; // 10장까지만 찍을 수 있게 제한

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos([...photos, dataUrl]);  // 찍은 사진을 배열에 추가
  };

  // 사진 선택 처리
  const handleSelectPhoto = (index) => {
    if (selectedPhotos.includes(index)) {
      setSelectedPhotos(selectedPhotos.filter((i) => i !== index)); // 이미 선택된 사진을 취소
    } else if (selectedPhotos.length < 4) {
      setSelectedPhotos([...selectedPhotos, index]); // 최대 4장까지 선택
    }
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 저장하기 처리
  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // 캔버스 크기 설정 (2x2 그리드)
    canvas.width = 320;
    canvas.height = 240;

    // 선택된 사진들을 하나의 캔버스에 그리기
    selectedPhotos.forEach((index, i) => {
      const x = (i % 2) * 160;  // x 좌표
      const y = Math.floor(i / 2) * 120;  // y 좌표
      const img = new Image();
      img.src = photos[index];
      img.onload = () => {
        context.drawImage(img, x, y, 160, 120);  // 각 이미지 그리기
        if (i === selectedPhotos.length - 1) {
          // 마지막 이미지가 그려진 후에 다운로드 링크 생성
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "captured_images.png";
          link.click();
          alert("사진이 저장되었습니다!");
          closeModal();
          window.location.reload();
        }
      };
    });
  };

  // 다시 찍기 처리
  const handleRetake = () => {
    setPhotos([]);
    setSelectedPhotos([]);
    setIsCameraStarted(false);
    window.location.reload();
  };

  return (
    <Container>
      <Photodisplay ref={videoRef} width="320" height="240" autoPlay />
      {!isCameraStarted && (<Button onClick={startCamera}>카메라 시작</Button>)}
      {isCameraStarted && (
        <TakeButton onClick={takePhoto} className="take" />
      )}
      <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }}></canvas>

      {/* 찍은 사진들이 10개까지 나타남 */}
      <SmallImageContainer>
        {photos.map((photo, index) => (
          <Wrapper key={index}>
            <SmallImage src={photo} alt={`Captured ${index + 1}`} />
            <input
              type="checkbox"
              onChange={() => handleSelectPhoto(index)}
              checked={selectedPhotos.includes(index)}
            />
          </Wrapper>
        ))}
      </SmallImageContainer>

      {/* 4개 선택된 사진이 있으면 인생 네 컷 형식으로 보여주기 */}
      {selectedPhotos.length === 4 && (
        <div>
          <Button onClick={openModal} className='watch'>사진 보기</Button>
        </div>
      )}

      {/* 모달 화면 */}
      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <CloseButton onClick={closeModal}>×</CloseButton> {/* X 버튼 추가 */}
            <FrameContainer>
              {selectedPhotos.map((index) => (
                <SmallImageForFrame key={index} src={photos[index]} alt={`Selected ${index + 1}`} />
              ))}
            </FrameContainer>
            <Wrapper className='button'>
              {/* 하나의 이미지로 저장 */}
              <Save onClick={handleSave} />
              <Restart onClick={handleRetake} />
            </Wrapper>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default CameraCapture;
