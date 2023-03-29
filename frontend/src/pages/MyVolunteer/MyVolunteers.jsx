import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import axios from 'axios';
import MyVolunteer from './MyVolunteer';
import Paging from '../../components/Pagination/Pagination';
import { useSelector } from 'react-redux';

const MyVolunteers = (props) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const items = 6;

  const [type, setType] = useState(0);

  const handlePageChange = (page) => {
    return setPage(page);
  };

  //맨처음 렌더링화면 참여한 모집글
  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get('/api/v1/my/participantRecruitments');
        setData(res.data.data.myParticipants);

        setTotal(res.data.data.totalPage);
        setType(false);
      } catch (e) {
        console.log(e);
      }
    };
    call();
  }, []);

  //참여한 모집글 조회
  const handleParticipated = async () => {
    try {
      const res = await axios.get('/api/v1/my/participantRecruitments');

      setData(res.data.data.myParticipants);

      setTotal(res.data.data.totalPage);
      setType(false);
    } catch (error) {
      console.error(error);
    }
  };
  //개설한 모집글 조회
  const handleMade = async () => {
    try {
      const res = await axios.get('/api/v1/my/authorRecruitments');
      setTotal(res.data.data.totalPage);

      setData(res.data.data.myRecruitments);
      setType(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackGround>
      <Header />
      <VolunteerBox>
        <div style={{ margin: '1rem' }}>
          <Span onClick={handleParticipated}>참여한 봉사내역</Span>
          <Span onClick={handleMade} style={{ borderLeft: '1px solid' }}>
            개설한 봉사내역
          </Span>
        </div>

        <VB>
          {data.length === 0 ? (
            <NoVolunteer>봉사 내역이 존재하지 않습니다</NoVolunteer>
          ) : (
            data
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((value, i) => {
                return (
                  <MyVolunteer
                    key={i}
                    title={type ? value.title : value.recruitmentId.title}
                    volunteerTime={
                      type
                        ? value.volunteerTime
                        : value.recruitmentId.volunteerTime
                    }
                    address={type ? value.address : value.recruitmentId.address}
                    author={
                      type
                        ? value.author.nickname
                        : value.recruitmentId.author.nickname
                    }
                    content={type ? value.content : value.recruitmentId.content}
                    participants={
                      type
                        ? value.participants
                        : value.recruitmentId.participants
                    }
                    meetingStatus={
                      type
                        ? value.meetingStatus
                        : value.recruitmentId.meetingStatus
                    }
                    // recruitmentId={value._id}
                    recruitmentId={type ? value._id : value.recruitmentId._id}
                  />
                );
              })
          )}
        </VB>
        {total < 7 ? null : (
          <div>
            <Paging
              onChange={handlePageChange}
              activePage={page}
              itemsCountPerPage={items}
              pageRangeDisplayed={5}
              totalItemsCount={total}
            />
          </div>
        )}
      </VolunteerBox>
    </BackGround>
  );
};

const VolunteerBox = styled.div`
  margin-top: 30px;
  max-width: 1350px;
  width: 90%;
  height: auto;
  border-radius: 20px;
  background-color: white;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  padding-bottom: 5rem;
`;
const Span = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0 1.5rem;
  cursor: pointer;
`;

const VB = styled.div`
  width: 95%;
  margin: 3rem auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const NoVolunteer = styled.span`
  padding: 15% 0;
  font-size: 20px;
`;

export default MyVolunteers;
