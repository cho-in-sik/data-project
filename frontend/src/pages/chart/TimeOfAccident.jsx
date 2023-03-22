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
  '06시-08시',
  '08시-10시',
  '10시-12시',
  '12시-14시',
  '14시-16시',
  '16시-18시',
  '18시-20시',
  '20시-22시',
];
const mortality = [504, 514, 572, 566, 560, 496, 608, 536];
const wound = [29306, 55268, 59318, 68466, 72968, 79872, 82916, 57370];

const TimeOfAccident = () => {
  const options = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '시간대 별 사상자 수',
      },
      tooltip: {
        // 툴팁 스타일
        padding: 8,
        backgroundColor: '#47B781',
      },
    },
    //부모 엘리먼트 크기에 맞춰 차트가 반응형이 될지 말지 여부
    responsive: false,
    scales: {
      x: {
        min: 20000,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10,
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
        label: '사망자+부상자',
        data: mortality.map((v, i) => v + wound[i]),
        backgroundColor: '#9dd573',
        borderRadius: 5,
      },
    ],
  };
  return <Bar options={options} data={data} height={250} width={250} />;
};

export default TimeOfAccident;
