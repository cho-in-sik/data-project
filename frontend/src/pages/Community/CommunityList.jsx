import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import BackGround from '../../components/Background/Background';

import {
  Container,
  Title,
  Table,
  Empty,
  CreateButton,
  PaginationWrapper,
  LinkStyled,
  ButtonWrapper,
} from './styles/CommunityListStyle';

function CommunityList() {
  const [boards, setBoards] = useState([]); //게시판 목록
  const [page, setPage] = useState(1); //현재 페이지
  const perPage = 10; //한 페이지에 보여줄 게시글 수

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
    <BackGround>
      <Header />
      <Container>
        <Title>
          <FontAwesomeIcon icon={faUsers} /> 봉사자 커뮤니티
        </Title>
        <ButtonWrapper>
          <CreateButton to="/board">작성하기</CreateButton>
        </ButtonWrapper>
        <Table>
          <thead>
            <tr>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
            </tr>
          </thead>
          <tbody>
            {boards && boards.length > 0 ? (
              boards.map((board) => (
                <tr key={board._id}>
                  <td>
                    <LinkStyled to={`/board/${board._id}`}>
                      {board.title}
                    </LinkStyled>
                  </td>
                  <td>{board.author}</td>
                </tr>
              ))
            ) : (
              <tr>
                <Empty colSpan="2">게시글이 없습니다.</Empty>
              </tr>
            )}
          </tbody>
        </Table>
        <PaginationWrapper>
          <Pagination page={page} handlePageChange={handlePageChange} />
        </PaginationWrapper>
      </Container>
    </BackGround>
  );
}

export default CommunityList;
