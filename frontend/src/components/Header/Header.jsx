import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import baseimg from '../../assets/images/baseimg.png';
import { useSelector, useDispatch } from 'react-redux';
import { initUser } from '../../redux/userSlice';
import { persistor } from '../../redux/store';
import axios from 'axios';

const Header = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그아웃에 사용
  const purge = async () => {
    await persistor.purge(); // persistStore의 데이터 전부 날림
  };

  const logoutHandler = async (e) => {
    try {
      await axios.post('/api/v1/auth/logout');
    } catch (error) {
      console.error(error);
    }
    dispatch(initUser());
    purge();
    navigate('/');
  };

  return (
    <PositionHeader>
      <ContentHeader>
        <Logo onClick={() => navigate('/')}>
          <img
            src={logo}
            style={{ width: '140px', height: '95px' }}
            alt="logo"
          />
        </Logo>
        <Spacer />
        {user.id === '' ? null : user.userType === 'admin' ? (
          <>
            <img
              alt="backgroundimg"
              src={baseimg}
              style={{ width: '55px', height: '55px', borderRadius: '50%' }}
            />
            <NicknameSpan onClick={() => navigate('/admin')}>
              관리자님
            </NicknameSpan>
          </>
        ) : (
          //유저면 이렇게 표시
          <>
            <img
              alt="backgroundimg"
              src={user.profileImage ? user.profileImage : baseimg}
              style={{ width: '45px', height: '45px', borderRadius: '50%' }}
            />
            <NicknameSpan onClick={() => navigate('/mypage')}>
              {user.nickname}님
            </NicknameSpan>
          </>
        )}
        {/* //로그인 되있으면 로그아웃표시 아니면 로그인표시 */}
        {user.id !== '' ? (
          <Span
            style={{ fontSize: '18px', fontWeight: '400', color: '#5d5d5d' }}
            onClick={logoutHandler}
          >
            로그아웃
          </Span>
        ) : (
          <Span
            style={{ fontSize: '18px', fontWeight: '400', color: '#5d5d5d' }}
            onClick={() => navigate('/login')}
          >
            로그인
          </Span>
        )}
        <Span
          style={{ fontSize: '18px', fontWeight: '400', color: '#5d5d5d' }}
          onClick={() => navigate('/board')}
        >
          커뮤니티
        </Span>
        <Span
          style={{ fontSize: '18px', fontWeight: '400', color: '#5d5d5d' }}
          onClick={() => navigate('/recruitment/main')}
        >
          봉사신청
        </Span>
      </ContentHeader>
    </PositionHeader>
  );
};

const PositionHeader = styled.header`
  background-color: white;
  padding: 10px 0;
  margin-top: -10px;
  z-index: 1;
  position: relative;
  top: 0px;
  width: 100%;
  height: 80px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
`;
const Logo = styled.div`
  cursor: pointer;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Span = styled.span`
  font-size: 22px;
  margin-left: 15px;
  cursor: pointer;
  font-weight: 500;
`;
const NicknameSpan = styled.span`
  font-size: 26px;
  margin-left: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

export default Header;
