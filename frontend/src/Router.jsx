import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import Join from './pages/Join/Join';
import Login from './pages/Login/Login';
import MyPage from './pages/User/MyPage';
import UserDelete from './pages/User/UserDelete';
import UserInfo from './pages/User/UserInfo';
import UserVolunteer from './pages/User/UserVolunteer';
import CommunityList from './pages/Community/CommunityList';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommunityForm from './pages/Community/CommunityForm';
import CommunityEdit from './pages/Community/CommunityEdit';
import MyVolunteers from './pages/MyVolunteer/MyVolunteers';
import VolunteerDetail from './pages/MyVolunteer/VolunteerDetail';
import RecruitmentMain from './components/Recruitment/RecruitmentMain';
import RecruitByGu from './pages/RecruitByGu/RecruitByGu';
import RecruitByGuDetail from './pages/RecruitByGu/RecruitByGuDetail';
import RecruitByGuForm from './pages/RecruitByGu/RecruitByGuForm';
import NotFound from './pages/NotFound/NotFound';

// protected route
import LoginRoute from './components/Route/LoginRoute/LoginRoute';
import NonLoginRoute from './components/Route/NonLoginRoute/NonLoginRoute';
import AdminRoute from './components/Route/AdminRoute/AdminRoute';

// 관리자 페이지
import AdminMain from './pages/Admin/AdminMain';
import AdminUser from './pages/Admin/AdminUser';
import AdminVolunteer from './pages/Admin/AdminVolunteer';
import AdminCommunity from './pages/Admin/AdminCommunity';

//차트 (보기용)
import TimeOfAccident from './pages/chart/TimeOfAccident';
import PieMortality from './pages/chart/PieMortality';
import TypeOfAccident from './pages/chart/TypeOfAccident';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recruitment/main" element={<RecruitmentMain />} />
        <Route path="/recruitment/:id" element={<RecruitByGu />} />
        <Route element={<NonLoginRoute />}>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoginRoute />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/uservolunteer" element={<UserVolunteer />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/userdelete" element={<UserDelete />} />
          <Route path="/myvolunteers" element={<MyVolunteers />} />
          <Route path="/volunteerdetail" element={<VolunteerDetail />} />
          <Route path="/board" element={<CommunityList />} />
          <Route path="/board/:id" element={<CommunityDetail />} />
          <Route path="/board/edit/:id" element={<CommunityEdit />} />
          <Route path="/board/write" element={<CommunityForm />} />
          <Route path="/recruitment/:id/:id" element={<RecruitByGuDetail />} />
          <Route path="/recruitment/:id/form" element={<RecruitByGuForm />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminMain />} />
            <Route path="/admin/user" element={<AdminUser />} />
            <Route path="/admin/volunteer" element={<AdminVolunteer />} />
            <Route path="/admin/community" element={<AdminCommunity />} />
          </Route>
        </Route>
        {/* //지울것들 보기용도 */}
        <Route path="/1" element={<TimeOfAccident />} />
        <Route path="/2" element={<TypeOfAccident />} />
        <Route path="/3" element={<PieMortality />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
