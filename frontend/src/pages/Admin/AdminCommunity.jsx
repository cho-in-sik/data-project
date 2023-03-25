import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminUser = (props) => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(
          `/api/v1/board?page=${page}&perPage=${perPage}`,
        );
        console.log(res);
        setTotal(res.data.total);
        setPosts(res.data.boards);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, [page, perPage]);

  const handleDelete = async (e) => {
    debugger;
    const id = e.target.parentElement.parentElement.firstChild.textContent;
    const res = await axios.delete(`/api/v1/admin/board/${id}`);
    console.log(res);
    if (res.data !== '') {
      alert('삭제되었습니다..');
    } else {
      alert('오류가 발생했습니다.');
      return false;
    }
  };
  const list = posts.map((item) => (
    <TableRow key={item._id}>
      <TableCell style={{ display: 'none' }}>{item._id}</TableCell>
      <TableCell width="30%">{item.title}</TableCell>
      <TableCell width="15%">{item.createdAt}</TableCell>
      <TableCell width="15%">{item.author?.nickname}</TableCell>
      <TableCell width="10%">
        <button onClick={handleDelete}>삭제</button>
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
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={perPage}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              nextPageText=">"
              prevPageText="<"
              onChange={handlePageChange}
            />
          </PaginationBox>
        </AdminBox>
      </BackGround>
    </div>
  );
};

const AdminBox = styled.div`
  position: relative;
  width: 90%;
  height: auto;
  min-height: 70vh;
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
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
  margin: 2rem auto;
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

  &:hover {
    background-color: #eee;
  }
`;

const TableCell = styled.span`
  width: ${(props) => props.width};
`;

const PaginationBox = styled.div`
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 64px);
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

export default AdminUser;
