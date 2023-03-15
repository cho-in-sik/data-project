import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const AdminUser = (props) => {
  const data = [
    {
      id: 1,
      author: '안정민',
      title: '000모임 늦지마세요~',
      createdAt: '2023-03-14 13:22:15',
    },
  ];
  const handleDelete = async () => {
    return;
    // const res = await axios.delete('http://localhost:3000/admin/', {
    //   data: { token },
    // });
    // console.log(res);
  };
  const list = data.map((item) => (
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
            <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} />
            <span>커뮤니티글 관리</span>
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
  border: 1px solid;
`;

const TableHead = styled.div`
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
`;

const TableCell = styled.span`
  width: ${(props) => props.width};
`;
export default AdminUser;
