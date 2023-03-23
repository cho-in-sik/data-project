import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import Header from '../Header/Header';
import {
  CommunityDetailWrapper,
  CommunityDetailHeader,
  CommunityDetailTitle,
  CommunityDetailAuthor,
  CommunityDetailImage,
  CommunityDetailContent,
  CommunityDetailCommentTitle,
  CommunityDetailDivider,
  CommunityDetailComments,
} from './styles/CommunityDetailStyle';
import { useNavigate, useParams } from 'react-router-dom';

// 게시글 상세 페이지
function CommunityDetail() {
  const { id } = useParams(); // URL 파라미터 가져오기
  const [community, setCommunity] = useState(null); // 게시글 정보
  const [comments, setComments] = useState([]); // 댓글 정보
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/v1/board/${id}`);
        setCommunity(response.data.board); // 게시글 정보
        setComments(response.data.comments); // 댓글 정보
        // console.log(response.data.comments);
      } catch (error) {
        console.error('게시글을 불러오는데 실패하였습니다.', error);
        navigate('/board');
      }
    }
    fetchData(); // fetchData 함수 실행
  }, [id, navigate, community]); // [] 변경될 때마다 useEffect 함수가 실행되도록 함

  // 댓글 목록 갱신
  const updateComments = (comments) => {
    setCommunity({ ...community, comments: comments });
    // 댓글 정보 업데이트, community가 바뀌면 useEffect 함수가 실행되어 게시글 정보를 다시 가져옴
  };

  // 게시글 수정 페이지로 이동
  const handleEditClick = () => {
    navigate(`/board/edit/${community._id}`);
  };

  // 게시글 삭제 페이지로 이동
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/v1/board/${id}`);
      navigate('/board');
    } catch (error) {
      console.error('게시글 삭제에 실패하였습니다.', error);
      alert('본인의 게시글만 삭제할 수 있습니다.');
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/v1/board/${id}/comment/${commentId}`);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId,
      );
      // 댓글 정보를 업데이트하는 함수
      setComments(updatedComments); // 댓글 정보 업데이트
    } catch (error) {
      console.error('댓글 삭제에 실패하였습니다.', error);
      alert('본인의 댓글만 삭제할 수 있습니다.');
    }
  };
  if (!community) {
    return <div>게시글 로딩중</div>;
  }

  return (
    <>
      <Header />
      <CommunityDetailWrapper>
        <CommunityDetailHeader>
          <CommunityDetailTitle>{community.title}</CommunityDetailTitle>
          <CommunityDetailAuthor>
            작성자: {community.author.nickname}
          </CommunityDetailAuthor>
        </CommunityDetailHeader>
        <CommunityDetailDivider />
        {/* // 게시글에 이미지가 있을 경우에만 이미지를 보여줌 */}
        {community.image && community.image.length > 0 && (
          <CommunityDetailImage src={community.image} alt="업로드 이미지" />
        )}
        <CommunityDetailContent>{community.content}</CommunityDetailContent>
        <div>
          <button onClick={handleEditClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
        <CommunityDetailDivider />
        <CommunityDetailCommentTitle>댓글</CommunityDetailCommentTitle>
        <CommunityDetailComments>
          {/* // map 함수를 사용하여 댓글 목록을 보여줌 */}
          {/* // 댓글이 존재하지 않을 경우에는 댓글이 존재하지 않는 게시물입니다.를 보여줌 */}
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id}>
                <h4>{comment.writer.nickname}</h4>
                <p>{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p>댓글이 존재하지 않는 게시물입니다.</p>
          )}
          <CommentForm boardId={id} updateComments={updateComments} />
        </CommunityDetailComments>
        <button onClick={() => navigate('/board')}>목록으로</button>
      </CommunityDetailWrapper>
    </>
  );
}

export default CommunityDetail;
