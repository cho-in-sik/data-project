import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Casualties } from './data/casualties';
import styled from 'styled-components';

const GuList = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSortButtonClick = (order) => () => {
    setSortOrder(order);
  };

  const sortedBoroughs = Casualties.slice().sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.casualties - a.casualties;
    } else if (sortOrder === 'asc') {
      return a.casualties - b.casualties;
    } else {
      return a.borough.localeCompare(b.borough, 'ko-KR', {
        sensitivity: 'base',
        caseFirst: 'upper',
      });
    }
  });

  const filteredBoroughs = sortedBoroughs.filter((casualty) =>
    casualty.borough.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <GuListWrapper>
      <GuListTitle>봉사 지역 선택</GuListTitle>
      <GuListSearchInput
        type="text"
        placeholder="봉사할 지역 검색하기 예)강남구"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          <GuListItem key={casualty.borough}>
            <GuLink
              to={`/recruitment/${casualty.borough}`}
              style={{ color: '#707070', textDecoration: 'none' }}
            >
              {casualty.borough}
            </GuLink>
            <div>{casualty.casualties}명</div>
          </GuListItem>
        ))}
      </GuListContent>
    </GuListWrapper>
  );
};

export default GuList;

const GuListWrapper = styled.div`
  margin-top: 20px;
`;

const GuListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const GuListContent = styled.ul`
  list-style: none;
  padding: 0;
`;

const GuListItem = styled.li`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #aaa;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const GuListSortButtonsWrapper = styled.div`
  display: flex;
  margin: 10px;
`;

const GuListSortButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: none;
  border-radius: 5px;

  &.selected {
    background-color: #47b781;
    color: #fff;
  }

  &:hover {
    background-color: #47b781;
  }
`;

const GuLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const GuListSearchInput = styled.input`
  margin: 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
