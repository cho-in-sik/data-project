import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/Header/Header';
import BackGround from '../../components/Background/Background';
import VolunteerComment from '../MyVolunteer/VolunteerComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const RecruitByGuDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [recruit, setRecruit] = useState(0);
  const [meetingStatus, setMeetingStatus] = useState('');
  const [isUserApplied, setIsUserApplied] = useState('참가신청');
  const [comment, setComment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/v1/recruitment/${id}`);
        console.log(res);
        setData(res.data.data.plainRecruitment);
        setRecruit(res.data.data.plainRecruitment.participants.length);
        setMeetingStatus(res.data.data.plainRecruitment.meetingStatus);
        setComment(res.data.data.comments);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [meetingStatus, isUserApplied]);

  // 참가신청 버튼 클릭 이벤트
  const handleApply = async () => {
    try {
      const res = await axios.post(`/api/v1/recruitment/${id}/participants`, {
        participantId: user.id,
      });
      console.log(res);
      if (res.statusText === 'Created') {
        setRecruit((prev) => prev + 1);
        setIsUserApplied(true);
        alert('해당 봉사에 참여 신청이 완료 되었습니다.');
      } else {
        alert('오류가 발생하였습니다.');
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };

  //props로 넘겨줄 함수 (댓글 post하고 setComment바꾸기)
  const postCommentHandler = (newComment) => {
    setComment((prevComments) => [...prevComments, newComment]);
  };

  // 참가 신청 취소 버튼 클릭 이벤트
  const handleCancel = async () => {
    try {
      const res = await axios.delete(`/api/v1/recruitment/${id}/participants`, {
        participantId: user.id,
      });
      if (res.statusText === 'OK') {
        setRecruit((prev) => prev - 1);
        setIsUserApplied(false);
        alert('참가 신청이 취소되었습니다.');
        // navigate(-1);
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
      data.meetingStatus === '모집중'
        ? (soonMeetingStatus = '모집완료')
        : (soonMeetingStatus = '모집중');

      // 곧 바뀔 상태로 수정하는 요청 보내기
      const res = await axios.put(`/api/v1/recruitment/${id}`, {
        ...data,
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

  // 모집글 삭제 클릭 이벤트
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/recruitment/${id}`);
      console.log(res);
      if (res.statusText === 'OK') {
        alert('게시글이 삭제되었습니다.');
        navigate(-1);
      } else {
        alert('게시글 삭제에 실패하였습니다.)');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 로그인한 유저가 현재 페이지 모집글에 참가 신청했는지 여부 체크.
  const checkApply = (id) => {
    const checkApplied = data.participants?.filter(
      (elem) => elem.participantId._id === id,
    );
    if (checkApplied?.length !== 0) {
      console.log('현재 참가한 상태입니다.');
      return true; // true = 참가한 상태입니다.
    }
  };

  //
  const deleteCommentHandler = (commentId) => {
    const updatedComments = comment.filter((item) => item._id !== commentId);
    setComment(updatedComments);
  };

  return (
    <BackGround>
      <Header />
      <VolunteerDetailBox>
        <ContentDiv>
          <HeadDiv>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                color: '#aaa',
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(-1);
              }}
            />
            <span>{data.title}</span>

            <span style={{ width: '40%', float: 'right', textAlign: 'right' }}>
              {/* 이 모임을 만든 사람인지 확인해서 */}
              {user.id === data.author?._id ? (
                // 이 모임을 만든 사람이면 보이는 버튼
                <>
                  <button onClick={toggleRecruitComplete}>모집상태 변경</button>
                  <button onClick={handleDelete}>모집글 삭제</button>
                </>
              ) : // 이 모임을 만든 사람이 아니면 보이는 버튼
              null}

              {/* 이 모임에 참가한 사람인지 체크 */}
              {checkApply(user.id) === true ? (
                <button onClick={handleCancel}>참가취소</button>
              ) : (
                <button onClick={handleApply}>참가신청</button>
              )}
            </span>
          </HeadDiv>
          <BodyBox>
            <ImgBox>
              <img src={data.image} alt="volunteer-IMG" />
            </ImgBox>
            <SpanDiv>
              <span style={{ display: 'none' }}>{data._id}</span>
              <p>
                <span>지역</span>
                {data.borough?.borough}
              </p>
              <p>
                <span>위치</span>
                {data.address}
              </p>
              <p>
                <span>기간</span>
                {data.volunteerTime}
              </p>
              <p>
                <span>모집 인원</span>
                {recruit}명 / {data.recruitments}명
              </p>
              {/* <p>
                <span>참여자</span>
                {getParticipants(data)}
              </p> */}
              <p>
                <span>모집 상태</span>
                {meetingStatus}
              </p>
              <p>
                <span>간단한 소개</span>
                {data.content}
              </p>
            </SpanDiv>
          </BodyBox>
        </ContentDiv>
        <VolunteerComment
          recruitmentId={id}
          comment={comment}
          deleteCommentHandler={deleteCommentHandler}
          postCommentHandler={postCommentHandler}
        />
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
  /* height: 60%; */
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

export default RecruitByGuDetail;
