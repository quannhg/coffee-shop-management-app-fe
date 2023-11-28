import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { CreatePersonnel } from './CreatePersonnel';
import { CreateMaterial } from './CreateMaterial';
import { PROJECT_DETAIL_MOBILE_TAB } from '@constants';
import { useProjectDetailStore, useSidebarStore } from '@states';
import { useEffect } from 'react';

export function DetailProjectNavBar() {
  const navigate: NavigateFunction = useNavigate();
  const { statusDetail, projectDetail, mobileTabView } = useProjectDetailStore();
  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(false);
  }, [setToggleSidebarBtn]);

  return (
    <div className='grid grid-cols-10 items-center w-full'>
      <ChevronLeftIcon
        strokeWidth={3}
        className='w-8 h-8 cursor-pointer'
        onClick={() => {
          navigate('/project');
        }}
      />
      <div className='col-span-8 sm:col-span-7'>
        <Typography
          variant='paragraph'
          color='gray'
          className='font-medium sm:text-lg truncate text-center'
        >
          {statusDetail === 'SUCCESS' && projectDetail.name}
        </Typography>
      </div>
      <div className='place-self-end sm:col-span-2'>
        {mobileTabView === PROJECT_DETAIL_MOBILE_TAB[1] && <CreatePersonnel />}
        {mobileTabView === PROJECT_DETAIL_MOBILE_TAB[2] && <CreateMaterial />}
      </div>
    </div>
  );
}
