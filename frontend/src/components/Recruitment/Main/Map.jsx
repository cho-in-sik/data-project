import React, { useEffect, useRef, useState } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import { scaleSequential } from 'd3-scale'; // 연속적인 값을 입력받아 연속적인 값을 출력하는 스케일 생성
import { interpolateYlGn } from 'd3-scale-chromatic'; // 연속적인 색상을 생성하는 함수
import { useSelector } from 'react-redux';
import { Casualties } from './data/casualties'; // 데이터
import { Wrapper, MapSvg } from './styles/MapStyle';

function Map({ data, handleBoroughClick }) {
  const input = useSelector((state) => state.input);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [width, setWidth] = useState(0); // svg 너비
  const [height, setHeight] = useState(0); // svg 높이
  const [selectedGu, setSelectedGu] = useState(''); // 선택된 구

  const colorScale = scaleSequential(interpolateYlGn).domain([0, 300]); // 연속적인 색상을 생성하는 함수

  useEffect(() => {
    const svg = select(svgRef.current);

    const projection = geoMercator().fitSize([width, height], data); // 지도의 중심을 설정
    const pathGenerator = geoPath().projection(projection); // 지도의 경로를 설정

    const guPaths = svg
      .selectAll('.gu') // svg 안에 있는 gu 클래스를 가진 요소를 선택
      .data(data.features)
      .join('path')
      .attr('class', 'gu')
      .attr('d', (feature) => pathGenerator(feature)) // 경로를 설정
      .on('click', (event, feature) => {
        setSelectedGu(feature.properties.name); // 선택된 구 변경
        handleBoroughClick(feature.properties.name); // 구 클릭 시 해당 구로 검색어 변경
      });

    guPaths // 선택된 구의 색상 변경
      .transition()
      .duration(500)
      .style('fill', (feature) => {
        const target = Casualties.find(
          (item) => item.borough === feature.properties.name,
        ); // 선택된 구의 데이터를 찾음
        return target ? colorScale(target.casualties) : 'gray';
      }); // 선택된 구의 데이터가 없으면 회색으로 표시

    const labels = svg // svg 안에 있는 labels 클래스를 가진 요소를 선택
      .selectAll('.labels')
      .data(data.features)
      .join('text')
      .attr('class', 'labels')
      .attr('x', (d) => pathGenerator.centroid(d)[0]) // 경로의 중심을 설정
      .attr('y', (d) => pathGenerator.centroid(d)[1]) // 경로의 중심을 설정
      .text((d) => d.properties.name)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .style('fill', (d) =>
        d.properties.name === selectedGu ? 'white' : 'black',
      ) // 선택된 구의 글자 색상 변경
      .style('font-size', (d) =>
        d.properties.name === selectedGu ? '28px' : '15px',
      ) // 선택된 구의 글자 크기 변경
      .style('font-weight', (d) =>
        d.properties.name === selectedGu ? '900' : '800',
      ); // 선택된 구의 글자 굵기 변경
  }, [data, selectedGu, colorScale, height, width, handleBoroughClick]);
  // data, selectedGu, colorScale, height, width, handleBoroughClick가 변경될 때마다 실행

  useEffect(() => {
    const handleResize = () => {
      setWidth(wrapperRef.current.clientWidth); // svg 너비 설정
      setHeight(wrapperRef.current.clientHeight); // svg 높이 설정
    };
    handleResize(); // 처음에 한번 실행
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 등록
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <MapSvg
        ref={svgRef} // svg 요소를 참조
        width={width} // svg 너비
        height={height} // svg 높이
        className="seoul-map"
      />
    </Wrapper>
  );
}

export default Map;
