import React, { useState } from 'react';
import styled from 'styled-components';
import data from './Main/data/seoul.json';
import Map from './Main/Map';
import Header from '../Header/Header';
import GuList from './Main/GuList';
import AboutMap from './Main/AboutMap';

// RecruitmentMain 컴포넌트
function RecruitmentMain() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [selectedGu, setSelectedGu] = useState(''); // 선택된 구

  const handleBoroughClick = (borough) => {
    setSelectedGu(borough);
    setSearchTerm(borough);
  }; // 구 클릭 시 해당 구로 검색어 변경

  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  }; // 검색어 변경 시 검색어 변경

  return (
    <>
      <Header />
      <MainWrapper>
        <MapWrapper>
          <AboutMapWrapper>
            <AboutMap />
          </AboutMapWrapper>
          <Map data={data} handleBoroughClick={handleBoroughClick} />
        </MapWrapper>
        <GuListWrapper>
          <GuList
            searchTerm={searchTerm}
            selectedGu={selectedGu}
            handleSearchTermChange={handleSearchTermChange}
          />
        </GuListWrapper>
      </MainWrapper>
    </>
  );
}

export default RecruitmentMain;

const MainWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const MapWrapper = styled.div`
  position: relative;
  flex: 7;
  overflow: hidden;
  height: 100vh;
`;

const AboutMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 300px;
  z-index: 1;
`;

const GuListWrapper = styled.div`
  flex: 3;
  overflow: auto;
`;
