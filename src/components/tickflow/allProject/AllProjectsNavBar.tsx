import { useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import { useSidebarStore } from '@states';
import { SelectShop } from '@components/employee';

export function AllProjectsNavBar() {
  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex justify-between w-full'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl'>
          MÓN ĂN
        </Typography>
        <div className='w-[250px]'>
          <SelectShop />
        </div>
      </div>
    </div>
  );
}
