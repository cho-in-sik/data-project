import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieMortality = () => {
  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: '20세 이하 교통사고 사망자 수',
      },

      tooltip: {
        padding: 8,
        backgroundColor: 'black',
      },
      datalabels: {
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        padding: 10,
        color: '#47B781',
        textAlign: 'center',
        formatter: (value, ctx) => {
          let index = ctx.dataIndex;
          let label = ctx.chart.data.labels[index];
          return label + '\n' + value + '%';
        },
      },
    },
  };
  const data = {
    labels: ['교통사고 사망자', '교통사고 제외 사망자'],
    datasets: [
      {
        label: '사망자 비율(%)',
        data: [9.9, 90.1],
        backgroundColor: ['#369431', '#9dd573'],
        hoverBackgroundColor: ['#1f551d', '#597941'],
        borderWidth: 0.5,
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={options}
      width={400}
      height={400}
      plugins={[ChartDataLabels]}
    />
  );
};

export default PieMortality;
