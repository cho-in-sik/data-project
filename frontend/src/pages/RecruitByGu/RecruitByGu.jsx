import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import axios from 'axios';
import Paging from '../../components/Pagination/Pagination';
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
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [gu, setGu] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [total, setTotal] = useState(data.length);
  const navigate = useNavigate();
  const location = useLocation();
  // const items = 6;

  const guName = location.state;
  console.log(guName);
  // 게시글 목록을 가져오는 함수
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/v1/recruitment/?boroughId=${id}`);
        console.log(res);
        setGu(res.data.data.recruitments[0].borough.borough);
        setData(res.data.data.recruitments);
        /* const pageData = {
          page: response.data.page,
          perPage: response.data.perPage,
          total: response.data.total,
          totalPage: Response.data.totalPage,
        };
        // 응답 데이터에서 boards 배열만 추출하여 setData로 업데이트
        setData(response.data.boards);
        setTotal(pageData.total); */
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [page, perPage]);

  const handlePageChange = (page) => {
    return setPage(page);
  };

  const list = data.map((item) => {
    return (
      <VolunteerDetail
        key={item._id}
        onClick={() => navigate(`/recruitment/${id}/${item._id}`)}
      >
        <MeetingStatus>{item.meetingStatus}</MeetingStatus>
        <VolunteerMessage>{item.title}</VolunteerMessage>
        <VolunteerMessage>{item.volunteerTime}</VolunteerMessage>
        <VolunteerMessage>{item.address}</VolunteerMessage>
        <VolunteerMessage>{item.author.nickname}</VolunteerMessage>
      </VolunteerDetail>
    );
  });

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
            {guName}의 모집 게시글(총 {data.length}건)
          </Span>
          <span
            onClick={() => {
              navigate(`/recruitment/${id}/form`, { state: guName });
            }}
          >
            | 새로운 게시글 작성하기
          </span>
        </div>
        <VB>{data.length === 0 ? <p>'작성된 게시물이 없습니다.'</p> : list}</VB>
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
  width: 90%;
  height: 85%;
  border-radius: 20px;
  background-color: white;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Span = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  padding-left: 3rem;
`;

const VB = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const VolunteerDetail = styled.div`
  margin: 0.8rem;
  position: relative;
  background-color: whitesmoke;
  width: 30%;
  height: 25vh;
  border-radius: 20px;
  margin: 0.8rem;
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
