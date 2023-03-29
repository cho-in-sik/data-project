import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';

//유효성 검사
//오류메시지를 상태로 관리하기?

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
  const dispatch = useDispatch();

  //디비에 보내는 이미지( 이미지 서버에서 온걸 img1에 저장
  const [img1, setImg1] = useState('');

  //state로 상태관리
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [pw, setPw] = useState();
  const [pw1, setPw1] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  //이미지 통신 함수
  const profileImgHandler = async (e) => {
    //이미지 파일 이미지 서버에 보내기
    const img = e.target.files[0];
    const formData1 = new FormData();
    formData1.append('image', img);

    axios
      .post('api/v1/image/upload', formData1)
      .then((res) => {
        setImg1(res.data.image);
      })
      .catch((err) => {
        alert('실패');
      });
    return formData1;
  };

  const [formValid, setFormValid] = useState([]);
  //상태관리

  const navigate = useNavigate();
  useEffect(() => {
    async function userData() {
      try {
        const res = await axios.get(`/api/v1/my/${user.id}`);
        setName(res.data.data.name);
        setNickname(res.data.data.nickname);
        setAddress(res.data.data.address);
        setPhoneNumber(res.data.data.phoneNumber);
      } catch (error) {
        console.log(error);
      }
    }
    userData();
  }, [user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //요청 데이터 formdata에 모으기
    const formData = {
      name,
      pw,
      pw1,
      address,
      profileImage: img1,
    };

    //닉네임이 상태에 저장돼있는 닉네임과 다르면 폼데이터에 추가
    if (nickname !== user.nickname) {
      formData.nickname = nickname;
    }

    const isNameValid = nameValidate(name);

    if (pw !== pw1) {
      setFormValid('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isNameValid) {
      setFormValid('이름 형식이 올바르지 않습니다.');
      return;
    }
    const isNicknameValid = nicknameValidate(nickname);
    if (!isNicknameValid) {
      setFormValid('닉네임 형식이 올바르지 않습니다.');
      return;
    }
    const isPWValid = passwordValidate(pw);
    if (!isPWValid) {
      setFormValid('비밀번호는 영문숫자특수문자혼합 8자리 이상');
      return;
    }

    const submitHandler = async () => {
      try {
        const res = await axios.put(`/api/v1/my/${user.id}`, {
          ...formData,
        });
        console.log(res.data.data);

        const userInfoChange = {
          email: res.data.data.email,
          id: res.data.data._id,
          nickname: res.data.data.nickname,
          userType: res.data.data.userType,
          profileImage: res.data.data.profileImage,
        };
        // profileImage: res.data.data.profileImage,
        dispatch(loginUser(userInfoChange));
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
        <UserForm>
          <InfoItem style={{ marginTop: '50px' }}>
            <p>이름</p>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <p>닉네임</p>
            <input
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <p>전화번호</p>
            <input
              name="phonenumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InfoItem>

          <InfoItem>
            <p>비밀번호</p>
            <input
              name="password"
              type="password"
              onChange={(e) => setPw(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <p>비밀번호 확인</p>
            <input
              name="password1"
              type="password"
              onChange={(e) => setPw1(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <p>주소</p>
            <input
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <p>이미지</p>
            <input
              name="image"
              type="file"
              accept=".png, .jpeg, .jpg"
              style={{ border: 'none' }}
              onChange={profileImgHandler}
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
  margin: 50px 0;
  position: relative;
  width: 50%;
  height: 90%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

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
