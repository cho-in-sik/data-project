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
  const [image, setImage] = useState('');

  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Redux의 useSelector hook을 이용해 현재 유저 정보 가져오기

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/v1/board/${id}`);
        setTitle(response.data.board.title); // 게시글 제목
        setContent(response.data.board.content); // 게시글 내용
        setImage(response.data.board.image); // 게시글 이미지
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        alert('게시물을 읽어오는데 실패하였습니다.');
        navigate('/board/all');
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/v1/board/${id}`, {
        title,
        content,
        image,
      });
      navigate(`/board/${id}`); // 게시글 상세 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('게시글 수정이 실패하였습니다.');
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
            value={title} // 제목
            onChange={(event) => setTitle(event.target.value)} // 제목 입력
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
            onChange={(event) => setImage(event.target.value)}
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
