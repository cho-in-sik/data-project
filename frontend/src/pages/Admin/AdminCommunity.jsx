import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminUser = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/board?page=${page}&perPage=${perPage}`,
        );
        setPosts(res.data.boards);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, [page, perPage]);

  const handleDelete = async () => {
    return;
    /* const res = await axios.delete(
      `http://localhost:3000/api/v1/board/delete`
    )
    console.log(res);
    */
  };
  const list = posts.map((item) => (
    <TableRow key={item.id}>
      <TableCell width="30%">{item.title}</TableCell>
      <TableCell width="15%">{item.createdAt}</TableCell>
      <TableCell width="15%">{item.author}</TableCell>
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
            <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} />
            <span>커뮤니티 관리</span>
          </Title>
          <UserTable>
            <TableHead>
              <TableCell width="30%">제목</TableCell>
              <TableCell width="15%">시간</TableCell>
              <TableCell width="15%">작성자</TableCell>
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
  display: flex;
  background-color: #eee;
  border-top: 1px solid;
  border-bottom: 1px solid;
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
