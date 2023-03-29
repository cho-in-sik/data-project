import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

function VolunteerComment({
  recruitmentId,
  comment,
  deleteCommentHandler,
  postCommentHandler,
}) {
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

      postCommentHandler(res.data);

      setContent('');
    } catch (error) {
      console.error('댓글 작성에 실패하였습니다.', error);
      alert('댓글 작성에 실패하였습니다.');
    }
  };

  //댓글 delete
  const handleDelete = async (comment) => {
    //본인댓글만 삭제하게 거르는 작업
    if (comment.writer !== user.id) {
      alert('본인의 댓글만 삭제 가능합니다.');
      return;
    }
    try {
      deleteCommentHandler(comment._id);
      const res = await axios.delete(
        `/api/v1/recruitment/${recruitmentId}/comment/${comment._id}`,
      );
    } catch (error) {
      console.error('댓글 삭제에 실패하였습니다.', error);
      alert('댓글 삭제에 실패하였습니다.');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <NicknameDiv>
          <div>작성자: {user.nickname}</div>
        </NicknameDiv> */}
        <ContentDiv>
          <textarea
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
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0.5rem 0',
                  }}
                >
                  <CommentAuthor>
                    {item.writer?.nickname || user?.nickname}
                  </CommentAuthor>
                  <CommentLi>{item.content}</CommentLi>
                  <CommentDeleteButton onClick={() => handleDelete(item)}>
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
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const NicknameDiv = styled.div`
  font-size: 20px;
  margin-right: 10%;
`;

const ContentDiv = styled.div`
  width: 80%;
  font-size: 20px;
  textarea {
    border: none;
    border-radius: 10px;
    width: 90%;
    padding: 1rem;
    font-size: 0.8rem;
    resize: none;
  }
`;

const Button = styled.button`
  font-size: 0.8rem;
  padding: 5px 15px;
  border: none;
  border-radius: 10px;
  background-color: #64bd57;
  color: white;
`;

//--list

const CommentDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 2%;
  font-size: 0.8rem;
`;

const CommentAuthor = styled.div`
  width: 15%;
`;
const CommentLi = styled.li`
  padding: 5px 20px;
  border-radius: 10px;
  background-color: white;
  width: 80%;
`;
const CommentDeleteButton = styled.button`
  width: 7%;
  border: none;
  border-radius: 5px;
  background-color: #ff5065;
  color: white;
  padding: 3px 8px;
  margin-left: 1rem;
`;

export default VolunteerComment;
