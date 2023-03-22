import React from 'react';
import CommunityEditForm from '../../components/Community/CommunityEdit';
import Header from '../../components/Header/Header';

// 게시글 수정 페이지
function CommunityEdit() {
  return (
    <>
      <Header />
      <CommunityEditForm />;
    </>
  );
}

export default CommunityEdit;
