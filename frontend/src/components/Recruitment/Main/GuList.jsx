import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Casualties } from './data/casualties';
import styled from 'styled-components';

const GuList = () => {
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSortButtonClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedBoroughs = Casualties.sort((a, b) => {
    if (sortOrder === 'desc') {
      return (
        b.casualties - a.casualties ||
        a.borough.localeCompare(b.borough, 'ko-KR', {
          sensitivity: 'base',
          caseFirst: 'upper',
        })
      );
    } else {
      return (
        a.casualties - b.casualties ||
        b.borough.localeCompare(a.borough, 'ko-KR', {
          sensitivity: 'base',
          caseFirst: 'upper',
        })
      );
    }
  });

  return (
    <GuListWrapper>
      <GuListTitle>지역 선택</GuListTitle>
      <div>
        <GuListSortButton onClick={handleSortButtonClick}>
          {sortOrder === 'desc' ? '사고 많은 순' : '사고 적은 순'}
        </GuListSortButton>
      </div>
      <GuListContent>
        {sortedBoroughs.map((casualty) => (
          <GuListItem key={casualty.borough}>
            <Link to={`/recruitment/${casualty.borough}`}>
              {casualty.borough}
            </Link>
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

const GuListSortButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
