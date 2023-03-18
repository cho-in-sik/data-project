import React, { useState } from 'react';
import { loginUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import Header from '../../components/Header/Header';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    if (email === '' || password === '') {
      alert('이메일과 패스워드를 입력해주세요.');
      return false;
    }

    try {
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      console.log(res);
      dispatch(loginUser(res.data));
      if (res.statusText === 'OK') {
        navigate('/mypage');
      } else {
        alert('아이디와 비밀번호를 확인하세요.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BackGround>
      <Header />
      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <LoginWrapper>
          <LoginItem>
            <p>이메일</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </LoginItem>
          <LoginItem>
            <p>비밀번호</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePwChange}
            />
          </LoginItem>
        </LoginWrapper>
        <button onClick={handleClick}>로그인</button>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/join">회원가입하기</Link>
      </LoginBox>
    </BackGround>
  );
}
const LoginBox = styled.div`
  position: relative;
  width: 30%;
  min-width: 520px;
  background: #eee;
  border-radius: 20px;
  text-align: center;
  padding: 3rem 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 3rem;

  button {
    display: block;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #47b781;
    width: 20rem;
    height: 2.5rem;
    border-radius: 20px;
    margin: 1rem auto 0.5rem;
    cursor: pointer;
  }
  p {
    display: inline-block;
    font-size: 0.8rem;
    margin-right: 5rem;
  }
  a {
    text-decoration: none;
    color: #ff0000;
    font-size: 0.8rem;
  }
`;

const LoginTitle = styled.h1`
  width: 50%;
  font-size: 2rem;
  margin: 1rem auto;
`;

const LoginWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const LoginItem = styled.div`
  width: 90%;
  margin: 2rem 1rem;
  p {
    font-size: 0.8rem;
    text-align: left;
    width: 30%;
    margin-bottom: 0.5rem;
    float: left;
  }
  input {
    width: 100%;
    background-color: #eee;
    border: none;
    border-bottom: 2px solid #a3a3a3;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    font-size: 0.8rem;
  }
`;

export default Login;
