import { useState } from 'react';
import BackGround from '../../components/Background/Background';
import Header from '../../components/Header/Header';
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
  const handleMouseOver = (e) => {
    return;
  };
  return (
    <BackGround>
      <Header />
      <FormWrapper style={{ position: 'relative' }}>
        <FormTitle>봉사 모집글 작성</FormTitle>
        <form onSubmit={handleFormSubmit}>
          <FormGroup>
            <FormLabel htmlFor="borough">지역</FormLabel>
            {/* <FormInput
              type="text"
              value={borough}
              onChange={(event) => setBorough(event.target.value)}
              required
            /> */}
            <select
              value={guName}
              onChange={(event) => {
                console.log(event.target.value);
                // setBorough(event.target.value);
              }}
            />
          </FormGroup>
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
              required
            />
            <span onMouseOver={handleMouseOver}>시간별 조회</span>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="recruitments">총 모집인원</FormLabel>
            <FormInput
              type="text"
              value={recruitments}
              onChange={(event) => setRecruitments(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="content">간단 소개</FormLabel>
            <FormTextarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
          </FormGroup>
          {/* <FormGroup>
            <FormLabel htmlFor="author">작성자</FormLabel>
            <FormInput
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </FormGroup> */}
          <FormGroup>
            <FormLabel htmlFor="image">이미지</FormLabel>
            {/* 이미지 삽입 기능은 추후에 */}
            <FormInput
              type="file"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="address">위치 안내</FormLabel>
            <FormInput
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
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
  width: 80%;
  height: 85%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 40px;
`;

const FormTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: inline-block;
  font-size: 1rem;
  width: 10%;
`;

const FormInput = styled.input`
  width: 30%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  width: 30%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormButton = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
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
