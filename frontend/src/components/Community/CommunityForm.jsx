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
  const [title, setTitle] = useState(''); // 게시글 제목
  const [content, setContent] = useState(''); // 게시글 내용
  const [image, setImage] = useState(null);
  // 게시글 이미지 null값으로 해놓는 이유는 이미지를 업로드 하지 않아도 게시글을 작성할 수 있기 때문
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  // Redux의 useSelector hook을 이용해 현재 유저 정보 가져오기

  //이미지 업로드
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('/api/v1/image/upload', formData);
      // console.log(response.data);
      setImage(response.data.image); // 이미지 업로드 성공 시 이미지 URL을 image 상태에 저장
      alert('이미지 업로드 성공!');
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 실패!');
    }
  };

  // 게시글 작성
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/board', {
        title,
        content,
        image,
      });
      navigate(`/board`);
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패하였습니다.');
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
          <div>{user?.nickname}</div>
          {/* 현재 유저의 닉네임 표시 */}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="content">내용</FormLabel>
          <FormTextarea
            id="content"
            value={content}
            // 댓글 내용
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
            onChange={handleImageUpload} // 이미지 업로드
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
