import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminUser = (props) => {
  const navigate = useNavigate();
  const data = [
    {
      id: '1',
      name: '안정민',
      email: 'ajm@ajm.com',
      password: '1234',
      address: '서울시 서울구',
      phoneNumber: '01012341234',
      nickname: '안정',
      profileImage: '',
      volHistory: [{ title: '서울초1' }, { title: '서울초2' }],
      userType: 'admin',
    },
    {
      id: '2',
      name: '김정민',
      email: 'kjm@kjm.com',
      password: '1234',
      address: '서울시 서울구',
      phoneNumber: '01012341234',
      nickname: '김정',
      volHistory: [{ title: '서울초1' }, { title: '서울초2' }],
      profileImage: '',
      userType: 'user',
    },
  ];
  const handleDelete = async () => {
    return;
    /* const res = await axios.delete('http://localhost:3000/admin/users/:id', {
      data: { token },
    });
    console.log(res); */
  };
  const list = data.map((item) => (
    <TableRow key={item.id}>
      <TableCell width="5%">{item.name}</TableCell>
      <TableCell width="8%">{item.nickname}</TableCell>
      <TableCell width="15%">{item.email}</TableCell>
      <TableCell width="7%">{item.phoneNumber}</TableCell>
      <TableCell width="25%">{item.address}</TableCell>
      <TableCell width="24%">
        {item.volHistory[0].title} 등 {item.volHistory.length}건
      </TableCell>
      <TableCell width="5%">
        <select>
          <option value="user">일반회원</option>
          <option value="admin">관리자</option>
          {/* <option value={item.userType} key={item.userType}>
            {item.userType === 'admin' ? '관리자' : '일반회원'}
          </option> */}
        </select>
      </TableCell>
      <TableCell width="8%">
        <button onClick={handleDelete}>회원탈퇴</button>
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
              <TableCell width="24%">봉사내역</TableCell>
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
