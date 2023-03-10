import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import Header from '../../components/Header/Header';

const UserDelete = (props) => {
  const [password, setPassword] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = { password };

    try {
      const res = await axios.delete(
        `https://ee01f75c-7547-42d4-b77b-5fc613f782d7.mock.pstmn.io/userdelete`,
        {
          data: { ...formData },
        },

        //헤더에 토큰
        // {
        //   headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        //   },
        // },
      );
      alert(res);
      //회원 탈퇴시 토큰 제거
      // localStorage.removeItem('ACCESS_TOKEN');
      alert('회원 탈퇴 되었습니다.');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
      alert('비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <Header />
      <BackGround>
        <WithdrawBox>
          <PasswordSpan>
            서비스 탈퇴를 위해 비밀번호를 입력해 주세요.
          </PasswordSpan>
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={'password'}
          />
          <WithdrawButton onClick={handleClick}>회원 탈퇴</WithdrawButton>
        </WithdrawBox>
      </BackGround>
    </>
  );
};

const WithdrawBox = styled.div`
  width: 40%;
  height: 250px;
  background-color: white;
  border-radius: 20px;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const PasswordSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
  position: absolute;
  top: 35%;
  left: 20%;
`;

const PasswordInput = styled.input`
  position: absolute;
  top: 60%;
  left: 36%;
  width: 160px;
  height: 25px;
  border: none;
  outline: none;
  text-align: center;
  background-color: #f2f2f2;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const WithdrawButton = styled.button`
  font-weight: 500;
  border: none;
  color: whitesmoke;
  background-color: #ff5065;
  position: absolute;
  right: 30px;
  bottom: 30px;
  border-radius: 10%;
  font-size: 16px;
  padding: 6px 14px;
  cursor: pointer;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

export default UserDelete;
