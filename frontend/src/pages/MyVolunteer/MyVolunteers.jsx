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
        <div style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <Span onClick={handleParticipated}>참여한 봉사내역</Span>
          <Span onClick={handleMade}>개설한 봉사내역</Span>
        </div>

        <VB>
          {data.length === 0
            ? null
            : data
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
                      address={
                        type ? value.address : value.recruitmentId.address
                      }
                      author={
                        type
                          ? value.author.nickname
                          : value.recruitmentId.author.nickname
                      }
                      content={
                        type ? value.content : value.recruitmentId.content
                      }
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
                })}
        </VB>
        <div>
          <Paging
            onChange={handlePageChange}
            activePage={page}
            itemsCountPerPage={items}
            pageRangeDisplayed={5}
            totalItemsCount={total}
          />
        </div>
      </VolunteerBox>
    </BackGround>
  );
};

const VolunteerBox = styled.div`
  max-width: 1440px;
  margin-top: 30px;
  width: 90%;
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
  cursor: pointer;
`;

const VB = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default MyVolunteers;
