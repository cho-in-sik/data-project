import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import data from './Main/data/seoul.json';
import Map from './Main/Map';
import Header from '../Header/Header';
import GuList from './Main/GuList';

function RecruitmentMain() {
  const navigate = useNavigate();

  const __goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <Header />
      <MainWrapper>
        <MapWrapper>
          <div className="map">
            <div className="wrapper">
              <div className="map-container">
                <Map data={data} />
              </div>
            </div>
          </div>
        </MapWrapper>
        <GuListWrapper>
          <GuList />
        </GuListWrapper>
      </MainWrapper>
    </>
  );
}

export default RecruitmentMain;

const MainWrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
`;

const MapWrapper = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  z-index: 1;
  border-right: 1px solid #ccc;
  box-shadow: 0px 0px 10px #aaa;

  .map-icon:hover {
    opacity: 0.8;
  }
`;

const GuListWrapper = styled.div`
  overflow: auto;
  width: 30%;
  height: 100%;
  box-shadow: 0px 0px 10px #aaa;
  border: 1px solid #ccc;
  border-left: none;
`;
