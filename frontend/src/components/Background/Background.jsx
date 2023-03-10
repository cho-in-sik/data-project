import styled from 'styled-components';
import background1 from '../../assets/images/background.png';

const BackGround = styled.div`
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  ::before {
    content: '';
    background-image: url(${background1});
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;

export default BackGround;
