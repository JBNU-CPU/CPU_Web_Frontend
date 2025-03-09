import React, { useContext, useState, useRef,  useEffect} from "react";
import styled from "styled-components";
import logo from './logo/CPU_logo_white.png';
import { Link, useNavigate,useLocation  } from "react-router-dom";
import AuthContext from "../AuthContext";
import AdminContext from "../AdminContext";
import axios from "axios";
import EventPopUp from "./EventPopup";

const Container = styled.div`
    width: calc(40%);
    background: #1b1d25;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    top: 60px;
    @media screen and (max-width : 480px) {
        width: calc(70%);
    }
    @media screen and (max-width : 1023px) {
        height: 100%;
    }
    @media screen and (min-width : 1024px) {
        width: 100%;
        top: 0;
        min-height: 110px;
        flex-direction : row;
        justify-content : space-between;
        align-items: center;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0));
        transition: transform 0.5s ease-in-out;
        transform: ${({ isVisible }) => (isVisible ? "translateY(0)" : "translateY(-100%)")};
    }
`;


const LogoWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    background: none;
    padding: 10px;
    @media screen and (min-width: 1024px){
        margin-left:30px;
    }
`;

const Logo = styled.img`
    background: none;
    width: 90px;
    height: 90px;
    margin-top: 50px;
    @media screen and (max-width : 700px) {
        width: 80px;
        height: auto;
    }
    @media screen and (min-width: 1024px){
        width:50px;
        height:50px;
        margin : 0;
    }
`;

const MenuWrapper = styled.ul`
    list-style: none;
    background: none;
    font: bold 23px 'arial';
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 18px;
    @media screen and (max-width : 700px) {
       font-size: 18px;
    }
    @media screen and (min-width: 1024px) {
        display: flex;
        justify-content: center;
        align-items:center;
    }
`;
const MenuBox = styled.div`
    @media screen and (min-width: 1024px) {
        margin: 0 10px 0 10px;
        text-align: center;
        width:100px;
        justify-content: center;
        background:none;
    }
`;

const Menuli = styled.li`
    color: white;
    background: none;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
    transition: text-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 추가 */
    @media screen and (min-width: 1024px) {
        display : flex;
        align-items:center;
        justify-content : center;
        white-space: nowrap;
        padding-top: 0px;
        padding-bottom: 0;
        height:30px;
    }
    &:hover {
        text-shadow: 0 0 10px #d1cecf; /* 글자 주변 빛나는 효과 */
        transform: scale(1.05); /* 살짝 확대 */
    }

    &:active {
        text-shadow: 0 0 15px #d1cecf; /* 클릭 시 빛나는 효과 강화 */
        transform: scale(1); /* 클릭 시 원래 크기로 복귀 */
    }
`;


const SubMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    background: none;
    @media screen and (min-width: 1024px) {
        display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
        position: absolute;  /* 헤더 내부에서 드롭다운을 띄우기 위한 absolute */
        top: 60%;  /* 헤더 바로 아래로 위치하도록 top을 100%로 설정 */
        z-index: 1002;  /* 드롭다운 메뉴가 다른 요소 위로 보이도록 z-index 설정 */
    }
`;

const SubMenu = styled.ul`
    background: none;
    border-top: 2px solid #ab1a65;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 150px;
    font: bold 17px 'arial';
    @media screen and (max-width : 700px) {
        font-size: 15px;
        width: calc(70%);
    }
    @media screen and (min-width : 1024px) {
        width:100px;
        justify-content: center;
        border-top: 1.5px solid rgb(196, 0, 101);
        font: normal 15px 'arial';
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        margin-top: 5px;
        padding-top : 5px;
        padding-bottom : 8px;
        background: linear-gradient(to bottom,rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0.2));
    }
`;

const LoginWrapper = styled.div`
    background: none;
    display: flex;
    justify-content: center;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-top:10px;
    @media screen and (min-width: 1024px) {
        flex-direction: row;
        margin-right: 23px;
        margin-top:0;
    }
`;

const Login = styled.button`
    align-items: center;
    border: 1.5px solid #ab1a65;
    border-radius: 5px;
    background: none;
    font: bold 12px 'arial';
    font-weight: 700;
    width: 70px;
    height: 30px;
    color: white;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(1); /* 살짝 확대 */
        a{
            color: gray;
        }
    }
    @media screen and (max-width : 700px) {
        width: 60px;
        height: 25px;
        font-size: 12px;
    }
    @media screen and (min-width: 1024px) {
        font: normal 13px 'arial';
        width: 60px;
        height: 25px;
    }    
`;


const StyledLink = styled(Link)`
    background: none;
    text-decoration: none;
    color: white;
`;

const Mypage = styled.p`
    color: white;
    margin: 20px 0 20px 0;
    font: bold 13px 'arial';
    &:hover{
        cursor: pointer;
    }
    @media screen and (max-width : 700px) {
        font-size: 12px;
    }
    @media screen and (min-width: 1024px) {
        align-self:center;
        margin: 0 10px 0 0;
        white-space: nowrap;
        font: normal 13px 'arial';
        background:none;
    }    
`

