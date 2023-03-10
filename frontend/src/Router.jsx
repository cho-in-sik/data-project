import React from 'react';
import App from './App';
import MyPage from './pages/User/MyPage';
import UserDelete from './pages/User/UserDelete';
import UserInfo from './pages/User/UserInfo';
import UserVolunteer from './pages/User/UserVolunteer';
import CommunityList from './pages/Community/CommunityList';
import CommunityDetailPage from './pages/Community/CommunityDetail';
import CommunityFormPage from './pages/Community/CommunityForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyVolunteers from './pages/MyVolunteer/MyVolunteers';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/uservolunteer" element={<UserVolunteer />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/userdelete" element={<UserDelete />} />
        <Route path="/myvolunteers" element={<MyVolunteers />} />
        <Route path="/community/all" element={<CommunityList />} />
        <Route path="/community/:id" element={<CommunityDetailPage />} />
        <Route path="/community" element={<CommunityFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
