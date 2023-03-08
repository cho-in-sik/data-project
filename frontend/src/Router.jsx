import React from 'react';
import App from './App';
import MyPage from './pages/MyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
