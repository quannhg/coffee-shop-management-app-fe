import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DoughnutLabel } from '@utils';
import { memberService } from '@services';

type Standard = Awaited<ReturnType<typeof memberService.getStandard>>;
type ExtractProjects<T> = T extends { type: 'PROJECT'; projects: infer Q } ? Q : never;
type Projects = ExtractProjects<Standard>;

const ChartColors: Record<keyof Projects, string> = {
  PROPOSING: '#CBCBCB',
  IN_PROGRESS: '#FFC300',
  COMPLETED: 'rgba(14, 159, 110, 1)',
  CANCELLED: '#FF5733'
};

ChartJS.register(ArcElement, Legend, DoughnutLabel);

export const ProjectDoughnutChart: Component<{
  projects: Projects;
}> = ({ projects }) => {
  const data = useMemo(() => {
    const keys = Object.keys(projects).sort();
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColor: string[] = [];
    for (const k of keys) {
      const value = projects[k as keyof typeof projects];
      const displayKey = k
        .split('_')
        .map((word) => word[0] + word.slice(1).toLowerCase())
        .join(' ');
      labels.push(`${value} ${displayKey}`);
      values.push(value);
      backgroundColor.push(ChartColors[k as keyof typeof ChartColors]);
    }
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor,
          borderWidth: 1
        }
      ]
    };
  }, [projects]);

  const numOfProjects = useMemo(() => {
    const keys = Object.keys(projects);
    let sum = 0;
    for (const k of keys) {
      sum += projects[k as keyof typeof projects];
    }
    return sum;
  }, [projects]);

  return (
    <Doughnut
      data={data}
      redraw={true}
      options={{
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          doughnutLabel: {
            labels: [
              {
                text: `${numOfProjects}`,
                color: 'black',
                font: {
                  size: 20,
                  family: 'Inter, sans-serif',
                  weight: 'bold'
                }
              },
              {
                text: 'Projects',
                color: 'grey',
                font: {
                  size: 16,
                  family: 'Inter, sans-serif'
                }
              }
            ]
          },
          legend: {
            position: 'right',
            labels: {
              padding: 15,
              usePointStyle: true,
              color: 'rgba(55, 65, 81, 1)'
            }
          }
        }
      }}
    />
  );
};
