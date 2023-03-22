import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import axios from 'axios';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminUser = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  // 전체 회원목록 조회
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `/api/v1/admin/users?page=${page}&perPage=${perPage}`,
        );
        setData(res.data.data.users);
      } catch (e) {
        console.log(e);
      }
    };
    getAllUsers();
  }, [page, perPage]);

  // 아래 두 이벤트함수를 실행했을 때 각각의 target 회원에 해당하는 id를 가져와서 서버로 요청을 해야할텐데 어떤 방법으로 해야할까요?

  // 회원권한 onClick
  const handleSelectChange = async (e) => {
    // setUserType(e.target.value);
    const res = await axios.put(`/api/v1/admin/users/:id`, {
      userType: userType,
    });
  };

  // 회원탈퇴 onClick
  const handleDelete = (e) => {
    debugger;
    console.log(e.target.value);
  };

  const list = data.map((item) => {
    return (
      <TableRow key={item._id}>
        <TableCell width="5%">{item.name}</TableCell>
        <TableCell width="8%">{item.nickname}</TableCell>
        <TableCell width="15%">{item.email}</TableCell>
        <TableCell width="7%">{item.phoneNumber}</TableCell>
        <TableCell width="25%">{item.address}</TableCell>
        {/* <TableCell width="24%">
        {item.volHistory[0].title} 등 {item.volHistory.length}건
      </TableCell> */}
        <TableCell width="5%">
          <select onChange={handleSelectChange} value={item.userType}>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </TableCell>
        <TableCell width="8%">
          <button onClick={handleDelete}>회원탈퇴</button>
        </TableCell>
      </TableRow>
    );
  });

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
            <FontAwesomeIcon icon={faUserGroup} style={{ color: '#47b781' }} />
            <span>회원 관리</span>
          </Title>
          <UserTable>
            <TableHead>
              <TableCell width="5%">회원명</TableCell>
              <TableCell width="8%">닉네임</TableCell>
              <TableCell width="15%">이메일</TableCell>
              <TableCell width="7%">전화번호</TableCell>
              <TableCell width="25%">주소</TableCell>
              {/* <TableCell width="24%">봉사내역</TableCell> */}
              <TableCell width="5%">관리자</TableCell>
              <TableCell width="8%">회원 탈퇴</TableCell>
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
  height: auto;
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
