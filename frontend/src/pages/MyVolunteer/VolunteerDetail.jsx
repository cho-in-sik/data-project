import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../assets/images/66112.jpg';
import axios from 'axios';

const VolunteerDetail = ({ data }) => {
  const location = useLocation();

  //useLocation 으로 navigate로 온 상태 받기
  const title = location.state.title;
  const volunteerTime = location.state.volunteerTime;
  const address = location.state.address;
  const content = location.state.content;
  const participation = location.state.participation;
  console.log(participation);

  const handleClick = async () => {
    try {
      await axios.delete('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <VolunteerDetailBox>
        <ContentDiv>
          <HeadDiv>
            <span>{title}</span>
            <button onClick={handleClick}>참가취소</button>
          </HeadDiv>
          <BodyBox>
            <ImgBox>
              <img src={img} alt="volunteer-IMG" />
            </ImgBox>
            <SpanDiv>
              <span>
                주소: <span>{address}</span>
              </span>
              <span>
                기간: <span>{volunteerTime}</span>
              </span>
              <span
                style={{
                  display: 'flex',
                }}
              >
                참여자:{' '}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '-8px',
                    marginLeft: '10px',
                  }}
                >
                  {participation.map((person, i) => (
                    <span style={{ marginBottom: '10px' }}>{person}</span>
                  ))}
                </div>
              </span>
            </SpanDiv>
          </BodyBox>
        </ContentDiv>
        <div style={{ height: '10%' }}>{content}</div>
        <ChatDiv>댓글 div</ChatDiv>
      </VolunteerDetailBox>
    </div>
  );
};

const VolunteerDetailBox = styled.div`
  width: 1000px;
  height: 700px;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ContentDiv = styled.div`
  height: 60%;
`;
const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 30px;
  & span {
    font-size: 30px;
    font-weight: 400;
  }
  & button {
    border: none;
    font-weight: 500;
    padding: 5px 15px;
    color: white;
    font-size: 20px;
    background-color: #ff5065;
    cursor: pointer;
  }
`;
const BodyBox = styled.div`
  margin: 0px 30px;
  display: flex;
  align-items: center;
`;
const ChatDiv = styled.div`
  height: 30%;
`;

const ImgBox = styled.div`
  & img {
    border-radius: 10px;
    width: 400px;
    height: 300px;
  }
`;
const SpanDiv = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;

  & span {
    font-size: 24px;
    height: 80px;
  }
  & span span {
    padding: 8px;
    border-radius: 5px;
  }
`;

export default VolunteerDetail;
