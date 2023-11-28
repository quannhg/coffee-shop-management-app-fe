import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export function WorkingTimeInProjectLineChart() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        fill: true,
        data: [50, 80, 70, 90],
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 4,
        backgroundColor: 'rgba(63, 131, 248, 0.1)',
        tension: 0.3
      }
    ]
  };

  return <Line options={options} data={data} redraw={true} />;
}
