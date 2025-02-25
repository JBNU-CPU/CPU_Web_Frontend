import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import About from '../pages/About';
import Community from '../pages/Community';
import Gallery from '../pages/Gallery';
import Login from '../pages/Login';
import Notification from '../pages/Notification';
import Recruit from '../pages/Recruit';
import Management from '../pages/Management';
import Mypage from '../pages/Mypage';
import Join2 from '../pages/Join2';
import FindPassword from '../pages/FindPassword';
import ReviseMemInfo2 from '../pages/ReviseMemInfo2';
import StudyMainPage from '../pages/StudyMainPage';
import GalleryDetail from '../pages/GalleryDetail';
import SectionOpen from '../pages/SectionOpen';
import StudyOpen from '../pages/StudyOpen';
import ProjectOpen from '../pages/ProjectOpen';
import NotiContent from '../pages/NotiContent';
import NotiWrite from '../pages/NotiWrite';
import CommunityContent from '../pages/CommunityContent';
import CommunityWrite from '../pages/CommunityWrite';
import Studyinfo from '../pages/Studyinfo';
import Sectioninfo from '../pages/Sectioninfo';
import Projectinfo from '../pages/Projectinfo';
import UserManage from '../pages/UserManage';
import SectionManage from '../pages/SectionManage';
import StudyManage from '../pages/StudyManage';
import ProjectManage from '../pages/ProjectManage';
import EventGame from '../pages/EventGame';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<About />} />

            <Route path='/gallery' element={<Gallery />} />
            <Route path='/galleryDetail/:id' element={<GalleryDetail/>}/>

            <Route path='/recruit' element={<Recruit />} />
            <Route path ='/mypage' element={<Mypage/>}/>

            <Route path='/join2' element={<Join2/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/findpassword' element={<FindPassword/>}/>
            <Route path='/revisememberinfo2' element={<ReviseMemInfo2/>}/>

            {/* 관리자페이지 경로 */}
            <Route path='/management' element={<Management />} />
            <Route path='/usermanage' element={<UserManage/>}/>
            <Route path='/sectionmanage' element={<SectionManage/>}/>
            <Route path='/studymanage' element={<StudyManage/>}/>
            <Route path='/projectmanage' element={<ProjectManage/>}/>

            {/* 커뮤니티 관련 경로 */}
            <Route path='/community' element={<Community />} />
            <Route path='/write' element={<CommunityWrite/>}/>
            <Route path='/content' element={<CommunityContent/>}/>
            
            {/* 공지사항 관련 경로 */}
            <Route path='/notification' element={<Notification />} />
            <Route path='/noticontent' element={<NotiContent/>}/>
            <Route path='/notiwrite' element={<NotiWrite/>}/>

            {/* 스터디 관련 경로 */}
            <Route path='/studymain' element={<StudyMainPage/>}/>

            <Route path='/projectinfo/:id' element={<Projectinfo/>}/>
            <Route path='/projectopen' element={<ProjectOpen/>}/>

            <Route path='/sectionopen' element={<SectionOpen/>}/>
            <Route path='/sectioninfo/:id' element={<Sectioninfo/>}/>

            <Route path='/studyopen' element={<StudyOpen/>}/>
            <Route path='/studyinfo/:id' element={<Studyinfo/>}/>

            <Route path='/eventGame' element={<EventGame/>}/>
        </Routes>
    );
};

export default AppRoutes;
