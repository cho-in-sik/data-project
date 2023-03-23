import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">작성자</label>
        <div>{user.nickname}</div>
        {/* // 현재 유저의 닉네임 표시 */}
      </div>

      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content} // 댓글 내용
          onChange={(e) => setContent(e.target.value)} // 댓글 내용 변경
          required
        />
      </div>

      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;
