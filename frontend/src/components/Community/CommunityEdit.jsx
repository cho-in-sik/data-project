import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const CommunityEditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/v1/board/${id}`);
        setTitle(response.data.board.title);
        setContent(response.data.board.content);
        setImage(response.data.board.image);
      } catch (error) {
        console.error(error);
        alert('게시물을 읽어오는데 실패하였습니다.');
        navigate('/board/all');
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('/api/v1/image/upload', formData);
      console.log(response.data);
      setImage(response.data.image);
      alert('이미지 업로드 성공!');
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 실패!');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/v1/board/${id}`, {
        title,
        content,
        image,
      });
      // console.log(response.data);
      navigate(`/board/${id}`);
    } catch (error) {
      console.error(error);
      alert('본인의 게시글만 수정할 수 있습니다.');
      navigate(`/board/${id}`);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>
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
          <div>{user.nickname}</div>
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
            onChange={handleImageUpload}
          />
        </FormGroup>
        <FormButton type="submit">수정</FormButton>
        <FormButton type="button" onClick={() => navigate(`/board/${id}`)}>
          취소
        </FormButton>
      </form>
    </FormWrapper>
  );
};

export default CommunityEditForm;
