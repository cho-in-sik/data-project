import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../assets/images/66112.jpg';
import axios from 'axios';
import BackGround from '../../components/Background/Background';
import { useSelector } from 'react-redux';
const RecruitByGuDetail = () => {
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
  ];
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleClick = async () => {
    try {
      await axios.delete('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackGround>
      <VolunteerDetailBox>
        <ContentDiv>
          <HeadDiv>
            <span>{data.title}</span>
            <button onClick={handlClickApply}>참가신청</button>
            <button onClick={handleClick}>참가취소</button>
          </HeadDiv>
          <BodyBox>
            <ImgBox>
              <img src={img} alt="volunteer-IMG" />
            </ImgBox>
            <SpanDiv>
              <span>
                주소: <span>{data.address}</span>
              </span>
              <span>
                기간: <span>{data.volunteerTime}</span>
              </span>
              <span
                style={{
                  display: 'flex',
                }}
              >
                참여자:{' '}
                <div
                  style={{
                    marginTop: '-8px',
                    marginLeft: '10px',
                  }}
                />
              </span>
            </SpanDiv>
          </BodyBox>
        </ContentDiv>
        <DescriptionBox>봉사소개: {data.content}</DescriptionBox>
        <ChatDiv>댓글 div</ChatDiv>
      </VolunteerDetailBox>
    </BackGround>
  );
};

const VolunteerDetailBox = styled.div`
  margin-top: 50px;
  position: relative;
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

const DescriptionBox = styled.div`
  height: 10%;
  font-size: 18px;
  margin-top: 30px;
  margin-left: 30px;
`;

export default RecruitByGuDetail;
