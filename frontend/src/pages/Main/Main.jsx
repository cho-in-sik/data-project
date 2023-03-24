import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import mainImg from '../../assets/images/mainpage1.png';
import mainImg2 from '../../assets/images/mainpage2.jpg';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import TypeOfAccident from '../chart/TypeOfAccident';
import PieMortality from '../chart/PieMortality';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faArrowUp,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const navigate = useNavigate();
  const handleUp = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <Header />
      <Section1>
        <Fade bottom>
          <img src={mainImg} alt="mainimg" />
        </Fade>
        <FontAwesomeIcon className="sun" icon={faSun} size="10x" />

        <span>
          <FontAwesomeIcon icon={faSeedling} className="sprout" />
          자라나는 청소년을 지키는 파릇파릇
        </span>
        <div>당신이 함께해주세요</div>
        <Button onClick={() => navigate('/recruitment/main')}>
          봉사신청 하러가기
        </Button>
      </Section1>

      <Section2>
        <Fade bottom>
          <div>청소년을 위해 다가가야 할 시간입니다!</div>
          <div>
            <p>나라를 이끌어갈 소중한 청소년들의 모습</p>
            <p>
              녹색 어머니 회에서 시작된 영향이 우리 모두에게 퍼져나가는 모습
            </p>
            <p style={{ fontSize: '24px', fontWeight: '800' }}>
              파릇파릇은 청소년들의 교통 안전을 위한 교통 봉사 모임을 중개해주는
              서비스입니다.
            </p>
          </div>
        </Fade>
      </Section2>

      <Section3>
        <Fade left>
          <PieMortality />
        </Fade>
        <div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#3fa369',
              marginBottom: '10%',
            }}
          >
            20세 이하 교통사고 사망자 수
          </div>

          <div style={{ color: '#215220' }}>
            20세 이하 사망원인 무려 3위, 교통사고
          </div>
          <div style={{ color: '#215220' }}>
            청소년 10명 중 1명이 교통사고로 허무하게 목숨을 잃고 있습니다.
          </div>
          <div style={{ color: '#215220' }}>
            이는 자살(43.7%), 암(14.2%)을 제외하면 가장 큰 수치입니다.
          </div>
          <div style={{ fontSize: '14px', color: '#a1a1a1' }}>
            출처: 경찰청,「경찰접수교통사고현황」, 2021.03.24, 연령층별 사상자
          </div>
        </div>
      </Section3>

      <Section4>
        <TypeOfAccident />
        <Fade bottom>
          <div style={{ marginLeft: '10%' }}>
            <div style={{ marginTop: '7%' }}>
              <h3>사고 유형 별 사망자 수</h3>
            </div>
            <div className="div">
              대부분의 교통사고는 보행자가 차도를 통행 중이거나 횡단 중일때
              발생합니다.
            </div>
            <div className="div">
              교통지도 봉사로 우리는 많은 교통사고를 막을 가능성을 만들 수
              있습니다.
            </div>
            <div className="div">
              당신의 작은 한 걸음이 더 많은 새싹들을 구합니다.
            </div>
          </div>
        </Fade>
      </Section4>

      <Section5>
        <Fade bottom>
          <span>
            관심이 필요한 교통의 사각지대에서 한 명의 청소년이라도 더 지킬 수
            있는 교통 봉사,
          </span>

          <span>지금 시작해볼까요?</span>
        </Fade>

        <Zoom>
          <Button onClick={() => navigate('/recruitment/main')}>
            봉사신청 하러가기
          </Button>
        </Zoom>
        <UpButton onClick={handleUp}>
          <FontAwesomeIcon icon={faArrowUp} size="3x" />
        </UpButton>
      </Section5>
      <Footer>@파릇파릇</Footer>
    </div>
  );
};

const Section1 = styled.section`
  height: 100vh;
  width: 100%;
  .sun {
    color: yellow;
    position: absolute;
    left: 20px;
    top: 100px;
    animation: zoom 1s infinite alternate;
  }
  .sprout {
    margin-right: 5px;
    font-size: larger;
  }

  img {
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0.6;
  }
  span {
    color: #5ab248;
    font-size: 42px;
    font-weight: 700;
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
  }
  div {
    color: #5ab248;
    font-size: 36px;
    font-weight: 700;
    position: absolute;
    top: 34%;
    left: 50%;
    transform: translateX(-50%);
  }
  button {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translateX(-50%);
    :hover {
    }
  }
  @keyframes zoom {
    0% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1.3);
    }
  }
`;
const Section2 = styled.section`
  margin-top: 200px;
  margin-bottom: 300px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 200px;
    font-size: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #47b781;
    font-weight: 700;
  }

  div p {
    margin-bottom: 4%;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Section3 = styled.section`
  background-color: #2ccc6427;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 250px;
  div {
    margin-left: 0%;
  }
  div div {
    font-size: 20px;
    margin-top: 4%;
  }
`;
const Section4 = styled.section`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-content: center;
  margin-bottom: 250px;
  h3 {
    font-size: 24px;
    margin-bottom: 10%;
    color: #3fa369;
    font-weight: 800;
  }
  .div {
    font-size: 20px;
    margin-bottom: 3%;
    color: #215220;
  }
`;
const Button = styled.button`
  cursor: pointer;
  padding: 10px 35px;
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 20px;
  background-color: #47b781;
`;

const Section5 = styled.section`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #2ccc6427;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  span {
    color: #47b781;
    font-size: 24px;
    font-weight: 600;
  }
`;
const UpButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 20px;
  border: none;
  border-radius: 50%;
  color: #47b781;
  background-color: #e3f7e8;
  cursor: pointer;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #47b781;
`;

export default Main;
