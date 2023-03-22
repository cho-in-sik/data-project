import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyVolunteer = ({
  title,
  volunteerTime,
  address,
  author,
  content,
  participation,
  meetingStatus,
  userId,
}) => {
  const navigate = useNavigate();
  const data = {
    title,
    volunteerTime,
    address,
    author,
    content,
    participation,
    userId,
  };
  //모집상태가 "모집완료" 이면 모집상태 색변경
  const meetingStatusFinish = meetingStatus === '모집완료' && '#ff5065';

  return (
    <VolunteerDetail
      onClick={() => navigate('/volunteerdetail', { state: data })}
    >
      <MeetingStatus
        style={{
          color: meetingStatusFinish,
          borderColor: meetingStatusFinish,
        }}
      >
        {meetingStatus}
      </MeetingStatus>
      <VolunteerMessage
        style={{
          backgroundColor: '#74DD63',
          padding: '8px 12px',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        {title}
      </VolunteerMessage>
      <VolunteerMessage>{volunteerTime}</VolunteerMessage>
      <VolunteerMessage>{address}</VolunteerMessage>
      <VolunteerMessage>{author}</VolunteerMessage>
    </VolunteerDetail>
  );
};

const VolunteerDetail = styled.div`
  position: relative;
  background-color: whitesmoke;

  width: 300px;
  height: 220px;
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

export default MyVolunteer;
