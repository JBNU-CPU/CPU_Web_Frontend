import React,{useState,useEffect} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import logo from './logo/CPU_logo_white.png';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import EventPopUp from "./EventPopup";

const MainHeader = styled.header`
    width : 100%;  
    height: 60px;
    background: #1b1d25;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    overflow-Y: hidden;
    position: fixed; /* 화면에 고정 */
    top: 0; /* 화면 상단에 위치 */
    left: 0; /* 왼쪽부터 채움 */
    right: 0; /* 오른쪽까지 채움 */
    z-index: 1000; /* 다른 요소 위로 보이도록 z-index 설정 */
    
    @media screen and ( min-width : 1024px ){
        display : none;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`

const ImgLink = styled(Link)`
    width: 50px;
    height: 50px;
    background: black;
    padding: 0;
    margin: 0;
`

const Hamburger = styled(GiHamburgerMenu)`
    color: white;
    background: #1b1d25;
    width: 31px;
    height: 31px;
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: auto;
    &:hover{
        color: gray;
    }
`
const CloseIcon = styled(AiOutlineClose)`
    color: white;
    background: #1b1d25;
    width: 31px;
    height: 31px;
    position: absolute;
    left:60%;   /* 100 - (menu.jsx/Container width) */
    margin-left:10px;
    cursor: pointer;
    z-index: auto;
    @media screen and (max-width : 480px) {
        left: 30%; /* 100 - (menu.jsx/Container width) */
    }
    &:hover {
        color: gray;
    }
`;

// to경로 메인 페이지로 이동하도록 설정하기
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('hasVisited')) {
            setShowPopup(true); // 첫 방문이면 팝업 띄우기
          }
    }, []);
    //화면 사이즈 (태블릿&데스크탑)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

    useEffect(()=>{
        const handleResize = () => setIsDesktop(window.innerWidth>=1024); //사이즈 감지
        window.addEventListener("resize",handleResize); //창 크기 변경 시 발생
        return ()=> window.removeEventListener("resize",handleResize);
    },[]);

    // Menu 열기/닫기 토글
    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuOpen((prevState) => !prevState);
    };

    // Menu 닫기 함수
    const closeMenu = () => {
        setMenuOpen(false);
    };
    useEffect(()=>{
        if(showPopup){
            closeMenu();
        }
    })

    return (
        <>
            <MainHeader>
                {!menuOpen && (
                    <>
                    <ImgLink to="/"><Img src={logo} alt="cpu_white_logo" /></ImgLink>
                    </>
                )}
                {!isDesktop && (
                    menuOpen ? (
                        <CloseIcon onClick={toggleMenu} className="close-icon" />
                      ) : (
                        <Hamburger onClick={toggleMenu} className="hamburger-icon" />
                      )
                )}
            </MainHeader>
            {isDesktop && <Menu closeMenu={closeMenu} setShowPopup = {setShowPopup}/>}
            {!isDesktop && menuOpen && <Menu closeMenu={closeMenu} setShowPopup = {setShowPopup}/>}
            {showPopup && <EventPopUp showPopup={showPopup} setShowPopup={setShowPopup} closeMenu={closeMenu} />}
        </>
    );
};

export default Header;