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

export function WorkingTimeLineChart() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        labels: ['0', '16', '32', '48', '64', '80'],
        min: 0,
        max: 80,
        grid: {
          color: 'rgba(243, 244, 246, 1)'
        },
        ticks: {
          stepSize: 16,
          color: 'rgb(148 163 184)'
        }
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
        data: [32, 64, 56, 72],
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 4,
        backgroundColor: 'rgba(63, 131, 248, 0.1)',
        tension: 0.3
      }
    ]
  };

  return <Line options={options} data={data} redraw={true} />;
}
