import React from 'react';
import CommunityPostForm from '../../components/Community/CommunityForm';
import Header from '../../components/Header/Header';

// 게시글 작성 페이지
function CommunityForm() {
  return (
    <>
      <Header />
      <CommunityPostForm />;
    </>
  );
}

export default CommunityForm;
