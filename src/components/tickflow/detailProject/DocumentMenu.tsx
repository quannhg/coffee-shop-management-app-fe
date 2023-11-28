import { Drawer, Typography } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useConfirmRemoveBox } from '@components/common';
import { useDetailProjectMaterialsStore } from '@states';
import { useEditDocumentBox } from './CreateEditDocument';

export const useDocumentMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { openEditDocumentBox, EditDocumentBox } = useEditDocumentBox();

  const [documentName, setDocumentName] = useState('');

  const { removeDocument } = useDetailProjectMaterialsStore();

  const { documents } = useDetailProjectMaterialsStore().material;

  const [documentIndex, setDocumentIndex] = useState<number>(0);

  const handleRemoveDocument = async () => {
    await removeDocument(documents[documentIndex].id);
  };

  const { openConfirmRemoveBox, ConfirmRemoveBox } = useConfirmRemoveBox(handleRemoveDocument);

  return {
    openDocumentMenu: (index: number) => {
      handleOpen();
      setDocumentIndex(index);
      setDocumentName(documents[index].name);
    },
    DocumentMenu: () => (
      <div>
        <Drawer
          open={open}
          onClose={handleOpen}
          placement='bottom'
          overlayProps={{ className: 'fixed inset-0 z-[9999] bg-gray-900/60' }}
          size={160}
          className='p-0 pt-4 rounded-t-lg'
        >
          <div
            className='flex gap-2 items-center text-blue-gray-600 py-3 px-4 cursor-pointer hover:bg-blue-gray-500/20'
            onClick={() => {
              openEditDocumentBox(documentIndex);
              handleOpen();
            }}
          >
            <PencilIcon className='w-5 h-5' />
            <Typography className='text-lg font-medium '>Chỉnh sửa tài liệu</Typography>
          </div>
          <div
            className='flex gap-2 items-center text-red-500 py-3 px-4 cursor-pointer hover:bg-blue-gray-500/20'
            onClick={() => {
              openConfirmRemoveBox();
              handleOpen();
            }}
          >
            <TrashIcon className='w-5 h-5' />
            <Typography className='text-lg font-medium'>Xóa tài liệu</Typography>
          </div>
        </Drawer>
        <EditDocumentBox />
        {ConfirmRemoveBox('Xóa tài liệu', documentName)}
      </div>
    )
  };
};
