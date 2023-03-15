import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyVolunteer = ({
  title,
  volunteerTime,
  address,
  author,
  content,
  participation,
}) => {
  const navigate = useNavigate();
  const data = {
    title,
    volunteerTime,
    address,
    author,
    content,
    participation,
  };

  return (
    <VolunteerDetail
      onClick={() => navigate('/volunteerdetail', { state: data })}
    >
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

const VolunteerMessage = styled.div`
  font-size: 20px;
`;

export default MyVolunteer;
