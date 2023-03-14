import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import BackGround from '../../components/Background/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshakeAngle,
  faUser,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const MyPage = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <BackGround>
        <Header />
        <MypageBox>
          <MyVolunteer onClick={() => navigate('/myvolunteers')}>
            <FontAwesomeIcon icon={faHandshakeAngle} size="10x" />
            <Span>봉사 관리</Span>
          </MyVolunteer>
          <MyInfo onClick={() => navigate('/userinfo')}>
            <FontAwesomeIcon icon={faUser} size="10x" />
            <Span>개인정보관리</Span>
          </MyInfo>
          <Withdraw onClick={() => navigate('/userdelete')}>
            <FontAwesomeIcon icon={faTrashCan} size="10x" />
            <Span>회원 탈퇴</Span>
          </Withdraw>
        </MypageBox>
      </BackGround>
    </div>
  );
};

const MypageBox = styled.div`
  margin-top: 80px;
  width: 80%;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const MyVolunteer = styled.div`
  color: #46b780;
  width: 230px;
  height: 230px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MyInfo = styled(MyVolunteer)``;
const Withdraw = styled(MyVolunteer)``;

const Span = styled.span`
  margin-top: 50px;
  font-weight: 500;
  font-size: 30px;
  color: black;
`;

export default MyPage;
