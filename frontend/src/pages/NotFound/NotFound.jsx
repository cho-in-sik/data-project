import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';

const AdminMain = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <BackGround>
        <Header />
        <AdminBox>유효한 페이지가 아닙니다.</AdminBox>
      </BackGround>
    </div>
  );
};

const AdminBox = styled.div`
  width: 80%;
  font-size: 3rem;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 5rem;
`;

export default AdminMain;
