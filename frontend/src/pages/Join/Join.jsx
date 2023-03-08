import React, { useState, useRef } from 'react';
import axios from 'axios';

const Join = () => {
  const inputRef = useRef([]);
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    nickname: '',
    phone: '',
    pw: '',
    pwConfirm: '',
    address: '',
  });
  const { email, name, nickname, phone, pw, pwConfirm, address } = inputs;

  // 유효성 검사
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  debugger;
  const validEmail = regExp.test(email);
  const validName = name.length >= 2 && name.length <= 20;
  const validNickname = nickname.length >= 2 && nickname.length <= 20;
  const validPw = pw.length >= 4 && pw.length <= 20;
  const validPwConfirm = pwConfirm === pw;
  const validBlank =
    email === '' ||
    name === '' ||
    nickname === '' ||
    phone === '' ||
    pw === '' ||
    pwConfirm === '' ||
    address === '';

  // 각 폼 입력시 onChange 이벤트
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 버튼 클릭시 클릭 이벤트
  const handleClick = () => {
    if (!validEmail) {
      alert('올바른 이메일을 입력하세요.');
      setInputs({
        ...inputs,
        email: '',
      });
      inputRef.current[0].focus();
    } else if (!validName) {
      alert('올바른 이름을 입력하세요.');
      setInputs({
        ...inputs,
        name: '',
      });
      inputRef.current[1].focus();
    } else if (!validNickname) {
      alert('올바른 닉네임을 입력하세요.');
      setInputs({
        ...inputs,
        nickname: '',
      });
      inputRef.current[2].focus();
    } else if (!validPw) {
      alert('비밀번호는 4자 이상, 20자 미만입니다.');
      setInputs({
        ...inputs,
        pw: '',
      });
      inputRef.current[3].focus();
    } else if (!validPwConfirm) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      setInputs({
        ...inputs,
        pwConfirm: '',
      });
      inputRef.current[4].focus();
    } else {
      submitData();
    }
  };

  // api에 전달
  const submitData = async () => {
    debugger;

    const data = {
      name: name,
      email: email,
      password: pw,
      address: address,
      phoneNumber: phone,
      nickname: nickname,
      profileImage: '',
      type: '',
    };
    try {
      await axios.post('/public/data/userlist.json', { ...data });
      alert('회원가입 성공!');
    } catch (e) {
      console.error(e);
    }
  };

  // submitData();

  return (
    <div className="JoinBox">
      <p className="JoinTitle">회원가입</p>
      <div className="JoinWrapper">
        <p>이메일</p>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleChange}
          ref={(i) => (inputRef.current[0] = i)}
        />
        {validEmail ? null : <p>올바른 이메일을 입력하세요.</p>}
        <p>이름</p>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={handleChange}
          ref={(i) => (inputRef.current[1] = i)}
        />
        {validName ? null : <p>올바른 이름을 입력하세요.</p>}
        <p>닉네임</p>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={handleChange}
          ref={(i) => (inputRef.current[2] = i)}
        />
        {validNickname ? null : <p>올바른 닉네임을 입력하세요.</p>}
        <p>전화번호</p>
        <input
          type="text"
          name="phone"
          placeholder="전화번호를 입력해주세요."
          value={phone}
          onChange={handleChange}
          ref={(i) => (inputRef.current[3] = i)}
        />
        <p>비밀번호</p>
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력해주세요."
          value={pw}
          onChange={handleChange}
          ref={(i) => (inputRef.current[4] = i)}
        />
        {validPw ? null : <p>올바른 비밀번호를 입력하세요.</p>}
        <p>비밀번호 확인</p>
        <input
          type="password"
          name="pwConfirm"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={pwConfirm}
          onChange={handleChange}
          ref={(i) => (inputRef.current[5] = i)}
        />
        {validPwConfirm ? null : <p>비밀번호 확인이 일치하지 않습니다.</p>}
        <p>주소</p>
        <input
          type="text"
          name="address"
          placeholder="주소를 입력해주세요."
          value={address}
          onChange={handleChange}
          ref={(i) => (inputRef.current[6] = i)}
        />
      </div>
      {!validBlank ? null : <p>모든 항목을 입력해주세요.</p>}
      <button type="button" onClick={handleClick}>
        회원가입
      </button>
    </div>
  );
};

export default Join;
