import React from 'react';
import {
  Wrapper,
  Title,
  Description,
  LegendWrapper,
  LegendGradient,
  LegendTitle,
  LegendLabels,
  Label,
} from './styles/AboutMapStyle';
import { scaleSequential } from 'd3-scale'; // 연속적인 값을 입력받아 연속적인 값을 출력하는 스케일 생성
import { interpolateYlGn } from 'd3-scale-chromatic'; // 연속적인 색상을 생성하는 함수

const AboutMap = () => {
  const colorScale = scaleSequential(interpolateYlGn).domain([0, 300]);
  // 연속적인 색상을 생성하는 함수

  return (
    <Wrapper>
      <Title>20세 이하 교통사고 사상자수 지도</Title>
      <Description>
        각 구별로 사상자수가 높을수록 색의 농도가 진해집니다.
        <br />
        봉사를 통해 자신이 사는 지역의 사상자 수를 줄여보세요!
      </Description>
      <LegendWrapper>
        <LegendTitle>사상자 수(명)</LegendTitle>
        <LegendGradient colorScale={colorScale} />
        <LegendLabels>
          <Label>0</Label>
          <Label>150</Label>
          <Label>300</Label>
        </LegendLabels>
      </LegendWrapper>
    </Wrapper>
  );
};

export default AboutMap;
