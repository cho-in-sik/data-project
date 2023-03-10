import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MyVolunteer from './MyVolunteer';

const MyVolunteers = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <BackGround>
        <VolunteerBox>
          <div style={{ paddingTop: '50px', paddingBottom: '30px' }}>
            <Span>참여한 봉사내역</Span>
            <Span>개설한 봉사내역</Span>
          </div>
          <VB>
            <MyVolunteer />
            <MyVolunteer />
            <MyVolunteer />
            <MyVolunteer />
            <MyVolunteer />
            <MyVolunteer />
          </VB>
          <div>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2x"
              style={{ position: 'absolute', left: '550px', bottom: '25px' }}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              style={{ position: 'absolute', right: '550px', bottom: '25px' }}
            />
          </div>
        </VolunteerBox>
      </BackGround>
    </>
  );
};

const VolunteerBox = styled.div`
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