const Menu = ({closeMenu, setShowPopup}) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const {isAdmin, setIsAdmin} = useContext(AdminContext);

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus); // 새로고침 후 로그인 상태 유지
        const adminStatus = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(adminStatus);
    }, []);

    const menuRef = useRef(null);
    //화면 사이즈 (데스크탑)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

    useEffect(()=>{
        const handleResize = () => setIsDesktop(window.innerWidth>=1024); //사이즈 감지
        window.addEventListener("resize",handleResize); //창 크기 변경 시 발생
        return ()=> window.removeEventListener("resize",handleResize);
    },[]);
    
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > prevScrollY) {
                setIsVisible(false); // 아래로 스크롤하면 숨김
            } else {
                setIsVisible(true); // 위로 스크롤하면 표시
            }
            setPrevScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    // 상위 메뉴 클릭 시
    const toggleMenu = (menuName) => {
        setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
    };

    const handleSubMenuClick = (tab) => {
        navigate('/studymain', { state: { tab } });
        closeMenu();
    };

    const handlemypage = () => {
        navigate('/mypage');
        closeMenu();
    };

    const handleLogin = () => {
        navigate('/login');
        closeMenu();
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
                withCredentials: true, // 쿠키 포함
            });
                // 로그아웃 성공
            document.cookie = "JSESSIONID=; path=/logout; domain=https://api.jbnucpu.co.kr/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // JSESSIONID 쿠키 삭제
            
            alert("로그아웃 되었습니다.");
                /* 
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem('username');
                setIsAuthenticated(false);
            
                window.location.href = "/";
                */

        } catch (error) {
            console.error("로그아웃 요청 중 오류 발생:", error);
        }finally{
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem('username');
            localStorage.removeItem("isAdmin");
            setIsAuthenticated(false);

            window.location.href = "/";
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const hamburgerButton = document.querySelector('.hamburger-icon');
            if ((menuRef.current && !menuRef.current.contains(event.target)) ||
            (hamburgerButton && hamburgerButton.contains(event.target))){
                closeMenu(); // 메뉴 닫기 함수 호출
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu]);
    

    return (
        <>
        <Container ref={menuRef} isVisible={isVisible}>
            <LogoWrapper to="/" onClick={() => closeMenu()}>
                <Logo src={logo} />
            </LogoWrapper>
            <MenuWrapper>
                <MenuBox>
                    <Menuli><StyledLink to='/about' onClick={() => closeMenu()}>About CPU</StyledLink></Menuli>
                </MenuBox>
                <MenuBox>
                    <Menuli
                        onClick={!isDesktop? () => toggleMenu("study") : undefined}
                        onMouseEnter={isDesktop ? () => setOpenMenu("study") : undefined}
                        onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                    >
                        Study
                    </Menuli>
                    {openMenu === "study" && (
                        <SubMenuWrapper 
                            onMouseEnter={isDesktop ? () => setOpenMenu("study") : undefined}
                            onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                            isOpen={openMenu === "study"}>
                            <SubMenu>
                                <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('section')}>세션</Menuli>
                                <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('study')}>스터디</Menuli>
                                <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('project')}>프로젝트</Menuli>
                            </SubMenu>
                        </SubMenuWrapper>
                    )}
                </MenuBox>
                <MenuBox>
                    <Menuli
                        onClick={!isDesktop? () => toggleMenu("board") : undefined}
                        onMouseEnter={isDesktop ? () => setOpenMenu("board") : undefined}
                        onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                    >
                        Board
                    </Menuli>
                    {openMenu === "board" && (
                        <SubMenuWrapper 
                            onMouseEnter={isDesktop ? () => setOpenMenu("board") : undefined}
                            onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                            isOpen={openMenu === "board"}
                        >
                            <SubMenu>
                                <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/notification' onClick={() => closeMenu()}>공지사항</StyledLink></Menuli>
                                <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/community' onClick={() => closeMenu()}>커뮤니티</StyledLink></Menuli>
                                <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/gallery' onClick={() => closeMenu()}>갤러리</StyledLink></Menuli>
                            </SubMenu>
                        </SubMenuWrapper>
                    )}
                </MenuBox>
                <MenuBox><Menuli><StyledLink to='/recruit' onClick={() => closeMenu()}>Recruit</StyledLink></Menuli></MenuBox>
                <MenuBox>
                    <Menuli><StyledLink onClick={()=> setShowPopup(true)}>Event</StyledLink></Menuli>
                </MenuBox>
                {isAdmin && ( // isAdmin이 true일 때만 Management 표시
                    <MenuBox><Menuli><StyledLink to='/management' onClick={() => closeMenu()}>Management</StyledLink></Menuli></MenuBox>
                )}
            </MenuWrapper>
            <LoginWrapper>
                {isAuthenticated ? (
                    <>
                        <Mypage onClick={handlemypage}>마이페이지</Mypage>
                        <Login onClick={handleLogout}>
                            <StyledLink>Log out</StyledLink>
                        </Login>
                    </>
                ) : (
                    <Login onClick={handleLogin}>
                        <StyledLink>Log in</StyledLink>
                    </Login>
                )}
            </LoginWrapper>
        </Container>
      </>
    );
};

export default Menu;
