import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';

const UserInfo = (props) => {
  //상태관리
  const nameRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const pw1Ref = useRef();
  const addressRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const nickname = nicknameRef.current.value;
    const pw = pwRef.current.value;
    const pw1 = pw1Ref.current.value;

    //요처어 데이터 formdata에 모으기
    const formData = {
      name,
      nickname,
      email,
      pw,
      pw1,
    };
    //유효성 검사
    //오류메시지를 상태로 관리하기?
    //이메일 형식
    const emailValidate = (email) => {
      const regExp =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return regExp.test(email);
    };
    // 이름 : 2자 이상 10자 이하
    const nameValidate = (name) => {
      const regExp = /^[가-힣a-zA-Z]{2,10}$/i;
      return regExp.test(name);
    };
    // 닉네임 : 2자 이상 10자 이하
    const nicknameValidate = (nickname) => {
      const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$/i;
      return regExp.test(nickname);
    };
    //비밀번호 영문숫자특수문자혼합 8자리 이상
    const passwordValidate = (pw) => {
      const regExp = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$/i;
      return regExp.test(pw);
    };

    const isEmailValid = emailValidate(email);
    if (!isEmailValid) {
      alert('이메일 형식이 맞지 않습니다.');
    }
    const isNameValid = nameValidate(name);
    if (!isNameValid) {
      alert('이름 형식이 맞지 않습니다.');
    }
    const isNicknameValid = nicknameValidate(nickname);
    if (!isNicknameValid) {
      alert('닉네임 형식이 맞지 않습니다.');
    }
    const isPWValid = passwordValidate(pw);
    if (!isPWValid) {
      alert('비밀번호 형식이 맞지 않습니다.');
    }
    if (pwRef !== pw1Ref) {
      alert('비밀번호가 맞지 않습니다.');
    }

    const submitHandler = async () => {
      try {
        await axios.patch(`http://localhost:3000/userinfo`, { ...formData });
        alert('정보수정에 성공했습니다.');
        navigate('/');
      } catch (error) {
        alert('정보수정에 실패했습니다.');
        console.error(error);
      }
    };
    submitHandler();
  };

  return (
    <>
      <Header />
      <BackGround>
        <UserInfoBox>
          <UserImg
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMjBfMTQw%2FMDAxNjcxNDY4MTY4Njgw._6Iq_FzSz5PQMdBty_qIUevQTeUrZidr8ghFutUlxs0g.cerzr-evHCcr1pkNlF2Ug9o2iAv-D86LpkyIDRssZkgg.JPEG.ovrcomnow%2F6.jpg&type=a340"
            style={{ width: '100px' }}
          />
          <UserForm>
            <label htmlFor="name">이름</label>
            <input name="name" type="text" ref={nameRef} />

            <label htmlFor="nickname">닉네임</label>
            <input name="nickname" type="text" ref={nicknameRef} />

            <label htmlFor="phonenumber">전화번호</label>
            <input name="phonenumber" type="text" ref={phoneNumRef} />

            <label htmlFor="email">이메일</label>
            <input name="email" type="email" ref={emailRef} />

            <label htmlFor="password">비밀번호</label>
            <input name="password" type="password" ref={pwRef} />

            <label htmlFor="password1">비밀번호 확인</label>
            <input name="password1" type="password" ref={pw1Ref} />

            <label htmlFor="address">주소</label>
            <input name="address" type="text" ref={addressRef} />

            <ModifyButton onSubmit={handleSubmit}>수정하기</ModifyButton>
          </UserForm>
        </UserInfoBox>
      </BackGround>
    </>
  );
};

const UserInfoBox = styled.div`
  position: relative;
  width: 50%;
  height: 90%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const UserImg = styled.img``;

const UserForm = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const ModifyButton = styled.button`
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

export default UserInfo;
