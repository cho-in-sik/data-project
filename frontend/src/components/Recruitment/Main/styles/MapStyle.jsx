import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 80%;
  position: relative;
  flex: 7;
  overflow: hidden;
  height: 100vh;
`;

export const MapSvg = styled.svg`
  display: block;
  max-width: 100%;
  max-height: 100%;
  opacity: 0.8;
  fill: #a59a9a;
  stroke: #dad8d8;
  stroke-width: 0.5px;
  cursor: pointer;

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
