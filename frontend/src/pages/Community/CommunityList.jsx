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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';

function CommunityList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/board/all',
        );
        // 가져온 데이터를 setBoards 함수를 사용하여 boards 상태에 저장
        setBoards(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
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
            {/* 게시물이 존재할 경우 */}
            {boards && boards.length > 0 ? (
              boards.map((board) => (
                <CommunityListTableRow key={board._id}>
                  <CommunityListTableTitle>
                    <DetailLink to={`/board/${board._id}`}>
                      {board.title}
                    </DetailLink>
                  </CommunityListTableTitle>
                  <CommunityListTableAuthor>
                    {board.author}
                  </CommunityListTableAuthor>
                </CommunityListTableRow>
              ))
            ) : (
              // 게시물이 존재하지 않을 경우
              <CommunityListTableRow>
                <CommunityListTableTitle>
                  게시글이 없습니다.
                </CommunityListTableTitle>
                <CommunityListTableAuthor />
              </CommunityListTableRow>
            )}
          </CommunityListTableBody>
        </CommunityListTable>
        <WriteButton to="/board">게시글 작성하기</WriteButton>
      </Container>
    </>
  );
}

export default CommunityList;
