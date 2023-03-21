import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 800px;
`;

export const MapSvg = styled.svg`
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
