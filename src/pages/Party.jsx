import React, {useState, useEffect, useRef} from "react";
import styled, {keyframes} from "styled-components";
import img1 from "./Pic/party1.png";
import img2 from "./Pic/party2.png";
import main1 from "./Pic/main1.jpeg";
import main2 from "./Pic/main2.jpeg";
import main3 from "./Pic/main3.jpeg";
import {IoMdCopy} from "react-icons/io";

const slideUp = keyframes`
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const glow = keyframes`
    0% { box-shadow: 0 0 10px rgba(255, 200, 50, 0.6); }
    50% { box-shadow: 0 0 20px rgba(255, 200, 50, 0.9), 0 0 40px rgba(255, 165, 0, 0.5); }
    100% { box-shadow: 0 0 10px rgba(255, 200, 50, 0.6); }
`;

const Flame = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 50%;
  background: rgba(255, 200, 50, 0.8);
  animation: ${glow} 1.5s infinite alternate;
  transition: all 0.3s ease-in-out;
  opacity: ${props => (props.show ? 1 : 0)};
  &.small {
    top: ${props => props.top}%;
    left: 51%;
    transform: translateX(-50%);
    width: ${props => props.width}px;
    height: ${props => props.height}px;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: calc(90%);
  height: auto;
  margin-top: 100px;
  &.small {
    width: calc(100%);
    margin: 0;
    margin-top: 100px;
  }
  &.main {
    margin: 0;
    width: 80%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 10px;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transform: ${props => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
    transition:
      opacity 0.8s ease-out,
      transform 0.8s ease-out;
  }
`;

const Container = styled.div`
  background: white;
  width: calc(80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
  &.subcontainer {
    margin-bottom: 40px;
  }
  &.subcontainer2 {
    margin-bottom: 10px;
  }
  &.link {
    border: 0.5px solid gray;
  }
`;

const Footer = styled.div`
  background: white;
  width: calc(80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  margin-bottom: 20px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
`;

const Text = styled.p`
  &.Title {
    font-family: "cat";
    color: orange;
    background: white;
    font-size: 20px;
    margin: 10px 0 15px 0;
    text-align: center;
  }
  &.submain {
    font-family: "Dug";
    color: black;
    background: white;
    font-size: 14px;
    margin: 5px 0 10px 0;
    text-align: center;
  }
  &.main {
    font-family: "Dug";
    color: black;
    background: white;
    font-size: 12px;
    margin: 5px 0;
    text-align: center;
  }
  &.link {
    font-family: "Dug";
    color: black;
    background: white;
    font-size: 14px;
    margin: 15px auto;
    text-align: center;
  }
  &.modal {
    background: white;
    font-family: "Dug";
    margin: 0;
    padding: 0;
    padding-left: 20px;
  }
  &.name {
    background: white;
    font-family: "Dug";
    align-self: flex-start;
    margin: 0;
    padding: 10px;
  }
  &.small {
    background: white;
    font-family: "Dug";
    font-size: 10px;
  }
`;

/* ✨ '떡'을 빛나게 만들기 위한 스타일 추가 */
const GlowText = styled.span`
  font-size: 14px; /* '떡' 글자 크기 */
  font-weight: bold;
  color: black; /* 노란색 */
  text-shadow:
    0 0 5px #ffcc00,
    0 0 10px #ff9900,
    0 0 15px #ff6600; /* 빛나는 효과 */
  background: white;
`;

const SmallText = styled.span`
  font-size: 14px; /* '대충'만 작은 글자 크기 설정 */
  background: white;
  vertical-align: middle;
`;

const Button = styled.button`
  color: white;
  background: orange;
  border: none;
  border-radius: 30px;
  padding: 10px 15px;
  margin: 5px auto 15px auto;
  font-family: "Dug";
  &.account {
    color: #abaedd;
    background: #f1f2fe;
    border: 1px solid #abaedd;
    border-radius: 30px;
    padding: 10px 15px;
    margin: 30px auto 20px auto;
    font-family: "Dug";
    font-size: 20px;
    width: calc(100%);
  }
  &.copy {
    color: black;
    background: #e3e1e1;
    font-family: "Dug";
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
  }
  &.copy2 {
    color: red;
    background: white;
    font-family: "Dug";
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  margin: 20px auto;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  animation: ${slideUp} 0.3s ease-in-out;
  background: white;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
`;

