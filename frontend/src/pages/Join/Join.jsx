import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';

const Join = () => {
  // useRef 설정
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
  const navigate = useNavigate();

  // 유효성 검사
  // 이메일 : 이메일 형식 준수
  const emailPattern =
    /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$/i;
  const validEmail = email === '' || emailPattern.test(email);

  // 이름 : 2자 이상 10자 이하
  const namePattern = /^[가-힣a-zA-Z]{2,10}$/i;
  const validName = name === '' || namePattern.test(name);

  // 닉네임 : 2자 이상 10자 이하
  const nicknamePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$/i;
  const validNickname = nickname === '' || nicknamePattern.test(nickname);

  // 휴대폰 번호는 2 or 3자리 숫자 - 3 or 4자리 숫자 - 4자리 숫자로 구성
  const phoneNumberPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/i;
  const validPhoneNumber = phone === '' || phoneNumberPattern.test(phone);

  // 비밀번호 : 영문숫자특수문자혼합 8자리 이상
  const passwordPattern =
    /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$/i;
  const validPw = pw === '' || passwordPattern.test(pw);

  // 비밀번호 확인 : 비밀번호와 일치
  const validPwConfirm = pwConfirm === '' || pwConfirm === pw;

  // 공백 검사
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

  // 회원가입 버튼 클릭시
  const handleClick = () => {
    // 이메일 검사(유효하지 않을 경우)
    if (!validEmail) {
      alert('올바른 이메일을 입력하세요.');
      // inputs에 들어있던 email을 공백으로 초기화하고
      setInputs({
        ...inputs,
        email: '',
      });
      // 해당 input 태그를 포커스
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
    } else if (!validPhoneNumber) {
      alert('올바른 전화번호가 아닙니다.');
      setInputs({
        ...inputs,
        phone: '',
      });
      inputRef.current[3].focus();
    } else if (!validPw) {
      alert('비밀번호는 4자 이상, 20자 미만입니다.');
      setInputs({
        ...inputs,
        pw: '',
      });
      inputRef.current[4].focus();
    } else if (!validPwConfirm) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      setInputs({
        ...inputs,
        pwConfirm: '',
      });
      inputRef.current[5].focus();
    } else if (validBlank) {
      alert('모든 항목을 입력해주세요.');
      return false;
      // 모든 검사를 통과하면
    } else {
      alert('회원가입되었습니다. 로그인 페이지로 이동합니다.');
      submitData();
      navigate('/login');
    }
  };

  // api에 전달
  const submitData = async () => {
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
      const res = await axios.post(
        'http://localhost:3000/api/v1/users/join',
        data,
      );
      if (res.statusText === 'Created') {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert('잘못된 값이 입력되어 요청에 실패했습니다.');
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BackGround>
      <Header />
      <JoinBox>
        <JoinTitle>회원가입</JoinTitle>
        <JoinWrapper>
          <JoinItem>
            <p>이메일</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              ref={(i) => (inputRef.current[0] = i)}
            />
            {validEmail ? null : <span> * 올바른 이메일을 입력하세요.</span>}
          </JoinItem>
          <JoinItem>
            <p>이름</p>
            <input
              type="text"
              name="name"
              placeholder="이름은 2자 이상 10자 이하로 입력해주세요."
              value={name}
              onChange={handleChange}
              ref={(i) => (inputRef.current[1] = i)}
            />
            {validName ? null : <span> * 올바른 이름을 입력하세요.</span>}
          </JoinItem>
          <JoinItem>
            <p>닉네임</p>
            <input
              type="text"
              name="nickname"
              placeholder="한/영/숫자로 2자 이상 10자 이하로 입력해주세요."
              value={nickname}
              onChange={handleChange}
              ref={(i) => (inputRef.current[2] = i)}
            />
            {validNickname ? null : <span> * 올바른 닉네임을 입력하세요.</span>}
          </JoinItem>
          <JoinItem>
            <p>전화번호</p>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              ref={(i) => (inputRef.current[3] = i)}
            />
            {validPhoneNumber ? null : (
              <span> * 하이픈(-)을 포함한 전화번호를 입력하세요.</span>
            )}
          </JoinItem>
          <JoinItem>
            <p>비밀번호</p>
            <input
              type="password"
              name="pw"
              placeholder="영문, 숫자, 특수기호를 포함하여 작성해주세요."
              value={pw}
              onChange={handleChange}
              ref={(i) => (inputRef.current[4] = i)}
            />
            {validPw ? null : <span> * 올바른 비밀번호를 입력하세요.</span>}
          </JoinItem>
          <JoinItem>
            <p>비밀번호 확인</p>
            <input
              type="password"
              name="pwConfirm"
              value={pwConfirm}
              onChange={handleChange}
              ref={(i) => (inputRef.current[5] = i)}
            />
            {validPwConfirm ? null : (
              <span> * 비밀번호 확인이 일치하지 않습니다.</span>
            )}
          </JoinItem>
          <JoinItem>
            <p>주소</p>
            <input
              type="text"
              name="address"
              placeholder="주소를 입력해주세요."
              value={address}
              onChange={handleChange}
              ref={(i) => (inputRef.current[6] = i)}
            />
          </JoinItem>
          {!validBlank ? null : <span> * 모든 항목을 입력해주세요.</span>}
        </JoinWrapper>
        <button type="button" onClick={handleClick}>
          회원가입
        </button>
      </JoinBox>
    </BackGround>
  );
};

export default Join;

const JoinBox = styled.div`
  position: relative;
  width: 30%;
  min-width: 520px;
  background: #eee;
  border-radius: 20px;
  text-align: center;
  padding: 2rem 0rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 1rem;

  button {
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #47b781;
    width: 20rem;
    height: 2.5rem;
    border-radius: 20px;
    margin-top: 0.5rem;
    cursor: pointer;
  }
`;

const JoinTitle = styled.div`
  width: 50%;
  font-size: 2rem;
  margin: 1rem auto;
`;

const JoinWrapper = styled.div`
  width: 70%;
  margin: 0 auto;

  span {
    display: block;
    color: #ff0000;
    font-size: 0.8rem;
  }
`;

const JoinItem = styled.div`
  width: 90%;
  margin: 1rem;
  p {
    font-size: 0.8rem;
    text-align: left;
    width: 30%;
    margin-bottom: 0.5rem;
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
  span {
    display: block;
    text-align: left;
    color: #ff0000;
    font-size: 0.7rem;
  }
`;
