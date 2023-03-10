import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleClick = async () => {
    if (email === '' || pw === '') {
      alert('이메일과 패스워드를 입력해주세요.');
      return false;
    }
    alert('로그인에 성공했습니다.');
    navigate('/MyPage');
    /* try {
      const res = await axios.post('/api/login', { email, pw });
      console.log(res);
      localStorage.setItem('token', res.data.token);
      navigate('/MyPage');
    } catch (e) {
      console.log(e);
    } */
  };
  return (
    <div className="LoginBox">
      <h1 className="LoginTitle">로그인</h1>
      <div className="LoginWrapper">
        <p>이메일</p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <p>비밀번호</p>
        <input type="text" name="pw" value={pw} onChange={handlePwChange} />
      </div>
      <button onClick={handleClick}>로그인</button>
      <p>아직 회원이 아니신가요?</p>
      <Link to="/join">회원가입하기</Link>
    </div>
  );
}

export default Login;
