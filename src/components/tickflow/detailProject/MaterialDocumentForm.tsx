import { useState } from 'react';
import {
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  List,
  ListItem,
  Typography
} from '@material-tailwind/react';
import {
  EllipsisHorizontalIcon,
  LinkIcon,
  PlusCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useCreateDocumentBox } from './CreateEditDocument';
import { useDocumentMenu } from './DocumentMenu';

export function useMaterialDocumentForm() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => setOpenForm(!openForm);

  const AddDocumentButton = () => {
    const { openAddDocumentBox, AddDocumentBox } = useCreateDocumentBox();

    return (
      <div>
        <div className='flex justify-end mr-4' onClick={openAddDocumentBox}>
          <Chip
            value={
              <div className='flex items-center'>
                <PlusCircleIcon className='w-6 h-6' />
                <span className='normal-case text-base'>Thêm tài liệu</span>
              </div>
            }
            color='teal'
            className='cursor-pointer hover:bg-teal-700 p-2 w-fit'
          />
        </div>
        <AddDocumentBox />
      </div>
    );
  };

  const MaterialDocumentForm: Component<{ documentInfo: DocumentInfo }> = ({ documentInfo }) => {
    const { openDocumentMenu, DocumentMenu } = useDocumentMenu();

    return (
      <div>
        <Dialog open={openForm} handler={handleOpenForm} size='xxl' className='bg-gray-100'>
          <DialogHeader className='flex items-center justify-between shadow-md bg-white'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <Chip
                  variant='ghost'
                  className='rounded-full bg-blue-50 p-2'
                  value={<span className='text-blue-400'>{documentInfo.icon}</span>}
                />
                <Typography variant='h5' color='gray'>
                  {documentInfo.name}
                  {documentInfo.index < 3 ? <span className='text-red-500'>*</span> : null}
                </Typography>
              </div>
              <Typography variant='small' color='gray' className='font-normal'>
                {documentInfo.description}
              </Typography>
            </div>
            <div
              className='bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-gray-500 cursor-pointer'
              onClick={() => setOpenForm(false)}
            >
              <XMarkIcon strokeWidth={2} className='w-4 h-4' />
            </div>
          </DialogHeader>
          <DialogBody className='px-0 h-screen overflow-y-auto'>
            <AddDocumentButton />
            {documentInfo.content.new.length === 0 && documentInfo.content.old.length === 0 ? (
              <Typography
                variant='small'
                color='gray'
                className='flex flex-col text-center mt-10 font-normal'
              >
                <span>Đây là danh mục tài liệu bắt buộc.</span>
                <span>Vui lòng bổ sung tài liệu.</span>
              </Typography>
            ) : (
              <div className='grid gap-5'>
                {documentInfo.content.new.length > 0 && (
                  <div>
                    <Typography variant='h6' color='gray' className='ml-4'>
                      Mới nhất
                    </Typography>
                    <List className='px-0'>
                      {documentInfo.content.new.map((data, index) => {
                        const handleDocumentMenu = () => {
                          openDocumentMenu(index);
                        };
                        return (
                          <div key={index} className='flex relative'>
                            <ListItem
                              key={index}
                              className='flex items-start justify-between !bg-white rounded-none'
                            >
                              <div className='flex gap-2'>
                                <LinkIcon strokeWidth={2} className='w-5 h-5 text-blue-500' />
                                <div className='flex flex-col'>
                                  <Typography variant='h6' color='blue'>
                                    {data.name}
                                  </Typography>
                                  <Typography variant='small' color='gray' className='font-normal'>
                                    {data.lastUpdate}
                                  </Typography>
                                </div>
                              </div>
                              <div className='flex items-center mr-10'>
                                <Chip
                                  variant='ghost'
                                  className='rounded-full bg-blue-50'
                                  value={
                                    <span className='text-blue-400 normal-case font-normal'>
                                      {data.version}
                                    </span>
                                  }
                                />
                              </div>
                              <EllipsisHorizontalIcon
                                strokeWidth={2}
                                className='w-6 h-6 text-gray-500 absolute right-4 top-6 transform -translate-y-1/2 cursor-pointer'
                                onClick={handleDocumentMenu}
                              />
                            </ListItem>
                          </div>
                        );
                      })}
                    </List>
                  </div>
                )}
                {documentInfo.content.old.length > 0 && (
                  <div>
                    <Typography variant='h6' color='gray' className='ml-4'>
                      Phiên bản cũ
                    </Typography>
                    <List className='px-0'>
                      {documentInfo.content.old.map((data, index) => {
                        const handleDocumentMenu = () => {
                          openDocumentMenu(index);
                        };
                        return (
                          <div key={index} className='flex relative'>
                            <ListItem
                              key={index}
                              className='flex items-start justify-between !bg-white rounded-none'
                            >
                              <div className='flex gap-2'>
                                <LinkIcon strokeWidth={2} className='w-5 h-5 text-blue-500' />
                                <div className='flex flex-col'>
                                  <Typography variant='h6' color='blue'>
                                    {data.name}
                                  </Typography>
                                  <Typography variant='small' color='gray' className='font-normal'>
                                    {data.lastUpdate}
                                  </Typography>
                                </div>
                              </div>
                              <div className='flex items-center mr-10'>
                                <Chip
                                  variant='ghost'
                                  className='rounded-full bg-blue-50'
                                  value={
                                    <span className='text-blue-400 normal-case font-normal'>
                                      {data.version}
                                    </span>
                                  }
                                />
                              </div>
                              <EllipsisHorizontalIcon
                                strokeWidth={2}
                                className='w-6 h-6 text-gray-500 absolute right-4 top-6 transform -translate-y-1/2 cursor-pointer'
                                onClick={handleDocumentMenu}
                              />
                            </ListItem>
                          </div>
                        );
                      })}
                    </List>
                  </div>
                )}
              </div>
            )}
          </DialogBody>
          <DocumentMenu />
        </Dialog>
      </div>
    );
  };

  return {
    openMaterialDocumentForm: () => setOpenForm(true),
    MaterialDocumentForm: MaterialDocumentForm
  };
}
