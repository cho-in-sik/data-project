import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';

import MyVolunteer from './MyVolunteer';
import Paging from '../../components/Pagination/Pagination';

const list = [
  {
    title: '서울봉사',
    volunteerTime: '2023-03-12',
    address: '놀이터',
    participation: ['조인식 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '광주봉사',
    volunteerTime: '2024-08-12',
    address: '초등학교',
    participation: ['안정민 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '부산봉사',
    volunteerTime: '2021-03-12',
    address: '중학교',
    participation: ['최중현 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '인천봉사',
    volunteerTime: '2023-12-12',
    address: '고등학교',
    participation: ['조인식 ', '안정민', '최중현'],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '대구봉사',
    volunteerTime: '2023-03-12',
    address: '횡단보도',
    participation: ['조인식 ', '최중현'],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '대전봉사',
    volunteerTime: '2000-03-12',
    address: '공원',
    participation: ['조인식 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '제주도봉사',
    volunteerTime: '2023-03-12',
    address: '공원2',
    participation: ['조인식 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '서울봉사',
    volunteerTime: '2023-03-12',
    address: '놀이터',
    participation: ['조인식 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
  {
    title: '울산봉사',
    volunteerTime: '2023-03-12',
    address: '공원3',
    participation: ['조인 '],
    author: '운영자',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
  },
];

const MyVolunteers = (props) => {
  const [data, setData] = useState(list);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const items = 6;

  const handlePageChange = (page) => {
    return setPage(page);
  };
  return (
    <BackGround>
      <Header />
      <VolunteerBox>
        <div style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <Span>참여한 봉사내역</Span>
          <Span>개설한 봉사내역</Span>
        </div>
        <VB>
          {data
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((value, i) => {
              return (
                <MyVolunteer
                  key={i}
                  title={value.title}
                  volunteerTime={value.volunteerTime}
                  address={value.address}
                  author={value.author}
                  content={value.content}
                  participation={value.participation}
                />
              );
            })}
        </VB>
        <div>
          <Paging page={page} handlePageChange={handlePageChange} />
        </div>
      </VolunteerBox>
    </BackGround>
  );
};

const VolunteerBox = styled.div`
  margin-top: 30px;
  width: 90%;
  height: 650px;
  border-radius: 20px;
  background-color: white;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Span = styled.span`
  font-size: 25px;
  font-weight: 400;
  font-family: Roboto;
  padding-left: 50px;
`;

const VB = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default MyVolunteers;
