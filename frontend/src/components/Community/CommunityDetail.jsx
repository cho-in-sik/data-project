import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import {
  CommunityDetailWrapper,
  CommunityDetailHeader,
  CommunityDetailTitle,
  CommunityDetailAuthor,
  CommunityDetailImage,
  CommunityDetailContent,
  CommunityDetailCommentTitle,
  CommunityDetailDivider,
  CommunityDetailComments,
} from './styles/CommunityDetailStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

function CommunityDetail({ match }) {
  const postId = match.params.id;
  const [community, setCommunity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/data/community.json');
        const communities = response.data.communities;
        const community = communities.find((c) => c._id === postId);
        setCommunity(community);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postId]);

  return (
    <CommunityDetailWrapper>
      <CommunityDetailHeader>
        <CommunityDetailTitle>
          {' '}
          <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} />{' '}
          {community.title}
        </CommunityDetailTitle>
        <CommunityDetailAuthor>
          작성자: {community.author}
        </CommunityDetailAuthor>
      </CommunityDetailHeader>
      {community.image && (
        <CommunityDetailImage src={community.image} alt="게시글 이미지" />
      )}
      <CommunityDetailContent>{community.content}</CommunityDetailContent>
      <CommunityDetailDivider />
      <CommunityDetailCommentTitle>댓글</CommunityDetailCommentTitle>
      <CommunityDetailComments>
        {community.comments &&
          community.comments.map((comment) => (
            <div key={comment._id}>
              <h4>{comment.nickname}</h4>
              <p>{comment.content}</p>
            </div>
          ))}
        <CommentForm />
      </CommunityDetailComments>
    </CommunityDetailWrapper>
  );
}

export default CommunityDetail;
