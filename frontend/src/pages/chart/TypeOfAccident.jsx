import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const labels = [
  '기타/불명',
  '가장자리통행중',
  '보도통행중',
  '차도통행중',
  '횡단중',
];
const mortality = [333, 33, 21, 146, 445];
const TypeOfAccident = () => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '사고 유형별 사망자 수',
      },
      tooltip: {
        // 툴팁 스타일
        padding: 8,
        backgroundColor: '#47B781',
      },
    },
    //부모 엘리먼트 크기에 맞춰 차트가 반응형이 될지 말지 여부
    responsive: false,
    //x,y 축 스타일링 가능
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: '사고유형',
          color: '#5b6669',
          font: {
            size: 14,
            family: 'Sebang',
          },
        },
        ticks: {
          font: {
            size: 10,

            weight: 500,
          },
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: '사망자수(명)',
          color: '#5b6669',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: '사망자 수',

        data: mortality,
        backgroundColor: [
          '#848a7e',
          '#9dd573',
          '#9dd573',
          '#9dd573',
          '#369431',
        ],
        borderRadius: 5,
      },
    ],
  };
  return <Bar options={options} data={data} width={400} height={400} />;
};

export default TypeOfAccident;
