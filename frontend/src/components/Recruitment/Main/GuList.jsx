import React, { useState } from 'react';
import { Casualties } from './data/casualties';
import {
  GuListWrapper,
  GuListTitle,
  GuListSearchInput,
  GuListSortButtonsWrapper,
  GuListSortButton,
  GuListContent,
  GuListItemButton,
} from './styles/GuListStyle';
import { useNavigate } from 'react-router-dom';

const GuList = ({ searchTerm, handleSearchTermChange }) => {
  const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서
  const navigate = useNavigate();

  const handleSortButtonClick = (order) => () => {
    setSortOrder(order);
  }; // 정렬 버튼 클릭 시 정렬 순서 변경

  // 정렬된 구 리스트
  const sortedBoroughs = Casualties.slice().sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.casualties - a.casualties; // 사고 많은 순
    } else if (sortOrder === 'asc') {
      return a.casualties - b.casualties; // 사고 적은 순
    } else {
      return a.borough.localeCompare(b.borough, 'ko-KR', {
        sensitivity: 'base',
        caseFirst: 'upper',
      }); // 이름순
    }
  });

  // 검색어에 해당하는 구 리스트
  const filteredBoroughs = sortedBoroughs.filter(
    (casualty) =>
      casualty.borough.toLowerCase().includes(searchTerm.toLowerCase()), // 검색어에 해당하는 구만 필터링
  );

  return (
    <GuListWrapper>
      <GuListTitle>봉사 지역 선택</GuListTitle>
      <GuListSearchInput
        type="text"
        placeholder="봉사할 지역 검색하기 예) 강남구"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />
      <GuListSortButtonsWrapper>
        <GuListSortButton
          onClick={handleSortButtonClick('desc')}
          className={sortOrder === 'desc' ? 'selected' : ''}
        >
          사고 많은 순
        </GuListSortButton>
        <GuListSortButton
          onClick={handleSortButtonClick('asc')}
          className={sortOrder === 'asc' ? 'selected' : ''}
        >
          사고 적은 순
        </GuListSortButton>
        <GuListSortButton
          onClick={handleSortButtonClick('name')}
          className={sortOrder === 'name' ? 'selected' : ''}
        >
          이름순
        </GuListSortButton>
      </GuListSortButtonsWrapper>
      <GuListContent>
        {filteredBoroughs.map((casualty) => (
          <GuListItemButton
            key={casualty.borough} // key prop 추가
            onClick={() =>
              navigate(`/recruitment/${casualty.id}`, {
                state: casualty.borough,
              })
            } // onClick 이벤트 함수 변경
          >
            {casualty.borough}
            <div>{casualty.casualties}명</div>
          </GuListItemButton>
        ))}
      </GuListContent>
    </GuListWrapper>
  );
};

export default GuList;
