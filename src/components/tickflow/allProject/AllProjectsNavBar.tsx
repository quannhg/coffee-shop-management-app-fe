import { useEffect } from 'react';
import {
  Chip,
  Typography
} from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCreateProjectBox } from './CreateProjectBox';
import { useSidebarStore } from '@states';

export function AllProjectsNavBar() {
  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-col'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl'>
          MÓN ĂN
        </Typography>
        <Typography variant='paragraph' color='gray' className='font-medium sm:text-lg truncate'>
          Danh sách các món ăn tại cửa hàng của bạn
        </Typography>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-end'>
          <CreateSustenance />
        </div>
        <div className='flex justify-end'>
          <AddSustenanceToShop/>
        </div>
      </div>
    </div>
  );
}

const CreateSustenance = () => {
  const { openCreateProjectBox, CreateProjectBox } = useCreateProjectBox();

  return (
    <>
      <Chip
        value={
          <div className='flex items-center gap-1' onClick={openCreateProjectBox}>
            <span>Tạo món</span>
          </div>
        }
        color='teal'
        className='cursor-pointer hover:bg-teal-700 p-2'
      />
      <CreateProjectBox />
    </>
  );
};

const AddSustenanceToShop = () => {
  const { openCreateProjectBox, CreateProjectBox } = useCreateProjectBox();

  return (
    <>
      <Chip
        value={
          <div className='flex items-center gap-1' onClick={openCreateProjectBox}>
            <PlusCircleIcon className='w-6 h-6' />
            <span>Thêm món vào quán</span>
          </div>
        }
        color='teal'
        className='cursor-pointer hover:bg-teal-700 p-2'
      />
      <CreateProjectBox />
    </>
  );
};
