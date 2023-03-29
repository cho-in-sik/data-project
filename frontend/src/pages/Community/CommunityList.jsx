import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';

import {
  Container,
  Title,
  Table,
  Empty,
  CreateButton,
  LinkStyled,
  ButtonWrapper,
  PaginationWrapper,
} from './styles/CommunityListStyle';
import styled from 'styled-components';

function CommunityList() {
  const [boards, setBoards] = useState([]); // 게시글 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [perPage, setPerPage] = useState(10); // 한 페이지에 보여줄 게시글 수
  const [totalPage, setTotalPage] = useState(0); // 전체 페이지 수

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/api/v1/board?page=${page}&perPage=${perPage}`,
        ); // 게시글 목록 가져오기

        setBoards(response.data.boards); // 게시글 목록
        setTotalPage(response.data.totalPage); // 전체 페이지 수
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [page, perPage]); // page 혹은 perPage가 변경될 때마다 useEffect 함수 실행

  const renderPageButtons = () => {
    const buttons = []; // 페이지 버튼들을 담을 배열
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          style={{ fontWeight: i === page ? 'bold' : 'normal' }}
        >
          {i}
        </button>, // 현재 페이지와 같은 페이지 번호의 버튼은 굵게 표시
      );
    }
    return buttons;
  };

  return (
    <BackColor>
      <Header />
      <Container>
        <Title>
          <FontAwesomeIcon icon={faUsers} /> 봉사자 커뮤니티
        </Title>
        <ButtonWrapper>
          <CreateButton to="/board/write">게시글 작성</CreateButton>
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
                  <td>{board.author ? board.author.nickname : '익명'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <Empty colSpan="2">게시글이 없습니다.</Empty>
              </tr> // 게시글이 없을 때
            )}
          </tbody>
        </Table>
        <PaginationWrapper>{renderPageButtons()}</PaginationWrapper>
      </Container>
    </BackColor>
  );
}
const BackColor = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #47b781;
`;

export default CommunityList;
