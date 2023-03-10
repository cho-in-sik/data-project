import React, { useState } from 'react';
import styled from 'styled-components';

const CommentFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 16px;
    margin-right: 10px;
  }

  input[type='text'],
  textarea {
    flex: 1;
    padding: 5px;
    margin-right: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button[type='submit'] {
    margin-top: 10px;
    background-color: #fff;
    color: #333;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;

    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
`;
function CommentForm(props) {
  // const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  // const handleNicknameChange = (e) => {
  //   setNickname(e.target.value);
  // };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 댓글 작성 로직 구현
  };

  return (
    <CommentFormWrapper>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            required
          />
        </div> */}
        <div>
          <label>댓글:</label>
          <textarea value={content} onChange={handleContentChange} required />
        </div>
        <button type="submit">작성</button>
      </form>
    </CommentFormWrapper>
  );
}

export default CommentForm;
