import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { useSelector } from 'react-redux';

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

const UserInfo = (props) => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async function userData() {
      try {
        const res = await axios.get(`/api/v1/users/${user.id}`);
        console.log(res.data.data);
        setUserInfo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    userData();
  }, [user.id]);

  const [formValid, setFormValid] = useState([]);
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

    const isEmailValid = emailValidate(email);
    if (!isEmailValid) {
      setFormValid('이메일 형식이 올바르지 않습니다.');
    }
    const isNameValid = nameValidate(name);

    if (!isNameValid) {
      setFormValid('이름 형식이 올바르지 않습니다.');
    }
    const isNicknameValid = nicknameValidate(nickname);
    if (!isNicknameValid) {
      setFormValid('닉네임 형식이 올바르지 않습니다.');
    }
    const isPWValid = passwordValidate(pw);
    if (!isPWValid) {
      setFormValid('비밀번호 형식이 올바르지 않습니다.');
    }

    const submitHandler = async () => {
      try {
        await axios.put(`/api/v1/users/${user.id}`, {
          ...formData,
        });
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
    <BackGround>
      <Header />
      <UserInfoBox>
        {/* <UserImg
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMjBfMTQw%2FMDAxNjcxNDY4MTY4Njgw._6Iq_FzSz5PQMdBty_qIUevQTeUrZidr8ghFutUlxs0g.cerzr-evHCcr1pkNlF2Ug9o2iAv-D86LpkyIDRssZkgg.JPEG.ovrcomnow%2F6.jpg&type=a340"
          style={{ width: '100px' }}
        /> */}
        <UserForm>
          <InfoItem style={{ marginTop: '50px' }}>
            <p>이름</p>
            <input
              name="name"
              type="text"
              ref={nameRef}
              value={userInfo.name}
            />
          </InfoItem>
          <InfoItem>
            <p>닉네임</p>
            <input
              name="nickname"
              type="text"
              ref={nicknameRef}
              value={userInfo.nickname}
            />
          </InfoItem>
          <InfoItem>
            <p>전화번호</p>
            <input
              name="phonenumber"
              type="text"
              ref={phoneNumRef}
              value={userInfo.phoneNumber}
            />
          </InfoItem>
          <InfoItem>
            <p>이메일</p>
            <input
              name="email"
              type="email"
              ref={emailRef}
              value={userInfo.email}
            />
          </InfoItem>
          <InfoItem>
            <p>비밀번호</p>
            <input name="password" type="password" ref={pwRef} />
          </InfoItem>
          <InfoItem>
            <p>비밀번호 확인</p>
            <input name="password1" type="password" ref={pw1Ref} />
          </InfoItem>
          <InfoItem>
            <p>주소</p>
            <input
              name="address"
              type="text"
              ref={addressRef}
              value={userInfo.address}
            />
          </InfoItem>

          <span style={{ marginLeft: '30px' }}>{formValid}</span>
          <ModifyButton onClick={handleSubmit}>수정하기</ModifyButton>
        </UserForm>
      </UserInfoBox>
    </BackGround>
  );
};

const UserInfoBox = styled.div`
  margin-top: 50px;
  position: relative;
  width: 50%;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const UserImg = styled.img``;

const UserForm = styled.form`
  width: 90%;
  margin: 0 auto;

  span {
    display: block;
    color: #ff0000;
    font-size: 1rem;
  }
`;

const ModifyButton = styled.button`
  font-weight: 500;
  border: none;
  color: whitesmoke;
  background-color: #ff5065;
  position: absolute;
  right: 30px;
  bottom: 20px;
  border-radius: 10%;
  font-size: 16px;
  padding: 6px 14px;
  cursor: pointer;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const InfoItem = styled.div`
  width: 90%;
  margin-bottom: 20px;
  margin-left: 30px;
  p {
    font-size: 16px;
    text-align: left;
    width: 30%;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    background-color: white;
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

export default UserInfo;
