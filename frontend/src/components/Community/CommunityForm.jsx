import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
//게시글 작성 폼
const CommunityPostForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();
  // 게시글 작성을 위한 함수
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // 게시글 작성 API 호출
      const response = await axios.post('http://localhost:3000/api/v1/board', {
        title,
        author,
        content,
        image,
      }); // 게시글 작성 후 게시글 목록 페이지로 이동
      console.log(response.data);
      navigate('/board/all');
    } catch (error) {
      console.error(error);
      // 오류 메시지 표시
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <FormWrapper>
      <FormTitle>
        {' '}
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
          <FormInput
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
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
          {/* 이미지 삽입 기능은 추후에 */}
          <FormInput
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </FormGroup>
        <FormButton type="submit">작성</FormButton>
        <FormButton type="button" onClick={() => navigate('/board/all')}>
          취소
        </FormButton>
      </form>
    </FormWrapper>
  );
};

export default CommunityPostForm;
