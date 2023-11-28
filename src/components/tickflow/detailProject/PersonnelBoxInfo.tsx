import { useState } from 'react';
import {
  Avatar,
  Card,
  Chip,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography
} from '@material-tailwind/react';
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PROJECT_PERSONNEl_STATUS } from '@constants';
import { WorkingTimeProgressBar } from '@components/tickflow';

export function usePersonnelBoxInfo() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => setOpenForm(!openForm);

  const PersonnelBoxInfo: Component<{ personnelBoxInfo: PersonnelBoxInfo }> = ({
    personnelBoxInfo
  }) => (
    <Dialog open={openForm} handler={handleOpenForm} size='xxl'>
      <DialogHeader className='flex items-center justify-between shadow-md'>
        <Typography variant='h5' color='gray'>
          {personnelBoxInfo.name}
        </Typography>
        <div
          className='bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-gray-500 cursor-pointer'
          onClick={() => setOpenForm(false)}
        >
          <XMarkIcon strokeWidth={2} className='w-4 h-4' />
        </div>
      </DialogHeader>
      <DialogBody className='grid gap-12'>
        <Card className='w-full drop-shadow-md shadow-md'>
          <CardBody className='grid gap-2'>
            <div className='flex items-center gap-2'>
              <Avatar src={personnelBoxInfo.avatarUrl} alt='avatar' size='md' />
              <div className='flex flex-col items-start w-full'>
                <div className='flex w-full items-center justify-between'>
                  <Typography variant='h6'>{personnelBoxInfo.name}</Typography>
                  <Chip
                    value={
                      <div className='flex items-center gap-1'>
                        <span className='normal-case'>Nhân sự</span>
                        <ArrowTopRightOnSquareIcon strokeWidth={2} className='w-4 h-4' />
                      </div>
                    }
                    variant='ghost'
                    className='text-blue-500 bg-blue-100 bg-opacity-20 rounded-md'
                  />
                </div>
                <Typography variant='small' color='gray' className='font-medium'>
                  {personnelBoxInfo.role}
                  <span
                    className={
                      'capitalize font-medium ' + PROJECT_PERSONNEl_STATUS[personnelBoxInfo.status]
                    }
                  >
                    {' '}
                    - {personnelBoxInfo.status}
                  </span>
                </Typography>
              </div>
            </div>
            <Typography variant='small' className='text-gray-700 font-normal'>
              Some description about this person role in the project.
            </Typography>
            <hr className='border-gray-300 border-1' />
            <Typography variant='small'>
              <span className='text-gray-700 font-semibold'>Thời gian hoạt động: </span>
              <span className='text-gray-700 font-normal'>Jan 01, 2023 - hiện tại</span>
            </Typography>
          </CardBody>
        </Card>
        <Typography variant='h5' color='blue-gray'>
          Thời lượng trong dự án
        </Typography>
        <Card className='shadow-md drop-shadow-md'>
          <CardBody>
            <div className='flex items-center gap-2'>
              <Typography variant='small' className='text-gray-500 font-semibold whitespace-nowrap'>
                Tuần này:
              </Typography>
              <div className='w-full'>
                <WorkingTimeProgressBar hours={64} />
              </div>
              <Chip value='64h' />
            </div>
          </CardBody>
        </Card>
      </DialogBody>
    </Dialog>
  );

  return {
    openPersonnelBoxInfo: () => setOpenForm(true),
    PersonnelBoxInfo: PersonnelBoxInfo
  };
}
