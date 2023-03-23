import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const RecruitByGu = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [gu, setGu] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const guName = location.state;
  const user = useSelector((state) => state.user);

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 6;

  // 게시글 목록을 가져오는 함수
  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const res = await axios.get(`/api/v1/recruitment/?boroughId=${id}`);
        console.log(res);
        setGu(res.data.data.recruitments[0].borough.borough);
        setTotal(res.data.data.recruitmentCount);
        setData(res.data.data.recruitments);
      } catch (error) {
        console.log(error);
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
          {!user.id ? null : (
            <button
              onClick={() => {
                navigate(`/recruitment/${id}/form`, { state: guName });
              }}
            >
              게시글 작성
            </button>
          )}
        </div>
        <VB>{data.length === 0 ? <p>'작성된 게시물이 없습니다.'</p> : list}</VB>
        <div>
          {data.length < 7 ? null : (
            <PaginationBox>
              <Pagination
                activePage={page}
                itemsCountPerPage={perPage}
                pageRangeDisplayed={5}
                totalItemsCount={total}
                onChange={handlePageChange}
              />
            </PaginationBox>
          )}
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

  button {
    border: none;
    border-radius: 20px;
    margin-left: 1rem;
    color: #41b787;
    font-size: 1rem;
    display: inline-block;
    cursor: pointer;
    text-decoration: underline;
    background-color: #fff;
  }
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

const PaginationBox = styled.div`
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 64px);
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
export default RecruitByGu;
