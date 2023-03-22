import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import axios from 'axios';
import MyVolunteer from './MyVolunteer';
import Paging from '../../components/Pagination/Pagination';
import { useSelector } from 'react-redux';

const list = [
  {
    title: '서울봉사',
    volunteerTime: '2023-03-12',
    address: '놀이터',
    participation: ['조인식 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집중',
    userId: 1,
  },
  {
    title: '광주봉사',
    volunteerTime: '2024-08-12',
    address: '초등학교',
    participation: ['안정민 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집완료',
    userId: 2,
  },
  {
    title: '부산봉사',
    volunteerTime: '2021-03-12',
    address: '중학교',
    participation: ['최중현 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집중',
    userId: 3,
  },
  {
    title: '인천봉사',
    volunteerTime: '2023-12-12',
    address: '고등학교',
    participation: ['조인식 ', '안정민', '최중현'],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집완료',
    userId: 4,
  },
  {
    title: '대구봉사',
    volunteerTime: '2023-03-12',
    address: '횡단보도',
    participation: ['조인식 ', '최중현'],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집중',
    userId: 5,
  },
  {
    title: '대전봉사',
    volunteerTime: '2000-03-12',
    address: '공원',
    participation: ['조인식 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집중',
    userId: 6,
  },
  {
    title: '제주도봉사',
    volunteerTime: '2023-03-12',
    address: '공원2',
    participation: ['조인식 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집완료',
    userId: 6,
  },
  {
    title: '서울봉사',
    volunteerTime: '2023-03-12',
    address: '놀이터',
    participation: ['조인식 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집중',
    userId: 7,
  },
  {
    title: '울산봉사',
    volunteerTime: '2023-03-12',
    address: '공원3',
    participation: ['조인 '],
    author: '조인식',
    content:
      '안녕하세요 어디어디 봉사하는 모임입니다. 잘부탁드립니다 파이팅파이팅',
    meetingStatus: '모집완료',
    userId: 8,
  },
];

const MyVolunteers = (props) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(list);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(20);
  const navigate = useNavigate();
  const items = 6;
  const [volunteerState, setVolunteerState] = useState('');

  const handlePageChange = (page) => {
    return setPage(page);
  };

  //참여한 봉사내역
  const handleParticipatedVolunteer = () => {
    setVolunteerState('participate');
  };
  //참여한 봉사만 필터하는 함수
  const participateVolunteer = data
    .slice(items * (page - 1), items * (page - 1) + items)
    .filter((item) => item.userId !== user.id);

  //개설한 봉사내역
  const handleMadeVolunteer = () => {
    setVolunteerState('made');
  };
  //개설한 봉사만 필터하는 함수
  const joinVolunteer = data
    .slice(items * (page - 1), items * (page - 1) + items)
    .filter((item) => item.userId === user.id);

  // 게시글 목록을 가져오는 함수
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/v1/board?page=${page}&perPage=${items}`,
  //       );
  //       const pageData = {
  //         page: response.data.page,
  //         perPage: response.data.perPage,
  //         total: response.data.total,
  //         totalPage: Response.data.totalPage,
  //       };
  //       // 응답 데이터에서 boards 배열만 추출하여 setData로 업데이트
  //       setData(response.data.boards);
  //       setTotal(pageData.total);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [page, items]); //page, perPage가 변경될 때마다 useEffect가 실행

  return (
    <BackGround>
      <Header />
      <VolunteerBox>
        <div style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <Span onClick={handleParticipatedVolunteer}>참여한 봉사내역</Span>
          <Span onClick={handleMadeVolunteer}>개설한 봉사내역</Span>
        </div>
        <VB>
          {volunteerState === ''
            ? data
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
                      meetingStatus={value.meetingStatus}
                      userId={value.userId}
                    />
                  );
                })
            : (volunteerState === 'participate'
                ? participateVolunteer
                : joinVolunteer
              ).map((value, i) => {
                return (
                  <MyVolunteer
                    key={i}
                    title={value.title}
                    volunteerTime={value.volunteerTime}
                    address={value.address}
                    author={value.author}
                    content={value.content}
                    participation={value.participation}
                    meetingStatus={value.meetingStatus}
                    userId={value.userId}
                  />
                );
              })}

          {/* {data
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
                  meetingStatus={value.meetingStatus}
                  userId={value.userId}
                />
              );
            })} */}
        </VB>
        <div>
          <Paging
            page={page}
            handlePageChange={handlePageChange}
            total={total}
          />
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
  padding-left: 50px;
  cursor: pointer;
`;

const VB = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default MyVolunteers;
