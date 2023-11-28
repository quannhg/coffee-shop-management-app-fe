import { Chip } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useCreateMaterialBox } from './CreateEditMaterialBox';

export function CreateMaterial() {
  const { screenSize } = useScreenSize();
  const { openCreateMaterialBox, CreateMaterialBox } = useCreateMaterialBox();

  return (
    <div>
      <Chip
        value={
          <div className='flex items-center' onClick={openCreateMaterialBox}>
            <PlusCircleIcon className='w-6 h-6' />
            {screenSize > ScreenSize.MOBILE && <span>Tạo danh mục</span>}
          </div>
        }
        color='teal'
        className='cursor-pointer hover:bg-teal-700 p-2'
      />
      <CreateMaterialBox />
    </div>
  );
}
