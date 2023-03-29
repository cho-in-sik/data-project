import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GuListWrapper = styled.div`
  margin-top: 20px;
`;

export const GuListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

export const GuListContent = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-left: 10px;
`;

export const GuListItemButton = styled.button`
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background-color: white;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #aaa;
  transition: all 0.3s ease-in-out;

  width: 95%;
  &:hover {
    background-color: #47b781;
    width: 50%;
    color: white;
    cursor: pointer;
  }
`;

export const GuListSortButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

export const GuListSortButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border: none;
  border-radius: 5px;

  &.selected {
    background-color: #47b781;
    color: white;
  }

  &:hover {
    background-color: #47b781;
    color: white;
  }
`;

export const GuLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

export const GuListSearchInput = styled.input`
  margin: 10px;
  padding: 10px;
  width: 90%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
`;
