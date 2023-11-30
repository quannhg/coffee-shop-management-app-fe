import { useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

import { useSidebarStore } from '@states';
import { SelectShop } from './selectShop';

export function EmployeeChartNavBar() {
  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-col'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl uppercase'>
          Thống kê
        </Typography>
        <Typography variant='paragraph' color='gray' className='font-medium sm:text-lg truncate'>
          Các biểu đồ thống kê dữ liệu
        </Typography>
      </div>
      <div className='w-[250px]'>
        <SelectShop />
      </div>
    </div>
  );
}
