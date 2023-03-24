import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyVolunteer = ({
  title,
  volunteerTime,
  address,
  author,
  meetingStatus,
  createdAt,
  recruitmentId,
}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const data = {
    recruitmentId,
  };
  //모집상태가 "모집완료" 이면 모집상태 색변경
  const meetingStatusFinishedColor = meetingStatus === '모집완료' && '#ff5065';

  return (
    <VolunteerDetail
      onClick={() => navigate('/volunteerdetail', { state: data })}
    >
      <MeetingStatus
        style={{
          color: meetingStatusFinishedColor,
          borderColor: meetingStatusFinishedColor,
        }}
      >
        {meetingStatus}
      </MeetingStatus>
      <VolunteerMessage>{title}</VolunteerMessage>
      <VolDateLoc>장소 | {address}</VolDateLoc>
      <VolDateLoc>시간 | {volunteerTime}</VolDateLoc>
      <VolCreated bottom="40px">
        {author === user.id ? user.nickname : 'by ' + author}
      </VolCreated>
      <VolCreated>{createdAt}</VolCreated>
    </VolunteerDetail>
  );
};

const VolunteerDetail = styled.div`
  margin: 0.8rem;
  position: relative;
  background-color: whitesmoke;
  width: 27%;
  height: 30%;
  min-height: 170px;
  border-radius: 20px;
  margin: 0.8rem;
  padding: 0.8rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const MeetingStatus = styled.span`
  width: auto;
  height: 15px;
  background-color: white;
  position: absolute;
  bottom: 22px;
  left: 20px;
  font-size: 1rem;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  color: #2ccc63;
  border: solid 1px #2ccc63;
`;

const VolunteerMessage = styled.div`
  text-align: center;
  margin: 30px 0;
  font-size: 1.4rem;
`;

const VolDateLoc = styled.div`
  width: 70%;
  margin: 0.5rem auto;
  font-size: 0.8rem;
`;

const VolCreated = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom};
  right: 20px;
  font-style: italic;
  color: #999;
  font-size: 0.8rem;
`;

export default MyVolunteer;
