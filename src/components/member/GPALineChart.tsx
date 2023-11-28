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
import { memberService } from '@services';

type Standard = Awaited<ReturnType<typeof memberService.getStandard>>;
type ExtractGPA<T> = T extends { type: 'GPA'; data: infer Q } ? Q : never;
type GPAs = ExtractGPA<Standard>;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export const GPALineChart: Component<{ gpas: GPAs }> = ({ gpas }) => {
  const options: ChartOptions<'line'> = {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      x: {
        labels: gpas.map((gpa) => gpa.semester)
      },
      y: {
        labels: ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0'],
        min: 0.0,
        max: 4.0,
        grid: {
          color: 'rgba(243, 244, 246, 1)'
        },
        ticks: {
          color: 'rgb(148 163 184)'
        }
      }
    }
  };

  const data = {
    datasets: [
      {
        fill: true,
        label: 'Điểm TBHK',
        data: gpas.map((gpa) => gpa.gpa),
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
        backgroundColor: 'rgba(63, 131, 248, 0.1)',
        tension: 0.3
      }
    ]
  };

  return <Line options={options} data={data} />;
};
