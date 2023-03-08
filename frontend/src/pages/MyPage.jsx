import React from 'react';
import styled from 'styled-components';
import background1 from '../assets/images/background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshakeAngle,
  faUser,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const MyPage = (props) => {
  return (
    <div>
      <header>its header</header>
      <BackGround>
        <MypageBox>
          <MyVolunteer>
            <FontAwesomeIcon icon={faHandshakeAngle} size="10x" style={{}} />
            <Span>나의 봉사 내역</Span>
          </MyVolunteer>
          <MyInfo>
            <FontAwesomeIcon icon={faUser} size="10x" style={{}} />
            <Span>개인정보관리</Span>
          </MyInfo>
          <Withdraw>
            <FontAwesomeIcon icon={faTrashCan} size="10x" style={{}} />
            <Span>회원 탈퇴</Span>
          </Withdraw>
        </MypageBox>
      </BackGround>
    </div>
  );
};

const BackGround = styled.div`
  height: 100vh;
  border: 1px solid black;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  ::before {
    content: '';
    background-image: url(${background1});
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;

const MypageBox = styled.div`
  width: 80%;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const MyVolunteer = styled.div`
  color: #2ccc63;
  width: 230px;
  height: 230px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MyInfo = styled(MyVolunteer)``;
const Withdraw = styled(MyVolunteer)``;

const Span = styled.span`
  margin-top: 50px;
  font-weight: 500;
  font-size: 30px;
  color: black;
`;

export default MyPage;
