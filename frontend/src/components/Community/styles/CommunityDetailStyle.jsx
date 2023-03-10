import styled from 'styled-components';

export const CommunityDetailWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 20px;
`;

export const CommunityDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
