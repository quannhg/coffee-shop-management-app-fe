import { Chip } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCreatePersonnelBox } from '@components/tickflow';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export function CreatePersonnel() {
  const { screenSize } = useScreenSize();
  const { openCreatePersonnelBox, CreatePersonnelBox } = useCreatePersonnelBox();

  return (
    <>
      <Chip
        value={
          <div className='flex items-center' onClick={openCreatePersonnelBox}>
            <PlusCircleIcon className='w-6 h-6' />
            {screenSize > ScreenSize.MOBILE && <span>Thêm nhân sự</span>}
          </div>
        }
        color='teal'
        className='cursor-pointer hover:bg-teal-700 p-2'
      />
      <CreatePersonnelBox />
    </>
  );
}
