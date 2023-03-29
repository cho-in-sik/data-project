import { useState } from 'react';
import BackGround from '../../components/Background/Background';
import Header from '../../components/Header/Header';
import TimeOfAccident from '../chart/TimeOfAccident';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//게시글 작성 폼
const RecruitByGuForm = () => {
  const [title, setTitle] = useState('');
  const [volunteerTime, setVolunteerTime] = useState('');
  const [recruitments, setRecruitments] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(false);

  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const guName = location.state;

  // 게시글 작성을 위한 함수
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const body = {
      borough: id,
      title,
      volunteerTime,
      recruitments,
      content,
      address,
      category,
      image,
    };
    try {
      const res = await axios.post('/api/v1/recruitment', body);
      console.log(res.data);
      navigate(`/recruitment/${id}`);
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    }
  };
  /*  const handleMouseOver = () => {
    setModal(true);
  };
  const handleMouseLeave = () => {
    setModal(false);
  }; */

  const handleClick = () => {
    if (flag === false) {
      setFlag(true);
      setModal(true);
      console.log(flag);
    } else {
      setModal(false);
      setFlag(false);
    }
  };
  // 이미지 핸들러
  const profileImgHandler = async (e) => {
    debugger;
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('image', img);

    axios
      .post('/api/v1/image/upload', formData)
      .then((res) => {
        setImage(res.data.image);
        alert('성공');
      })
      .catch((err) => {
        alert('실패');
      });
    return formData;
  };

  const handleCategory = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  return (
    <BackGround>
      <Header />
      <FormWrapper style={{ position: 'relative' }}>
        <FormTitle>봉사 모집글 작성</FormTitle>
        <form onSubmit={handleFormSubmit}>
          <FormGroupBox>
            <FormGroup>
              <FormLabel htmlFor="title">제목</FormLabel>
              <FormInput
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="volunteerTime">시간</FormLabel>
              <FormInput
                type="text"
                value={volunteerTime}
                onChange={(event) => setVolunteerTime(event.target.value)}
                placeholder="예) 23년 3월 22일 16시 - 18시"
                required
              />
              <p onClick={handleClick}>가이드</p>
              {modal && <TimeOfAccident />}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="recruitments">총 모집인원</FormLabel>
              <FormInput
                type="number"
                value={recruitments}
                onChange={(event) => setRecruitments(event.target.value)}
                placeholder="인원의 숫자를 입력해주세요."
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="content">간단 소개</FormLabel>
              <FormTextarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="모임에 대한 간단한 소개를 적어주세요."
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="image">이미지</FormLabel>
              <FormInput
                type="file"
                accept=".png, .jpeg, .jpg"
                style={{ border: 'none', fontSize: '0.8rem' }}
                onChange={profileImgHandler}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="address">집결 장소</FormLabel>
              <FormInput
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="예) 화양사거리 횡단보도"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="category">장/단기 구분</FormLabel>
              <FormDiv>
                <input
                  type="radio"
                  name="category"
                  value="단기"
                  onChange={(event) => handleCategory(event)}
                />
                단기
                <input
                  type="radio"
                  name="category"
                  value="장기"
                  onChange={(event) => handleCategory(event)}
                />
                장기
              </FormDiv>
            </FormGroup>
          </FormGroupBox>
          <div
            style={{
              margin: '2rem 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormButton type="submit">작성하기</FormButton>
            <FormButton
              type="button"
              onClick={() => navigate(-1)}
              style={{ backgroundColor: '#888' }}
            >
              작성 취소
            </FormButton>
          </div>
        </form>
      </FormWrapper>
    </BackGround>
  );
};

export default RecruitByGuForm;

const FormWrapper = styled.div`
  margin: 40px auto;
  max-width: 1350px;
  width: 50%;
  height: auto;
  padding: 0 20px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const FormTitle = styled.h1`
  width: 75%;
  margin: 2rem auto;
  text-align: center;
  font-size: 2rem;
`;

const FormGroupBox = styled.div`
  margin-bottom: 3rem;
`;

const FormGroup = styled.div`
  width: 75%;
  margin: 2rem auto;
  padding-left: 5rem;
  p {
    cursor: pointer;
    display: inline-block;
    color: #fff;
    background-color: #ff5065;
    border-radius: 5px;
    padding: 3px 6px;
  }
`;

const FormLabel = styled.label`
  font-size: 1rem;
  width: 15%;
  min-width: 85px;
  float: left;
  line-height: 1.8rem;
`;

const FormInput = styled.input`
  width: 65%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
  padding: 0 1rem;
  line-height: 2.2rem;
  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const FormTextarea = styled.textarea`
  width: 65%;
  font-size: 1rem;
  border: 1px solid #ccc;
  resize: none;
  border-radius: 5px;
  padding: 0 1rem;
  line-height: 2.2rem;

  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const FormButton = styled.button`
  margin: 1rem;
  width: 20%;
  padding: 1rem 1.5rem;
  display: inline-block;
  background-color: #47b781;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2f9564;
  }
`;

const FormDiv = styled.div`
  width: 65%;
  font-size: 1rem;
  margin-right: 1rem;
  padding: 0 1rem;
  line-height: 2.2rem;
`;
