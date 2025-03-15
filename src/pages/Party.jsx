import React,{useState} from "react";
import styled, {keyframes} from 'styled-components';
import img1 from './Pic/party1.png';
import img2 from './Pic/party2.png';
import main1 from './Pic/main1.jpeg';
import main2 from './Pic/main2.jpeg';
import main3 from './Pic/main3.jpeg';
import { IoMdCopy } from "react-icons/io";

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
    width: calc(50%);
    height: auto;
    margin-top: 100px;
    &.small{
        width: calc(90%);
        margin: 0;
        margin-top: 100px;
    }
    &.main{
        margin: 0;
        width: 80%;
        height: auto;
        margin-bottom: 20px;
        border-radius: 10px;
    }
`;

const Container = styled.div`
    background: white;
    width: calc(80%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.subcontainer{
        margin-bottom: 40px;
    }
    &.link{
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
    &.submain{
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
    &.link{
        font-family: "Dug";
        color: black;
        background: white;
        font-size: 14px;
        margin: 15px auto;
        text-align: center;
    }
    &.modal{
        background: white;
        font-family: "Dug";
        margin: 0;
        padding: 0;
    }
    &.name{
        background: white;
        font-family: "Dug";
        align-self: flex-start;
        margin: 0;
        padding: 10px;
    }
`;

/* ✨ '떡'을 빛나게 만들기 위한 스타일 추가 */
const GlowText = styled.span`
    font-size: 14px; /* '떡' 글자 크기 */
    font-weight: bold;
    color: black; /* 노란색 */
    text-shadow: 0 0 5px #ffcc00, 0 0 10px #ff9900, 0 0 15px #ff6600; /* 빛나는 효과 */
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
    margin: 5px auto 20px auto;
    font-family: "Dug";
    &.account{
        color: #abaedd;
        background: #f1f2fe;
        border: 1px solid  #abaedd;
        border-radius: 30px;
        padding: 10px 15px;
        margin: 30px auto 20px auto;
        font-family: "Dug"; 
        font-size: 20px;
        width: calc(100%);
    }
    &.copy{
        color: black;
        background: #e3e1e1;
        font-family: "Dug";
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 0;
    }
    &.copy2{
        color: red;
        background: white;
        font-family: "Dug";
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 0;
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: white;
    margin: 20px auto;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
`

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
    &.row{
        background: white;
        display: flex;
        flex-direction: row;
        align-self: flex-start;
        padding: 0;
        margin: 0;
    }
    &.copy{
        background: #e3e1e1;
        padding: 0;
        border-radius: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
        &.hover{
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
`;

const Icon = styled(IoMdCopy)`
    background: #e3e1e1;
    vertical-align: middle;
    font-size: 14px;
`

const Party = () =>{
    const [showModal, setShowModal] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleAccountClick = () =>{
        setShowModal(true);
    };

    const handleCloseModal = () =>{
        setShowModal(false);
    };

    const onClick = () =>{
        window.location.href="https://docs.google.com/forms/d/e/1FAIpQLSemjaj1QGcdkeWyq-rmPLRYd5_2TWyGjuQ4ddovwZal3Ma4cg/viewform?usp=dialog"
    };

    const handleCopy = () => {
        const accountNumber = "1013-01-5101537"; // 복사할 계좌번호
        navigator.clipboard.writeText(accountNumber)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // 2초 후 알림 제거
            })
            .catch(err => console.error("복사 실패:", err));
    };

    return(
        <Wrapper>
            <Img src={img1} alt="Party Image"/>
            <Container>
                <Text className="Title">
                    40th, BIRTHDAY PARTY!
                </Text>
                <Text className="submain">
                    CPU (<SmallText>대충</SmallText>) 40주년, <GlowText>떡</GlowText> 돌립니다!
                </Text>
                <Text className="main">2025년 3월 24일 18시</Text>
                <Text className="main">장소 - 미정(추후공지)</Text>
            </Container>
            <Img className="small" src={img2} alt="Party Image2"/>
            <Container className="subcontainer">
                <Text className="Title">
                    INVITATION
                </Text>
                <Text className="main">하나의 작은 코드에서 시작하여<br/>
                    수많은 밤을 함께 고민하고,<br/>
                    기술과 우정을 쌓아온 CPU가 어느덧 마흔 살이 되었습니다.
                    <br/><br/>
                    작은 아이가 자라며 부모가 배워가듯,<br/>
                    우리는 CPU를 통해 성장하고, 배우고, 함께해 왔습니다.<br/>
                    그런 CPU의 40주년을 맞이하여,<br/>
                    감사하는 마음을 담아 조촐한 자리를 마련하였습니다.
                    <br/><br/>
                    바쁘시더라도 함께 자리하셔서<br/>
                    CPU의 지난 40년을 돌아보고,<br/>
                    앞으로의 더 큰 도약을 축복해 주신다면<br/>
                    더없이 큰 기쁨이 될 것입니다.
                    <br/><br/>
                    많은 관심과 참여 부탁드립니다!
                </Text>
            </Container>
            <Container className="link">
                <Text className="link">축하의 마음으로 참석해 주시는<br/><br/>
                모든 분들을 귀하게 모실 수 있도록<br/><br/> 참석 여부 전달을 부탁드립니다.</Text>
                <Button onClick={onClick}>참석 여부 전달하기</Button>
            </Container>
            <Img className="small" src={img2} alt="Party Image2"/>
            <Container className="subcontainer">
                <Text className="Title">
                GALLERY
                </Text>
            </Container>
            <Img className="main" src={main1}/>
            <Img className="main" src={main2}/>
            <Img className="main" src={main3}/>
            <Footer>
                <Text className="main">마음전하는 곳 <br/><br/> 참석하실 분들은 참가비를 입금해주세요!</Text>
                <Button className="account" onClick={handleAccountClick}>계좌번호 보기</Button>
            </Footer>

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
                                    {copySuccess ? <Button className="copy2">복사되었습니다!</Button> : <Button className="copy"><Icon/> 복사</Button>}
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
