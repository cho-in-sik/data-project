import React from 'react';
import styled from 'styled-components';
import { scaleSequential } from 'd3-scale'; // 스케일 함수 생성
import { interpolateGreens } from 'd3-scale-chromatic'; // 색상 스케일

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #aaa;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Gradient = styled.div`
  height: 20px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    ${(props) => props.colorScale(props.colorScale.domain()[0])},
    ${(props) => props.colorScale(props.colorScale.domain()[1])}
  );
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000;
`;

const Legend = () => {
  const colorScale = scaleSequential(interpolateGreens).domain([0, 300]); // 색상 스케일

  return (
    <Wrapper>
      <Title>사상자수</Title>
      <Gradient colorScale={colorScale} />
      <Labels>
        <div>0</div>
        <div>150</div>
        <div>300</div>
      </Labels>
    </Wrapper>
  );
};

export default Legend;
