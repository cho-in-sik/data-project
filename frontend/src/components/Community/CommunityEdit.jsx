import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const CommunityEditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/board/${id}`,
        );
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setContent(response.data.content);
        setImage(response.data.image);
      } catch (error) {
        console.error(error);
        // 오류 메시지 표시
        alert('게시글 불러오기에 실패했습니다.');
        navigate('/board/all');
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/board/${id}`,
        {
          title,
          author,
          content,
          image,
        },
      );
      console.log(response.data);
      navigate(`/board/${id}`);
    } catch (error) {
      console.error(error);
      // 오류 메시지 표시
      alert('게시글 수정에 실패했습니다.');
    }
  };
  return (
    <FormWrapper>
      <FormTitle>
        {' '}
        <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} /> 게시글
        수정하기
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
          <FormInput
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </FormGroup>
        <FormButton type="submit">수정</FormButton>
      </form>
    </FormWrapper>
  );
};

export default CommunityEditForm;
