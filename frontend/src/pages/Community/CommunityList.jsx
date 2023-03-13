import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  WriteButton,
  DetailLink,
  CommunityListTable,
  CommunityListTableHeader,
  CommunityListTableHeaderTitle,
  CommunityListTableHeaderAuthor,
  CommunityListTableBody,
  CommunityListTableRow,
  CommunityListTableTitle,
  CommunityListTableAuthor,
} from './styles/CommunityListStyle';
//아이콘 임시 추가
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

// 게시판 목록
function CommunityList() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get('/data/community.json')
      .then((response) => {
        setCommunities(response.data.communities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} /> 봉사자
        커뮤니티
      </Title>
      <CommunityListTable>
        <CommunityListTableHeader>
          <CommunityListTableHeaderTitle>제목</CommunityListTableHeaderTitle>
          <CommunityListTableHeaderAuthor>
            작성자
          </CommunityListTableHeaderAuthor>
        </CommunityListTableHeader>
        <CommunityListTableBody>
          {communities.map((community) => (
            <CommunityListTableRow key={community._id}>
              <CommunityListTableTitle>
                <DetailLink to={`/community/${community._id}`}>
                  {community.title}
                </DetailLink>
              </CommunityListTableTitle>
              <CommunityListTableAuthor>
                {community.author}
              </CommunityListTableAuthor>
            </CommunityListTableRow>
          ))}
        </CommunityListTableBody>
        <WriteButton to="/community">게시글 작성하기</WriteButton>
      </CommunityListTable>
    </Container>
  );
}

export default CommunityList;
