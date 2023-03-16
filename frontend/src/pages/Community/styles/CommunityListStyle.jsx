import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Background = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

export const Container = styled.div`
  margin-top: 10px;
  width: 90%;
  height: 90%;
  border-radius: 20px;
  background-color: white;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h1`
  color: #47b781;
  font-size: 2.5rem;
  margin: 20px 30px;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 97%;
  display: flex;
  justify-content: flex-end;
`;

export const CreateButton = styled(Link)`
  background-color: #47b781;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    background-color: #269c5d;
  }
`;

export const Table = styled.table`
  margin-top: 30px;
  margin-left: 30px;
  width: 95%;
  border-collapse: separate;
  background-color: #f9f9f9;

  th,
  td {
    border: 1px solid #ddd;
    padding: 15px;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    width: 50%;
  }

  th:first-child,
  td:first-child {
    width: 60%;
  }

  th {
    background-color: #f2f2f2;
    text-align: center;
  }

  td {
    background-color: #fff;
    text-align: left;
  }

  td:nth-child(2) {
    text-align: center;
  }

  tr:first-child td {
    border-top: none;
  }
`;

export const LinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #47b781;
    text-decoration: none;
  }
`;

export const Empty = styled.td`
  font-size: 1.2rem;
  color: #999;
  text-align: center;
  margin-top: 50px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
