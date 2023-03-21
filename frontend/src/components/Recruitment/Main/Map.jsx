import React, { useEffect, useRef, useState, useCallback } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import { scaleSequential } from 'd3-scale'; // 스케일 함수 생성
import { interpolateGreens } from 'd3-scale-chromatic'; // 색상 스케일
import { useDispatch, useSelector } from 'react-redux'; // 리덕스
import { Casualties } from './data/casualties'; // 사상자 수 데이터
import AboutMap from './AboutMap';
import { Wrapper, MapSvg } from './styles/MapStyle';
import Legend from './Legend';
//지도를 그리는 컴포넌트
function Map({ data }) {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.input); // 리덕스에서 input 상태 가져오기
  const [width, setWidth] = useState(0); // svg 너비
  const [height, setHeight] = useState(0); // svg 높이
  const svgRef = useRef(); // svg 참조
  const wrapperRef = useRef(); // svg를 감싸는 div 참조
  const [selectedGu, setSelectedGu] = useState(''); // 선택된 구 이름

  const colorScale = scaleSequential(interpolateGreens).domain([0, 300]); // 색상 스케일

  // svg를 감싸는 div의 너비와 높이를 가져와서 svg의 너비와 높이로 설정
  const handleGuClick = useCallback((event, value) => {
    setSelectedGu(value.properties.name); // 선택된 구 이름 설정

    const svg = select(svgRef.current); // svg 참조
    const labels = svg.selectAll('.labels'); // svg 안의 모든 text 참조
    labels
      // 선택된 구 이름은 흰색, 나머지는 회색으로 설정
      // 선택된 구 이름은 30px, 나머지는 15px로 설정
      .style('fill', (d) =>
        d.properties.name === value.properties.name ? 'white' : 'black',
      )
      .style('font-size', (d) =>
        d.properties.name === value.properties.name ? '30px' : '15px',
      )
      .transition() // 애니메이션
      .duration(500) // 0.5초
      .style(
        'font-size',
        (
          d, // 폰트 크기
        ) => (d.properties.name === value.properties.name ? '30px' : '15px'),
      );
  }, []);

  // svg를 감싸는 div의 너비와 높이를 가져와서 svg의 너비와 높이로 설정
  useEffect(() => {
    const svg = select(svgRef.current);

    const projection = geoMercator().fitSize([width, height], data); // 지도의 중심과 크기 설정
    const pathGenerator = geoPath().projection(projection); // 지도의 경로 설정

    const guPaths = svg // svg 안의 모든 path 참조
      .selectAll('.gu') // path 클래스 참조
      .data(data.features) // 데이터 설정
      .join('path') // path 추가
      .attr('class', 'gu') // 클래스 설정
      .attr('d', (feature) => pathGenerator(feature)) // 경로 설정
      .on('click', (event, value) => {
        // 클릭 이벤트
        dispatch({
          type: 'GU-CLICK',
          input: value.properties.name, // 클릭한 구 이름을 input 상태에 저장
        });
        handleGuClick(event, value); // 선택된 구 이름 설정
      });

    guPaths // path 색상 설정
      .transition() // 애니메이션
      .duration(500)
      .style('fill', (feature) => {
        const target = Casualties.find(
          // 사상자 수 데이터에서 선택된 구 이름을 찾음
          (item) => item.borough === feature.properties.name,
        );
        if (target) {
          // 선택된 구 이름이 있으면
          const casualties = target.casualties; // 사상자 수
          return colorScale(casualties);
        } else {
          return 'gray';
        }
      });

    const labels = svg // svg 안의 모든 text 참조
      .selectAll('.labels')
      .data(data.features)
      .join('text')
      .attr('class', 'labels')
      .attr('x', function (d) {
        // 텍스트 위치 설정
        return pathGenerator.centroid(d)[0];
      })
      .attr('y', function (d) {
        // 텍스트 위치 설정
        return pathGenerator.centroid(d)[1];
      })
      .text(function (d) {
        // 텍스트 설정
        return d.properties.name;
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .style('fill', (d) =>
        // 선택된 구 이름은 흰색, 나머지는 회색으로 설정
        d.properties.name === selectedGu ? 'white' : 'faintgray',
      )
      .style('font-size', (d) =>
        d.properties.name === selectedGu ? '30px' : '15px',
      );

    labels
      .filter((d) => d.properties.name === selectedGu)
      .transition()
      .duration(500)
      .style('font-size', '30px');

    labels
      .filter((d) => d.properties.name !== selectedGu)
      .transition()
      .duration(500)
      .style('font-size', '15px');
  }, [data, selectedGu, colorScale, handleGuClick, height, width, dispatch]);

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
    <>
      <AboutMap />
      <Legend colorScale={colorScale} />
      <Wrapper ref={wrapperRef}>
        <MapSvg
          ref={svgRef}
          width={width}
          height={height}
          className="seoul-map"
        />
      </Wrapper>
    </>
  );
}

export default Map;