const AccountInfo = styled.div`
  background: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin-bottom: 20px;
  &.row {
    background: white;
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    padding: 0;
    margin: 0;
  }
  &.copy {
    background: #e3e1e1;
    padding: 0;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    &.hover {
      cursor: pointer;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: gray;
  cursor: pointer;
  align-self: flex-end;
  background: white;
  padding-right: 20px;
`;

const Icon = styled(IoMdCopy)`
  background: #e3e1e1;
  vertical-align: middle;
  font-size: 14px;
`;

const Party = () => {
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [showFlame, setShowFlame] = useState({});

  const [flameSize, setFlameSize] = useState({width: 14, height: 20, top: 60});
  const [flameSize1, setFlameSize1] = useState({width1: 14, height1: 20, top1: 60});

  useEffect(() => {
    const updateFlameSize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 600) {
        setFlameSize({});
        setFlameSize1({});
        return;
      }

      let newSize = Math.max(10, 10 + (windowWidth - 344) * 0.03); // 최소 크기 10px, 너비의 2%만큼 크기 증가
      let newHeight = Math.max(19, 19 + (windowWidth - 344) * 0.05); // 최소 높이 15px, 너비의 3%만큼 크기 증가
      let newTop = Math.min(47, 47 - (windowWidth - 344) * 0.05);

      let newSize1 = Math.max(6, 6 + (windowWidth - 344) * 0.03); // 최소 크기 10px, 너비의 2%만큼 크기 증가
      let newHeight1 = Math.max(9, 9 + (windowWidth - 344) * 0.05); // 최소 높이 15px, 너비의 3%만큼 크기 증가
      let newTop1 = Math.min(71, 71 - (windowWidth - 344) * 0.05);

      setFlameSize({
        width: newSize,
        height: newHeight,
        top: newTop,
      });
      setFlameSize1({
        width1: newSize1,
        height1: newHeight1,
        top1: newTop1,
      });
    };

    // 초기 실행
    updateFlameSize();

    // 윈도우 리사이즈 이벤트 감지
    window.addEventListener("resize", updateFlameSize);
    return () => window.removeEventListener("resize", updateFlameSize);
  }, []);

  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));

            setTimeout(() => {
              setShowFlame(prev => ({
                ...prev,
                [entry.target.dataset.index]: true,
              }));
            }, 1000);
          }
        });
      },
      {threshold: 0.2},
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleAccountClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onClick = () => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSemjaj1QGcdkeWyq-rmPLRYd5_2TWyGjuQ4ddovwZal3Ma4cg/viewform?usp=dialog";
  };

  const handleCopy = () => {
    const accountNumber = "1013-01-5101537"; // 복사할 계좌번호
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // 2초 후 알림 제거
      })
      .catch(err => console.error("복사 실패:", err));
  };

  return (
    <Wrapper>
      <Container ref={el => (sectionsRef.current[0] = el)} data-index="0" isVisible={visibleSections[0]}>
        <ImgWrapper>
          {showFlame[0] && (
            <Flame show={showFlame[0]} width={flameSize.width} height={flameSize.height} top={flameSize.top} />
          )}
          <Img src={img1} alt="Party Image" />
        </ImgWrapper>
        <Text className="Title">40th, BIRTHDAY PARTY!</Text>
        <Text className="submain">
          CPU (<SmallText>대충</SmallText>) 40주년, <GlowText>떡</GlowText> 돌립니다!
        </Text>
        <Text className="main">2025년 3월 24일 18시</Text>
        <Text className="main">장소 - 미정(추후공지)</Text>
      </Container>
      <Container
        ref={el => (sectionsRef.current[1] = el)}
        data-index="1"
        isVisible={visibleSections[1]}
        className="subcontainer"
      >
        <ImgWrapper>
          {showFlame[1] && (
            <Flame
              show={showFlame[1]}
              className="small"
              width={flameSize1.width1}
              height={flameSize1.height1}
              top={flameSize1.top1}
            />
          )}
          <Img src={img2} alt="Party Image2" className="small" />
        </ImgWrapper>
        <Text className="Title">INVITATION</Text>
        <Text className="main">
          하나의 작은 코드에서 시작하여
          <br />
          수많은 밤을 함께 고민하고,
          <br />
          기술과 우정을 쌓아온 CPU가 어느덧 마흔 살이 되었습니다.
          <br />
          <br />
          작은 아이가 자라며 부모가 배워가듯,
          <br />
          우리는 CPU를 통해 성장하고, 배우고, 함께해 왔습니다.
          <br />
          그런 CPU의 40주년을 맞이하여,
          <br />
          감사하는 마음을 담아 조촐한 자리를 마련하였습니다.
          <br />
          <br />
          바쁘시더라도 함께 자리하셔서
          <br />
          CPU의 지난 40년을 돌아보고,
          <br />
          앞으로의 더 큰 도약을 축복해 주신다면
          <br />
          더없이 큰 기쁨이 될 것입니다.
          <br />
          <br />
          많은 관심과 참여 부탁드립니다!
        </Text>
      </Container>
      <Container
        ref={el => (sectionsRef.current[2] = el)}
        data-index="2"
        isVisible={visibleSections[2]}
        className="link"
      >
        <Text className="link">
          축하의 마음으로 참석해 주시는
          <br />
          <br />
          모든 분들을 귀하게 모실 수 있도록
          <br />
          <br /> 참석 여부 전달을 부탁드립니다.
        </Text>
        <Button onClick={onClick}>참석 여부 전달하기</Button>
      </Container>
      <Container
        ref={el => (sectionsRef.current[3] = el)}
        data-index="3"
        isVisible={visibleSections[3]}
        className="subcontainer2"
      >
        <ImgWrapper>
          {showFlame[3] && (
            <Flame
              show={showFlame[3]}
              className="small"
              width={flameSize1.width1}
              height={flameSize1.height1}
              top={flameSize1.top1}
            />
          )}
          <Img src={img2} alt="Party Image2" className="small" />
        </ImgWrapper>
        <Text className="Title">GALLERY</Text>
      </Container>
      <Img
        ref={el => (sectionsRef.current[4] = el)}
        data-index="4"
        isVisible={visibleSections[4]}
        className="main"
        src={main1}
      />
      <Img
        ref={el => (sectionsRef.current[5] = el)}
        data-index="5"
        isVisible={visibleSections[5]}
        className="main"
        src={main2}
      />
      <Img
        ref={el => (sectionsRef.current[6] = el)}
        data-index="6"
        isVisible={visibleSections[6]}
        className="main"
        src={main3}
      />
      <Footer ref={el => (sectionsRef.current[7] = el)} data-index="7" isVisible={visibleSections[7]}>
        <Text className="main">
          마음전하는 곳 <br />
          <br /> 참석하실 분들은 참가비를 입금해주세요!
        </Text>
        <Button className="account" onClick={handleAccountClick}>
          계좌번호 보기
        </Button>
      </Footer>
      <Text className="small">made by coticoger</Text>

      {showModal && (
        <Modal>
          <Header>
            <Text className="modal">입금할 계좌번호를 확인해 주세요</Text>
            <CloseButton onClick={handleCloseModal}>닫기</CloseButton>
          </Header>
          <ModalContent>
            <AccountInfo>
              <Text className="name">박도현(CPU)</Text>
              <AccountInfo className="row">
                <Text className="name">전북</Text>
                <Text className="name">1013-01-5101537</Text>
                <AccountInfo className="copy" onClick={handleCopy}>
                  {copySuccess ? (
                    <Button className="copy2">복사되었습니다!</Button>
                  ) : (
                    <Button className="copy">
                      <Icon /> 복사
                    </Button>
                  )}
                </AccountInfo>
              </AccountInfo>
              <Text className="name">참가비 : 20,000원</Text>
            </AccountInfo>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Party;
