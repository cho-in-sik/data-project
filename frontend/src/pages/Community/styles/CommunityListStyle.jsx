import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

export const WriteButton = styled(Link)`
  position: absolute;
  padding: 10px 20px;
  background-color: #47b781;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
`;

export const DetailLink = styled(Link)`
  display: block;
  font-size: 20px;
  color: black;
  text-decoration: none;
`;
export const CommunityListTable = styled.div`
  display: table;
  margin-top: 20px;
  width: 100%;
`;

export const CommunityListTableHeader = styled.div`
  display: table-row;
  background-color: #f5f5f5;
`;

export const CommunityListTableHeaderTitle = styled.div`
  display: table-cell;
  padding: 10px;
  font-weight: bold;
  width: 70%;
`;

export const CommunityListTableHeaderAuthor = styled.div`
  display: table-cell;
  padding: 10px;
  font-weight: bold;
  width: 30%;
`;

export const CommunityListTableBody = styled.div`
  display: table-row-group;
`;

export const CommunityListTableRow = styled.div`
  display: table-row;
`;

export const CommunityListTableTitle = styled.div`
  display: table-cell;
  padding: 10px;
  width: 70%;
`;

export const CommunityListTableAuthor = styled.div`
  display: table-cell;
  padding: 10px;
  width: 30%;
`;
