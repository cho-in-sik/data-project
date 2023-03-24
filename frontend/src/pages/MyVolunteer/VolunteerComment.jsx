import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

function VolunteerComment({ recruitmentId, comment, deleteCommentHandler }) {
  const [content, setContent] = useState(''); // 댓글 내용
  const user = useSelector((state) => state.user); // Redux의 useSelector hook을 이용해 현재 유저 정보 가져오기

  //댓글 post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/recruitment/${recruitmentId}/comment`,
        {
          content,
        },
      );
      // postCommentHandler(res.data);

      setContent('');
    } catch (error) {
      console.error('댓글 작성에 실패하였습니다.', error);
      alert('댓글 작성에 실패하였습니다.');
    }
  };

  //댓글 delete
  const handleDelete = async (commentId) => {
    try {
      deleteCommentHandler(commentId);
      const res = await axios.delete(
        `/api/v1/recruitment/${recruitmentId}/comment/${commentId}`,
      );
    } catch (error) {
      console.error('댓글 삭제에 실패하였습니다.', error);
      alert('댓글 삭제에 실패하였습니다.');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <NicknameDiv>
          <div>작성자: {user.nickname}</div>
          {/* // 현재 유저의 닉네임 표시 */}
        </NicknameDiv>
        <ContentDiv>
          <span>내용: </span>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)} // 댓글 내용 변경
            required
          />
        </ContentDiv>
        <Button type="submit">댓글 작성</Button>
      </Form>
      <CommentDiv>
        <ul>
          {comment === ''
            ? null
            : comment.map((item) => (
                <div
                  key={item._id}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div>{item.writer.nickname}</div>
                  <CommentLi>{item.content}</CommentLi>
                  <CommentDeleteButton onClick={() => handleDelete(item._id)}>
                    삭제
                  </CommentDeleteButton>
                </div>
              ))}
          {/* {comment.map((item) => (
            <div
              key={item._id}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div>{item.writer.nickname}</div>
              <CommentLi>{item.content}</CommentLi>
              <CommentDeleteButton onClick={() => handleDelete(item._id)}>
                삭제
              </CommentDeleteButton>
            </div>
          ))} */}
        </ul>
      </CommentDiv>
    </>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
`;
const NicknameDiv = styled.div`
  font-size: 20px;
  margin-right: 10%;
`;

const ContentDiv = styled.div`
  width: 50%;
  font-size: 20px;
  input {
    border: none;
    border-radius: 20px;
    width: 80%;
    font-size: 20px;
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 5px 15px;
  border: none;
  background-color: #64bd57;

  color: white;
`;

//--list

const CommentDiv = styled.div`
  margin-top: 2%;
`;
const CommentLi = styled.li`
  padding: 5px 20px;
  border-radius: 10px;
  background-color: white;
  width: 30%;
  text-align: center;
  margin-bottom: 1%;
`;
const CommentDeleteButton = styled.button`
  margin-left: 1%;
  margin-bottom: 1%;
  border: none;
  background-color: #ff5065;
  color: white;
  padding: 3px 8px;
`;

export default VolunteerComment;
