import { Drawer, Typography } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useEditMaterialBox } from './CreateEditMaterialBox';
import { useConfirmRemoveBox } from '@components/common';
import { useGeneralProjectMaterialsStore } from '@states';

export const useMaterialMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { openEditMaterialBox, EditMaterialBox } = useEditMaterialBox();

  const [materialName, setMaterialName] = useState('');

  const [materialDescription, setMaterialDescription] = useState('');

  const { removeMaterial } = useGeneralProjectMaterialsStore();

  const handleRemoveMaterial = async () => {
    await removeMaterial(materialName);
  };

  const { openConfirmRemoveBox, ConfirmRemoveBox } = useConfirmRemoveBox(handleRemoveMaterial);

  return {
    openMaterialMenu: (materialName: string, materialDescription: string) => {
      handleOpen();
      setMaterialName(materialName);
      setMaterialDescription(materialDescription);
    },
    MaterialMenu: () => (
      <div>
        <Drawer
          open={open}
          onClose={handleOpen}
          placement='bottom'
          overlayProps={{ className: 'fixed inset-0 z-[9999]' }}
          size={160}
          className='p-0 pt-4 rounded-t-lg'
        >
          <div
            className='flex gap-2 items-center text-blue-gray-600 py-3 px-4 cursor-pointer hover:bg-blue-gray-500/20'
            onClick={() => {
              openEditMaterialBox(materialName, materialDescription);
              handleOpen();
            }}
          >
            <PencilIcon className='w-5 h-5' />
            <Typography className='text-lg font-medium '>Chỉnh sửa danh mục</Typography>
          </div>
          <div
            className='flex gap-2 items-center text-red-500 py-3 px-4 cursor-pointer hover:bg-blue-gray-500/20'
            onClick={() => {
              openConfirmRemoveBox();
              handleOpen();
            }}
          >
            <TrashIcon className='w-5 h-5' />
            <Typography className='text-lg font-medium'>Xóa danh mục</Typography>
          </div>
        </Drawer>
        <EditMaterialBox />
        {ConfirmRemoveBox('Xóa danh mục', materialName)}
      </div>
    )
  };
};
