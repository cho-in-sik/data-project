import styled from 'styled-components';

export const Background = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

export const CommunityDetailWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 70%;
  height: 70%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 40px;
`;

export const CommunityDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
`;

export const CommunityDetailTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const CommunityDetailAuthor = styled.p`
  font-size: 16px;
`;

export const CommunityDetailImage = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
`;

export const CommunityDetailContent = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const CommunityDetailCommentTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const CommunityDetailDivider = styled.hr`
  border: 1px solid #ccc;
  margin: 20px 0;
`;

export const CommunityDetailComments = styled.div`
  display: flex;
  flex-direction: column;
`;
