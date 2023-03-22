import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ boardId, updateComments }) {
  // 작성자와 뎃글 내용을 관리하는 상태값
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  // 댓글 작성 폼을 제출했을 때 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //서버로 댓글 내용 전송
      const response = await axios.post(
        `http://localhost:3000/api/v1/board/${boardId}/comment`,
        {
          writer,
          content,
        },
      );
      // 댓글 작성에 성공한 경우, 작성자와 댓글 내용을 초기화
      setWriter('');
      setContent('');
      // 댓글 목록을 업데이트
      updateComments(response.data.comments);
    } catch (error) {
      // 댓글 작성에 실패한 경우, 오류 메시지를 출력하고 사용자에게 알립니다.
      console.error('댓글 작성에 실패했습니다:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="writer">작성자</label>
        <input
          type="text"
          id="writer"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;
