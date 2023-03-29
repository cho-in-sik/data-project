import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function CommentForm({ boardId, updateComments }) {
  const [content, setContent] = useState(''); // 댓글 내용
  const user = useSelector((state) => state.user); // Redux의 useSelector hook을 이용해 현재 유저 정보 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/v1/board/${boardId}/comment`, {
        content,
      }); // 댓글 작성 API 호출

      setContent(''); // 댓글 내용 초기화
      updateComments(response.data.comments); // 댓글 목록 갱신
    } catch (error) {
      console.error('댓글 작성에 실패하였습니다.', error);
      alert('댓글 작성에 실패하였습니다.');
    }
  };

  return (
    <CommentFormWrapper onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">댓글 작성하기</label>
        <textarea
          id="content"
          value={content} // 댓글 내용
          onChange={(e) => setContent(e.target.value)} // 댓글 내용 변경
          required
        />
      </div>

      <button type="submit">등록</button>
    </CommentFormWrapper>
  );
}

export default CommentForm;

const CommentFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    label {
      font-size: 24px;
      margin-bottom: 10px;
      width: 15%;
      text-align: center;
      border-radius: 10px;
      padding: 5px 10px;
      border: none;
      background-color: whitesmoke;
    }

    div {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    textarea {
      height: 100px;
      font-size: 14px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: none;
    }
  }

  button {
    align-self: flex-end;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 15px;
    color: #333;
    align-self: flex-end;

    &:hover {
      background-color: #47b781;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;
