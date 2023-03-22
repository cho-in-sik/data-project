import React, { useEffect, useRef, useState } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import { scaleSequential } from 'd3-scale'; // 스케일 함수를 생성하는 함수
import {
  // interpolateBlues,
  interpolateGreens,
  // interpolateRainbow,
  // interpolateReds,
} from 'd3-scale-chromatic'; // 색상을 생성하는 함수
import { useDispatch, useSelector } from 'react-redux'; // 상태를 가져오기 위해 사용
import { Casualties } from './data/casualties';
// Casualties(사상자수) 데이터를 가져옴
// import axios from 'axios';
import styled from 'styled-components';

// 지도를 그리는 컴포넌트
function Map({ data }) {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.input); // input 상태를 가져옴
  const [width, setWidth] = useState(0); // svg의 너비를 저장할 상태
  const [height, setHeight] = useState(0); // svg의 높이를 저장할 상태
  const svgRef = useRef(); // svg 요소를 참조할 ref
  const wrapperRef = useRef(); // svg를 감싸는 div 요소를 참조할 ref

  //스케일 함수를 생성하여 구별 사상자수에 따라 색상을 지정
  const colorScale = scaleSequential(interpolateGreens).domain([0, 300]);

  useEffect(() => {
    // svg 요소의 너비와 높이를 구함
    const svg = select(svgRef.current);

    // 지도 데이터를 불러와서 경계선을 그리는 코드
    const projection = geoMercator().fitSize([width, height], data); // 지도의 중심과 크기를 설정
    const pathGenerator = geoPath().projection(projection); // 지도의 경계선을 그리는 함수

    // svg 요소에 구별 경계선을 그림
    svg
      .selectAll('.gu')
      .data(data.features)
      .join('path')
      .attr('class', 'gu')
      .attr('d', (feature) => pathGenerator(feature)) // 경계선을 그림
      .style('fill', (feature) => {
        const target = Casualties.find(
          (item) => item.borough === feature.properties.name, // 구별 이름을 찾음
        );
        if (target) {
          const casualties = target.casualties;
          return colorScale(casualties); // 구별 사상자수에 따라 색상을 지정
        } else {
          return 'gray'; // 데이터가 없는 구는 회색으로 표시
        }
      })
      .on('click', (event, value) => {
        // 구를 클릭하면 GU-CLICK 액션을 디스패치
        dispatch({
          type: 'GU-CLICK', // 액션의 타입
          input: value.properties.name, // 액션의 데이터
        });
        console.log(value.properties.name);
      });

    // svg 요소에 구별 이름을 표시
    svg
      .selectAll('.labels')
      .data(data.features)
      .join('text')
      .attr('class', 'labels')
      .attr('x', function (d) {
        return pathGenerator.centroid(d)[0]; // 경계선의 중심 좌표를 반환
      })
      .attr('y', function (d) {
        return pathGenerator.centroid(d)[1]; // 경계선의 중심 좌표를 반환
      })
      .text(function (d) {
        return d.properties.name; // 구별 이름을 반환
      })
      .attr('text-anchor', 'middle') // 텍스트의 중심을 경계선의 중심으로 설정
      .attr('alignment-baseline', 'central') // 텍스트의 중심을 경계선의 중심으로 설정
      .style('fill', 'white'); // 텍스트의 색상을 흰색으로 설정
    // 텍스트의 색상을 흰색으로 설정
  }, [colorScale, data, dispatch, height, input, width]); // input 상태가 변경되면 useEffect 함수가 다시 실행됨

  // div 요소의 크기를 상태로 관리
  useEffect(() => {
    const handleResize = () => {
      setWidth(wrapperRef.current.clientWidth); // div 요소의 너비를 상태로 관리
      setHeight(wrapperRef.current.clientHeight); // div 요소의 높이를 상태로 관리
    };
    handleResize(); // 처음에 한 번 실행
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트가 발생하면 handleResize 함수를 실행
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트가 언마운트되면 이벤트 리스너를 제거
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <MapSvg
        ref={svgRef}
        width={width}
        height={height}
        className="seoul-map"
      />
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.div`
  width: 50rem;
  height: 40rem;
`;

const MapSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  fill: #a59a9a;
  stroke: #dad8d8;
  stroke-width: 0.5px;

  .gu:hover {
    stroke: white;
    stroke-width: 2px;
    fill: #807a7a;
    cursor: pointer;
  }

  .labels {
    pointer-events: none;
    font-size: 15px;
  }
`;
