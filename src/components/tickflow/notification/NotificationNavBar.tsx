import { useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

import { useSidebarStore } from '@states';

export function NotificationNavBar() {
  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-col'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl'>
          THÔNG BÁO
        </Typography>
        <Typography variant='paragraph' color='gray' className='font-medium sm:text-lg truncate'>
          Danh sách các bản mẫu thông báo
        </Typography>
      </div>
    </div>
  );
}
