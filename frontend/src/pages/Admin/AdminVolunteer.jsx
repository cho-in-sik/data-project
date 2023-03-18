import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// /api/v1/recruitment/all

const AdminUser = (props) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  /* const data = [
    {
      id: 1,
      author: '홍길',
      title: '000모임',
      volunteerTime: '5시',
      recruitment: '4',
      address: '00고 사거리',
      createdAt: '??',
      participation: '3',
      meetingStatus: '모집중',
    },
    {
      id: 2,
      author: '홍길',
      title: '000모임',
      volunteerTime: '5시',
      recruitment: '4',
      address: '00고 사거리',
      createdAt: '??',
      participation: '3',
      meetingStatus: '모집중',
    },
  ]; */
  useEffect(() => {
    const getAllPosts = async () => {
      debugger;
      try {
        const res = await axios.get('/api/v1/recruitment/all');
        console.log(res);
        // setPosts(res.data.boards);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, []);
  const handleDelete = async () => {
    return;
    // const res = await axios.delete('http://localhost:3000/admin/', {
    //   data: { token },
    // });
    // console.log(res);
  };
  const list = posts.map((item) => (
    <TableRow key={item.id}>
      <TableCell width="15%">{item.address}</TableCell>
      <TableCell width="15%">{item.volunteerTime}</TableCell>
      <TableCell width="45%">
        {item.participation}명 / {item.recruitment}명
      </TableCell>
      <TableCell width="15%">{item.title}</TableCell>
      <TableCell width="10%">
        <button onChange={handleDelete}>삭제</button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <BackGround>
        <Header />
        <AdminBox>
          <Title>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: '#aaa', marginRight: '2rem', cursor: 'pointer' }}
              onClick={() => {
                navigate(-1);
              }}
            />
            <FontAwesomeIcon icon={faNoteSticky} style={{ color: '#47b781' }} />
            <span>모집글 관리</span>
          </Title>
          <UserTable>
            <TableHead>
              <TableCell width="15%">지역</TableCell>
              <TableCell width="15%">시간</TableCell>
              <TableCell width="45%">참여자</TableCell>
              <TableCell width="15%">모집글 제목</TableCell>
              <TableCell width="10%">삭제</TableCell>
            </TableHead>
            {list}
          </UserTable>
        </AdminBox>
      </BackGround>
    </div>
  );
};

const AdminBox = styled.div`
  position: relative;
  width: 90%;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 4rem;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;

  span {
    margin-left: 1rem;
  }
`;

const UserTable = styled.div`
  text-align: center;
  width: 95%;
  margin: 0 auto;
`;

const TableHead = styled.div`
  background-color: #eee;
  border-top: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
`;

const TableRow = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const TableCell = styled.span`
  width: ${(props) => props.width};
`;
export default AdminUser;
