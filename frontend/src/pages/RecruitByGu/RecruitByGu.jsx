import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import axios from 'axios';
import MyVolunteer from '../MyVolunteer/MyVolunteer';
import Paging from '../../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    _id: 1,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
  {
    _id: 2,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
  {
    _id: 3,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
  {
    _id: 4,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
  {
    _id: 5,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
  {
    _id: 6,
    borough: '송파구',
    title: '송파사거리 3인 모집합니다.',
    comment: '',
    volunteerTime: '23년3월24일 오후 4시-6시',
    recruitments: 3,
    content:
      '요즘 송파사거리에서 신호위반하는 차량이 많은 것 같아서요. 시간 나시는 분들 같이 합시다.',
    author: '송파맨',
    image: '',
    address: '송파사거리',
    category: '단기',
    participants: [],
    meetingStatus: '모집중',
  },
];

const RecruitByGu = (props) => {
  // const user = useSelector((state) => state.user);
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(data.length);
  const navigate = useNavigate();
  // const items = 6;

  const handlePageChange = (page) => {
    return setPage(page);
  };

  const list = data.map((item) => {
    return (
      <div key={item._id}>
        <VolunteerDetail
          onClick={() => navigate('/recruitmentdetail', { state: item })}
        >
          <MeetingStatus>{item.meetingStatus}</MeetingStatus>
          <VolunteerMessage>{item.title}</VolunteerMessage>
          <VolunteerMessage>{item.volunteerTime}</VolunteerMessage>
          <VolunteerMessage>{item.address}</VolunteerMessage>
          <VolunteerMessage>{item.author}</VolunteerMessage>
        </VolunteerDetail>
      </div>
    );
  });
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
          <Span>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                color: '#aaa',
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(-1);
              }}
            />
            무슨구의 모집 게시글(총 {data.length}건)
          </Span>
          <span
            onClick={() => {
              navigate('/recruitment/form');
            }}
          >
            | 작성하기
          </span>
        </div>
        <VB>{list}</VB>
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
  max-width: 1350px;
  width: 80%;
  height: 85%;
  border-radius: 20px;
  background-color: white;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Span = styled.span`
  font-size: 25px;
  font-weight: 400;
  padding-left: 50px;
`;

const VB = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const VolunteerDetail = styled.div`
  position: relative;
  background-color: whitesmoke;
  height: 28vh;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const MeetingStatus = styled.span`
  width: 50px;
  height: 15px;
  background-color: white;
  position: absolute;
  top: 22px;
  left: 20px;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  color: #2ccc63;
  border: solid 1px #2ccc63;
`;

const VolunteerMessage = styled.div`
  font-size: 20px;
`;

export default RecruitByGu;
