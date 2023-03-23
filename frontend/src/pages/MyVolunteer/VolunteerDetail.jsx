import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../assets/images/66112.jpg';
import axios from 'axios';
import BackGround from '../../components/Background/Background';
import { useSelector } from 'react-redux';
import VolunteerComment from './VolunteerComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';

const VolunteerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  //useLocation 으로 navigate로 온 상태 받기
  const title = location.state.title;
  const volunteerTime = location.state.volunteerTime;
  const address = location.state.address;
  const content = location.state.content;
  const participants = location.state.participants;
  const userId = location.state.userId;
  const recruitmentId = location.state.recruitmentId;

  const [comment, setComment] = useState([]);

  //get으로 상세페이지 불러오기..
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/recruitment/${recruitmentId}`);
        setComment(res.data.data.comments);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [recruitmentId]);

  //참가자 탈퇴 핸들러
  const handleClick = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/recruitment/${user.id}/participaints`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  //props로 넘겨줄 함수 (댓글 delete하고 setComment바꾸기)
  const deleteCommentHandler = (commentId) => {
    const updatedComments = comment.filter((item) => item._id !== commentId);
    setComment(updatedComments);
  };

  //props로 넘겨줄 함수 (댓글 post하고 setComment바꾸기)
  const postCommentHandler = (data) => {
    console.log(data);
    const updatedComments = comment.push({ ...comment, data });
    setComment(updatedComments);
  };

  return (
    <BackGround>
      <Header />
      <VolunteerDetailBox>
        <ContentDiv>
          <HeadDiv>
            <FontAwesomeIcon
              onClick={() => navigate('/myvolunteers')}
              icon={faArrowLeft}
              size="2x"
              style={{ marginRight: '5%', cursor: 'pointer' }}
            />
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
                    marginTop: '-8px',
                    marginLeft: '10px',
                  }}
                >
                  {' '}
                  {participants.map((person, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        height: '60%',
                      }}
                    >
                      <span>{person}</span>

                      {user.id === userId && (
                        <button
                          onClick={() => console.log(1)}
                          style={{
                            height: '30px',
                            width: '30px',
                            marginTop: '5px',
                          }}
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </span>
            </SpanDiv>
          </BodyBox>
        </ContentDiv>
        <DescriptionBox>봉사소개: {content}</DescriptionBox>
        <ChatDiv>
          <VolunteerComment
            recruitmentId={recruitmentId}
            comment={comment}
            deleteCommentHandler={deleteCommentHandler}
            postCommentHandler={postCommentHandler}
          />
        </ChatDiv>
      </VolunteerDetailBox>
    </BackGround>
  );
};

const VolunteerDetailBox = styled.div`
  margin: 20px 0;
  position: relative;
  width: 75%;
  height: 85%;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ContentDiv = styled.div`
  height: 50%;
`;
const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 30px;

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
  height: 40%;
  margin-left: 30px;
`;

const ImgBox = styled.div`
  & img {
    border-radius: 10px;
    width: 400px;
    height: 10%;
  }
`;
const SpanDiv = styled.div`
  margin-top: 5%;
  margin-left: 18%;
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
  margin-top: 3%;
  margin-left: 30px;
  margin-bottom: 3%;
  font-size: 20px;
`;

export default VolunteerDetail;
