import React from 'react';
import styled from 'styled-components';

const AboutMap = () => {
  return (
    <Wrapper>
      <Title>서울시 구별 20세 이하 교통사고 사상자수 지도</Title>
      <Description>
        각 구별로 사상자수가 높을수록 색의 농도가 진해집니다. <br /> 구 이름을
        클릭하면 해당 구의 자세한 정보를 볼 수 있습니다.
      </Description>
    </Wrapper>
  );
};

export default AboutMap;

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #aaa;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;
