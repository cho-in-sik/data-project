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
import Pagination from '../../components/Pagination/Pagination';

function CommunityList() {
  const [boards, setBoards] = useState([]); //게시판 목록
  const [page, setPage] = useState(1); //현재 페이지
  const perPage = 5; //한 페이지에 보여줄 게시글 수

  // 게시글 목록을 가져오는 함수
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/board?page=${page}&perPage=${perPage}`,
        );
        // 응답 데이터에서 boards 배열만 추출하여 setBoards로 업데이트
        setBoards(response.data.boards);
        // console.log(response.data.boards);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [page, perPage]); //page, perPage가 변경될 때마다 useEffect가 실행

  // 페이지 번호를 변경하는 함수
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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
              <CommunityListTableRow>
                <CommunityListTableTitle>
                  게시글이 없습니다.
                </CommunityListTableTitle>
                <CommunityListTableAuthor />
              </CommunityListTableRow>
            )}
          </CommunityListTableBody>
        </CommunityListTable>
        <Pagination page={page} handlePageChange={handlePageChange} />
        <WriteButton to="/board">게시글 작성하기</WriteButton>
      </Container>
    </>
  );
}

export default CommunityList;
