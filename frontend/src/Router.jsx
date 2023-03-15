import React from 'react';
import App from './App';
import Join from './pages/Join/Join';
import Login from './pages/Login/Login';
import MyPage from './pages/User/MyPage';
import UserDelete from './pages/User/UserDelete';
import UserInfo from './pages/User/UserInfo';
import UserVolunteer from './pages/User/UserVolunteer';
import CommunityList from './pages/Community/CommunityList';
import CommunityDetailPage from './pages/Community/CommunityDetail';
import CommunityFormPage from './pages/Community/CommunityForm';
import CommunityEditPage from './pages/Community/CommunityEdit';
import AdminMain from './pages/Admin/AdminMain';
import AdminUser from './pages/Admin/AdminUser';
import AdminVolunteer from './pages/Admin/AdminVolunteer';
import AdminCommunity from './pages/Admin/AdminCommunity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyVolunteers from './pages/MyVolunteer/MyVolunteers';
import VolunteerDetail from './pages/MyVolunteer/VolunteerDetail';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/uservolunteer" element={<UserVolunteer />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/userdelete" element={<UserDelete />} />
        <Route path="/myvolunteers" element={<MyVolunteers />} />
        <Route path="/volunteerdetail" element={<VolunteerDetail />} />
        <Route path="/board/all" element={<CommunityList />} />
        <Route path="/board/:id" element={<CommunityDetailPage />} />
        <Route path="/board/edit/:id" element={<CommunityEditPage />} />
        <Route path="/board" element={<CommunityFormPage />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/volunteer" element={<AdminVolunteer />} />
        <Route path="/admin/community" element={<AdminCommunity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
