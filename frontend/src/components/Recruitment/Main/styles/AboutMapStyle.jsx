import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  padding-top: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 40px;
  text-align: center;
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export const LegendTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const LegendGradient = styled.div`
  height: 20px;
  width: 80%;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    ${(props) => props.colorScale(props.colorScale.domain()[0])},
    ${(props) => props.colorScale(props.colorScale.domain()[1])}
  );
  margin-bottom: 10px;
`;

export const LegendLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

export const Label = styled.div`
  font-size: 14px;
  color: #777;
`;
