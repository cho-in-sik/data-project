import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import baseImg from '../../assets/images/66112.jpg';
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
  // useLocation 으로 navigate로 온 상태 받기

  const recruitmentId = location.state.recruitmentId;

  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [volunteerTime, setVolunteerTime] = useState('');
  const [participants, setParticipants] = useState([]);
  const [content, setContent] = useState('');
  const [meetingStatus, setMeetingStatus] = useState('');
  const [recruit, setRecruit] = useState(0);
  const [recruitments, setRecruiments] = useState(0);
  const [img, setImg] = useState('');

  //get으로 상세페이지 데이터 불러오기..
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/recruitment/${recruitmentId}`);
        setComment(res.data.data.comments);
        setTitle(res.data.data.plainRecruitment.title);
        setAddress(res.data.data.plainRecruitment.address);
        setVolunteerTime(res.data.data.plainRecruitment.volunteerTime);
        setParticipants(res.data.data.plainRecruitment.participants);
        setContent(res.data.data.plainRecruitment.content);
        setMeetingStatus(res.data.data.plainRecruitment.meetingStatus);
        setRecruit(res.data.data.plainRecruitment.participants.length);
        setRecruiments(res.data.data.plainRecruitment.recruitments);
        setNickname(res.data.data.plainRecruitment.author.nickname);
        setImg(res.data.data.plainRecruitment.image);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [recruitmentId]);

  // 참가 신청 취소 버튼 클릭 이벤트
  const handleClick = async () => {
    try {
      const res = await axios.delete(
        `/api/v1/recruitment/${recruitmentId}/participants`,
        {
          participantId: user.id,
        },
      );

      if (res.statusText === 'OK') {
        setRecruit((prev) => prev - 1);
        alert('참가 신청이 취소되었습니다.');
        navigate('/mypage');
      } else {
        alert('참가 신청에 실패하였습니다.)');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 모집완료 버튼 클릭 이벤트
  const toggleRecruitComplete = async () => {
    try {
      let soonMeetingStatus = '';
      // 현재 모집 상황이 '모집중'이면 곧 바뀔 모집 상태는 '모집완료', 아니면 '모집중'
      meetingStatus === '모집중'
        ? (soonMeetingStatus = '모집완료')
        : (soonMeetingStatus = '모집중');

      // 곧 바뀔 상태로 수정하는 요청 보내기
      const res = await axios.put(`/api/v1/recruitment/${recruitmentId}`, {
        meetingStatus: soonMeetingStatus,
      });

      // 그래서
      console.log(
        '모집 상태는 ',
        res.data.data.meetingStatus,
        '(으)로 바뀝니다.',
      );

      // 통신에 성공하면
      if (res.statusText === 'OK') {
        alert(`상태를 ${soonMeetingStatus}(으)로 변경하였습니다.`);
        // 바뀐 상태로 렌더링하기.
        setMeetingStatus(soonMeetingStatus);
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //props로 넘겨줄 함수 (댓글 delete하고 setComment바꾸기)
  const deleteCommentHandler = (commentId) => {
    const updatedComments = comment.filter((item) => item._id !== commentId);
    setComment(updatedComments);
  };

  //props로 넘겨줄 함수 (댓글 post하고 setComment바꾸기)
  const postCommentHandler = (newComment) => {
    setComment((prevComments) => [...prevComments, newComment]);
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
            {nickname !== user.nickname ? (
              <button onClick={handleClick}>참가취소</button>
            ) : (
              <button onClick={toggleRecruitComplete}>모집상태 변경</button>
            )}
          </HeadDiv>
          <BodyBox>
            <ImgBox>
              <img src={img === null ? baseImg : img} alt="volunteer-IMG" />
            </ImgBox>
            <SpanDiv>
              <p>
                <span>주소:</span>
                {address}
              </p>
              <p>
                <span>기간:</span>
                {volunteerTime}
              </p>
              <p>
                <span>모집인원: </span>
                {recruit}명 / {recruitments}명
              </p>
              <p>
                <span>간단소개: </span>
                {content}
              </p>
              {/* <span
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
                    </div>
                  ))}
                </div>
              </span> */}
            </SpanDiv>
          </BodyBox>
        </ContentDiv>
        <DescriptionBox>봉사소개: {content}</DescriptionBox>
        <ChatDiv>
          <VolunteerComment
            recruitmentId={recruitmentId}
            comment={comment.length === 0 ? '' : comment}
            deleteCommentHandler={deleteCommentHandler}
            postCommentHandler={postCommentHandler}
          />
        </ChatDiv>
      </VolunteerDetailBox>
    </BackGround>
  );
};

const VolunteerDetailBox = styled.div`
  margin: 4rem 0;
  position: relative;
  width: 80%;
  height: auto;
  max-height: 70%;
  padding: 2rem;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ContentDiv = styled.div`
  /* height: 50%; */
`;
const HeadDiv = styled.div`
  & span {
    width: 50%;
    min-width: 380px;
    font-size: 30px;
    font-weight: 400;
  }
  & button {
    margin: 0px 0.3rem;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    padding: 3px 8px;
    color: white;
    font-size: 1rem;
    background-color: rgb(255, 80, 101);
    cursor: pointer;
    &:hover {
      background-color: #fb324a;
    }
  }
`;
const BodyBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  height: auto;
  padding: 2rem;
`;
const ChatDiv = styled.div`
  padding: 2rem;
`;

const ImgBox = styled.div`
  width: 50%;
  height: auto;
  & img {
    border-radius: 10px;
    width: 100%;
  }
`;
const SpanDiv = styled.div`
  width: 50%;
  padding-left: 5%;
  & span {
    display: inline-block;
    font-size: 1rem;
    margin: 0.5rem 0;
    width: 8rem;
  }
`;

const DescriptionBox = styled.div`
  height: 10%;
  font-size: 18px;
`;

export default VolunteerDetail;
