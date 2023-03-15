import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import baseimg from '../../assets/images/baseimg.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <PositionHeader>
      <ContentHeader>
        <Logo onClick={() => navigate('/')}>
          <img
            src={logo}
            style={{ width: '110px', height: '90px' }}
            alt="logo"
          />
        </Logo>
        <Spacer />
        {!isLoggedIn && (
          <>
            <img
              alt="backgroundimg"
              src={baseimg}
              style={{ width: '45px', height: '45px', borderRadius: '50%' }}
            />
            <Span onClick={() => navigate('/mypage')}>조인식님</Span>
          </>
        )}

        {!isLoggedIn ? (
          <Span onClick={() => navigate('/login')}>로그인</Span>
        ) : (
          <Span onClick={() => navigate('/')}>로그아웃</Span>
        )}

        <Span onClick={() => navigate('/community/all')}>커뮤니티</Span>
        <Span onClick={() => navigate('/')}>봉사신청</Span>
      </ContentHeader>
    </PositionHeader>
  );
};

const PositionHeader = styled.header`
  background-color: white;
  margin-top: -10px;

  position: relative;

  top: 0px;
  width: 100%;
  height: 80px;
  box-shadow: 2px 3px 3px 2px rgba(0, 0, 0, 0.25);
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
  font-size: 20px;
  margin-left: 15px;
  cursor: pointer;
  font-weight: 500;
`;

export default Header;
