import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGroup,
  faNoteSticky,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const AdminMain = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <BackGround>
        <Header />
        <AdminBox>
          <AdminUser onClick={() => navigate('/admin/user')}>
            <FontAwesomeIcon icon={faUserGroup} size="10x" />
            <Span>회원 관리</Span>
          </AdminUser>
          <AdminVolunteer onClick={() => navigate('/admin/volunteer')}>
            <FontAwesomeIcon icon={faNoteSticky} size="10x" />
            <Span>모집글 관리</Span>
          </AdminVolunteer>
          <AdminCommunity onClick={() => navigate('/admin/community')}>
            <FontAwesomeIcon icon={faUsers} size="10x" />
            <Span>커뮤니티 관리</Span>
          </AdminCommunity>
        </AdminBox>
      </BackGround>
    </div>
  );
};

const AdminBox = styled.div`
  width: 80%;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 4rem;
`;

const AdminUser = styled.div`
  color: #46b780;
  width: 230px;
  height: 230px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AdminVolunteer = styled(AdminUser)``;
const AdminCommunity = styled(AdminUser)``;

const Span = styled.span`
  margin-top: 50px;
  font-weight: 500;
  font-size: 30px;
  color: black;
`;

export default AdminMain;
