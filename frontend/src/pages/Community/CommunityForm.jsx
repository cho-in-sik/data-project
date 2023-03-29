import React from 'react';
import CommunityPostForm from '../../components/Community/CommunityForm';
import Header from '../../components/Header/Header';

// 게시글 작성 페이지
function CommunityForm() {
  return (
    <div style={{ backgroundColor: '#47b781' }}>
      <Header />
      <CommunityPostForm />;
    </div>
  );
}

export default CommunityForm;
