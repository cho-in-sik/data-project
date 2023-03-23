import { useState } from 'react';
import BackGround from '../../components/Background/Background';
import Header from '../../components/Header/Header';
import TimeOfAccident from '../chart/TimeOfAccident';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//게시글 작성 폼
const RecruitByGuForm = () => {
  // const [borough, setBorough] = useState('');
  const [title, setTitle] = useState('');
  const [volunteerTime, setVolunteerTime] = useState('');
  const [recruitments, setRecruitments] = useState('');
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [modal, setModal] = useState(false);

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
      // author,
      // image,
      address,
      category,
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
  const handleMouseOver = () => {
    setModal(true);
  };
  const handleMouseLeave = () => {
    setModal(false);
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
              <span
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                시간별 조회
              </span>
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
                value={image}
                onChange={(event) => setImage(event.target.value)}
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
              <FormInput
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </FormGroup>
          </FormGroupBox>
          <FormButton type="submit">작성</FormButton>
          <FormButton type="button" onClick={() => navigate(-1)}>
            취소
          </FormButton>
        </form>
      </FormWrapper>
    </BackGround>
  );
};

export default RecruitByGuForm;

const FormWrapper = styled.div`
  margin: 0 auto;
  max-width: 1350px;
  width: 60%;
  height: auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 40px;
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
  margin: 2.5rem auto;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  width: 15%;
  float: left;
  line-height: 1.8rem;
`;

const FormInput = styled.input`
  width: 70%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const FormTextarea = styled.textarea`
  width: 70%;
  font-size: 1rem;
  border: 1px solid #ccc;
  resize: none;
  border-radius: 5px;
  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const FormButton = styled.button`
  margin: 1rem auto;
  width: 50%;
  padding: 1rem 1.5rem;
  display: block;
  background-color: #47b781;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const FormError = styled.p`
  color: red;
  margin-top: 5px;
`;
