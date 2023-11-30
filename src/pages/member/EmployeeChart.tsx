import { useEffect, useRef } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart } from 'chart.js/auto';
import { faker } from '@faker-js/faker';
import { GENDERS } from '@constants';
import { capitalizeFirstCharacter } from '@utils';
import { EmployeeChartNavBar } from 'src/components/employee/EmployeeChartNavBar';
import { useChartStore, useSelectShopStore } from '@states';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function EmployeeChartPage() {
  const { getAgeDistribute, getGenderDistribute } = useChartStore();
  const { selectedShop } = useSelectShopStore();
  useEffect(() => {
    getAgeDistribute(selectedShop === 'all' ? '' : selectedShop.id);
    getGenderDistribute(selectedShop === 'all' ? '' : selectedShop.id);
  });
  const AgeDistributeChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

          const labels: number[] = [];

          for (let i = 0; i < 10; i++) {
            labels.push(faker.number.int({ min: 15, max: 35 }));
          }

          const data = {
            labels,
            datasets: [
              {
                label: capitalizeFirstCharacter(GENDERS[0]),
                data: labels.map(() => faker.number.int({ min: 1, max: 15 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
              },
              {
                label: capitalizeFirstCharacter(GENDERS[1]),
                data: labels.map(() => faker.number.int({ min: 1, max: 15 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
              }
            ]
          };

          new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Số lượng nhân viên theo độ tuổi'
                }
              },
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'Độ tuổi'
                  }
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'Số người'
                  }
                }
              }
            }
          });
        }
      }
    }, []);

    return <canvas ref={chartRef} />;
  };

  const GenderDistributeChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          Chart.register(PieController, Title, Tooltip, Legend);

          const labels = GENDERS;

          const data = {
            labels,
            datasets: [
              {
                data: labels.map(() => faker.number.int({ min: 1, max: 15 })),
                backgroundColor: ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)']
              }
            ]
          };

          new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'right'
                },
                title: {
                  display: true,
                  text: 'Phân phối nhân viên theo giới tính'
                }
              }
            }
          });
        }
      }
    }, []);

    return <canvas ref={chartRef} />;
  };

  return (
    <div>
      <>
        <Card className='h-full w-full drop-shadow-2xl p-4'>
          <CardBody className='gap-4 p-0 flex flex-col divide-y'>
            <div className='mb-2'>
              <EmployeeChartNavBar />
            </div>

            <div className='w-full'>
              <AgeDistributeChart />
            </div>
            <div style={{ height: 'calc(100vh - 2rem)' }} className='w-full flex justify-center'>
              <GenderDistributeChart />
            </div>
          </CardBody>
        </Card>
      </>
    </div>
  );
}
