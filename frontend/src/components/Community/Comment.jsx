import React from 'react';

function Comment(props) {
  // Comment 함수형 컴포넌트를 선언합니다. props를 인자로 받습니다.
  const { comment, onEdit, onDelete } = props;

  // comment 객체의 _id 값을 인자로 전달
  const handleEdit = () => {
    onEdit(comment._id);
  };

  const handleDelete = () => {
    //comment 객체의 _id 값을 인자로 전달
    onDelete(comment._id);
  };

  return (
    <div>
      <p>{comment.nickname}</p>
      <p>{comment.content}</p>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default Comment;
