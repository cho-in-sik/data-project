import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// /api/v1/recruitment/all

const AdminUser = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(
          `/api/v1/recruitment?page=${page}&perPage=${perPage}`,
        );
        setTotal(res.data.data.recruitmentCount);
        console.log(res);
        setPosts(res.data.data.recruitments);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleDelete = async (e) => {
    const id = e.target.parentElement.parentElement.firstChild.textContent;
    const res = await axios.delete(`/api/v1/admin/recruitment/${id}`);
    if (res.data !== '') {
      alert('삭제가 완료되었습니다.');
      window.location.reload();
    } else {
      alert('오류가 발생했습니다.');
      return false;
    }
  };
  const list = posts.map((item) => (
    <TableRow key={item._id}>
      <TableCell width="5%" style={{ display: 'none' }}>
        {item._id}
      </TableCell>
      <TableCell width="15%">{item.author?.nickname}</TableCell>
      <TableCell width="15%">{item.borough.borough}</TableCell>
      <TableCell width="15%">
        {item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 19)}
      </TableCell>
      <TableCell width="15%">{item.volunteerTime}</TableCell>
      <TableCell width="15%">{item.title}</TableCell>
      <TableCell width="10%">
        {item.participants.length}명 / {item.recruitments}명
      </TableCell>
      <TableCell width="10%">{item.meetingStatus}</TableCell>
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
            <FontAwesomeIcon icon={faNoteSticky} style={{ color: '#47b781' }} />
            <span>모집글 관리</span>
          </Title>
          <UserTable>
            <TableHead>
              <TableCell width="15%">모집자 닉네임</TableCell>
              <TableCell width="15%">지역</TableCell>
              <TableCell width="15%">모집 생성 일시</TableCell>
              <TableCell width="15%">봉사 일시</TableCell>
              <TableCell width="15%">모집글 제목</TableCell>
              <TableCell width="10%">참여자</TableCell>
              <TableCell width="10%">진행 여부</TableCell>
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
  height: 550px;
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
