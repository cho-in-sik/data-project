import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  FormWrapper,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormButton,
} from './styles/CommunityFormStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const CommunityPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const user = useSelector((state) => state.user); // Redux의 useSelector hook을 이용해 현재 유저 정보 가져오기

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/board', {
        title,
        content,
        image,
      });
      console.log(response.data);
      navigate('/board/:id');
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패하였습니다.'); // 실패 알림창 띄우기
    }
  };

  return (
    <FormWrapper>
      <FormTitle>
        <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} /> 게시글
        작성하기
      </FormTitle>
      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormInput
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="author">작성자</FormLabel>
          <div>{user.nickname}</div>
          {/* 현재 유저의 닉네임 표시 */}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="content">내용</FormLabel>
          <FormTextarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="image">이미지</FormLabel>
          <FormInput
            type="file"
            accept=".png, .jpeg, .jpg"
            style={{ border: 'none' }}
            onChange={(event) => setImage(event.target.value)}
          />
        </FormGroup>
        <FormButton type="submit">작성 완료</FormButton>
        <FormButton type="button" onClick={() => navigate('/board')}>
          취소
        </FormButton>
      </form>
    </FormWrapper>
  );
};

export default CommunityPostForm;
