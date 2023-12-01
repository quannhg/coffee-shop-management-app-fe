import { useEffect } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { GENDERS } from '@constants';
import { capitalizeFirstCharacter } from '@utils';
import { EmployeeChartNavBar } from 'src/components/employee/EmployeeChartNavBar';
import { useChartStore, useSelectShopStore } from '@states';

const AgeDistributeChart = () => {
  // const { ageDistribute, getAgeDistribute } = useChartStore();
  const { selectedShop } = useSelectShopStore();

  const { ageDistribute, getAgeDistribute } = useChartStore();

  useEffect(() => {
    getAgeDistribute(selectedShop === 'all' ? 'all' : selectedShop.id);
  }, [getAgeDistribute, selectedShop]);

  const data = {
    labels: ageDistribute.age,
    datasets: [
      {
        label: capitalizeFirstCharacter(GENDERS[0]),
        data: ageDistribute.amount.male,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: capitalizeFirstCharacter(GENDERS[1]),
        data: ageDistribute.amount.female,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Số lượng nhân viên theo độ tuổi'
      }
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
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
  };

  return <Bar options={options} data={data} />;
};

const GenderDistributeChart = () => {
  const { selectedShop } = useSelectShopStore();

  const { genderDistribute, getGenderDistribute } = useChartStore();

  useEffect(() => {
    getGenderDistribute(selectedShop === 'all' ? 'all' : selectedShop.id);
  }, [getGenderDistribute, selectedShop]);

  const data = {
    labels: genderDistribute.gender,
    datasets: [
      {
        data: genderDistribute.amount,
        backgroundColor: ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)']
      }
    ]
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    plugins: {
      legend: {
        position: 'right' as const
      },
      title: {
        display: true,
        text: 'Phân phối nhân viên theo giới tính'
      }
    },
    responsive: true
  };
  return <Pie options={options} data={data} />;
};

export function EmployeeChartPage() {
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
              <GenderDistributeChart />{' '}
            </div>
          </CardBody>
        </Card>
      </>
    </div>
  );
}
