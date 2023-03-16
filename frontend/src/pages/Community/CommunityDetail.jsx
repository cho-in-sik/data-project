import React from 'react';
import CommunityDetail from '../../components/Community/CommunityDetail';
import { useParams } from 'react-router-dom';

// 게시글 상세보기 페이지
// useParams()를 사용하여 URL의 파라미터를 가져옴
function CommunityDetailPage() {
  const { id } = useParams();
  return <CommunityDetail match={{ params: { id } }} />;
}

export default CommunityDetailPage;
