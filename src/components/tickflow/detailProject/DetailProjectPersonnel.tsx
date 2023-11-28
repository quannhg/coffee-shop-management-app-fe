import { useState } from 'react';
import {
  Avatar,
  Card,
  CardBody,
  Popover,
  PopoverHandler,
  PopoverContent,
  Tooltip,
  Typography
} from '@material-tailwind/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { WorkingTimeLineChart } from '@components/tickflow';
import { PROJECT_PERSONNEl_STATUS } from '@constants';
import { usePersonnelProjectGeneralStore } from '@states';
import { useEditPersonnelBox } from './EditPersonnelBox';
import { useRemovePersonnelBox } from './RemovePersonnelBox';
import { usePersonnelBoxInfo } from './PersonnelBoxInfo';

export function DetailProjectPersonnel() {
  const { personnelList } = usePersonnelProjectGeneralStore();
  const { leader } = personnelList.metadata;

  const { openEditPersonnelBox, EditPersonnelBox } = useEditPersonnelBox();
  const { openRemovePersonnelBox, RemovePersonnelBox } = useRemovePersonnelBox();
  const { openPersonnelBoxInfo, PersonnelBoxInfo } = usePersonnelBoxInfo();

  const handlePersonnelStatus = (index: number) => {
    if (index === personnelList.data.length - 1) return 'stopped';
    else if (index === personnelList.data.length - 2) return 'quit';
    else if (index === personnelList.data.length - 3) return 'completed';
    else return 'working';
  };

  const [personnelBoxInfo, setPersonnelBoxInfo] = useState<PersonnelBoxInfo>({
    id: '',
    index: 0,
    name: '',
    role: 'Thành viên',
    description: '',
    avatarUrl: '',
    status: 'working'
  });

  return (
    <>
      <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-2 md:px-4 lg:p-1'>
        {personnelList.data.map((personnel, index) => (
          <div key={index} className='relative'>
            <Card
              className='mb-4 w-full cursor-pointer drop-shadow-md shadow-md hover:ring-4 hover:ring-gray-400 focus:ring-gray-400 lg:drop-shadow-none'
              onClick={() => {
                setPersonnelBoxInfo({
                  id: personnel.id,
                  index: index,
                  name: personnel.name,
                  role: personnel.role,
                  description: personnel.description,
                  avatarUrl: personnel.avatarUrl,
                  status: handlePersonnelStatus(index)
                });
                openPersonnelBoxInfo();
              }}
            >
              <CardBody className='grid gap-4'>
                <div className='flex items-center gap-2'>
                  <Avatar src={personnel.avatarUrl} alt='avatar' size='md' />
                  <div className='flex flex-col items-start'>
                    <Typography variant='h6'>{personnel.name}</Typography>
                    <Typography variant='small' color='gray' className='font-medium'>
                      <span>{personnel.role}</span>
                      <span
                        className={
                          'capitalize font-medium ' +
                          PROJECT_PERSONNEl_STATUS[handlePersonnelStatus(index)]
                        }
                      >
                        {' '}
                        - {handlePersonnelStatus(index)}
                      </span>
                    </Typography>
                  </div>
                </div>
                {index >= personnelList.data.length - 3 ? (
                  <div className='grid gap-1'>
                    <hr className='border-gray-300' />
                    <Typography variant='small' className='text-gray-500 font-normal'>
                      Jan 01, 2023 - Jan 01, 2024
                    </Typography>
                    <Typography variant='small' className='flex flex-col'>
                      <span className='font-semibold text-gray-700'>
                        {index === personnelList.data.length - 1 && 'Đánh giá công việc'}
                        {index === personnelList.data.length - 2 && 'Lý do rời dự án'}
                        {index === personnelList.data.length - 3 && 'Đánh giá hoàn thành'}
                      </span>
                      <span className='font-normal text-gray-600'>
                        Aut quidem quos voluptates inventore voluptatum reiciendis molestias. Harum
                        minus expedita doloribus aliquid at. Adipisci similique harum recusandae
                        voluptates enim sapiente repellendus eum.
                      </span>
                    </Typography>
                  </div>
                ) : (
                  <div className='grid grid-cols-3'>
                    <div className='flex flex-col gap-1'>
                      <div>
                        <Typography variant='paragraph' color='blue-gray' className='font-medium'>
                          Thời lượng trung bình
                        </Typography>
                        <Typography variant='small' className='font-normal text-gray-500'>
                          (1 tháng gần đây)
                        </Typography>
                      </div>
                      <Typography variant='lead'>
                        <span className='font-bold'>50 giờ</span>
                        <span className='text-lg font-normal text-gray-500'>/tuần</span>
                      </Typography>
                    </div>
                    <div className='col-span-2'>
                      <WorkingTimeLineChart />
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
            <Popover placement='bottom-end'>
              <PopoverHandler>
                <EllipsisHorizontalIcon
                  strokeWidth={2}
                  className='absolute top-12 right-4 w-6 h-6 transform -translate-y-1/2 hover:bg-gray-300 rounded-full cursor-pointer'
                />
              </PopoverHandler>
              <PopoverContent className='z-50 drop-shadow-2xl'>
                <div className='grid gap-2'>
                  <div>
                    <div
                      className='flex gap-2 items-center justify-item-center p-1 rounded-md cursor-pointer hover:bg-gray-200'
                      onClick={openEditPersonnelBox}
                    >
                      <PencilIcon strokeWidth={2} className='w-5 h-5' />
                      <Typography variant='paragraph' className='font-medium'>
                        Chỉnh sửa thông tin
                      </Typography>
                    </div>
                    <EditPersonnelBox personnel={personnel} />
                  </div>
                  {personnel.role === 'Trưởng nhóm' && leader === 1 ? (
                    <Tooltip
                      placement='bottom-start'
                      className='bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3'
                      content={
                        <div className='w-72 divide-y divide-gray-400'>
                          <Typography variant='paragraph' color='blue-gray' className='font-medium'>
                            Bắt buộc có tối thiểu 1 Trưởng nhóm
                          </Typography>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-80'
                          >
                            Chuyển nhân sự khác thành Trưởng nhóm trước khi muốn xóa Trưởng nhóm
                            này.
                          </Typography>
                        </div>
                      }
                    >
                      <div className='flex items-center justify-between p-1 bg-gray-200 rounded-md cursor-not-allowed'>
                        <div className='flex gap-2 items-center justify-item-center'>
                          <TrashIcon strokeWidth={2} className='w-5 h-5' />
                          <Typography variant='paragraph' className='font-medium'>
                            Xóa nhân sự
                          </Typography>
                        </div>
                        <InformationCircleIcon strokeWidth={2} className='w-5 h-5' />
                      </div>
                    </Tooltip>
                  ) : (
                    <div>
                      <div
                        className='flex gap-2 items-center justify-item-center text-red-500 p-1 rounded-md cursor-pointer hover:bg-red-100'
                        onClick={openRemovePersonnelBox}
                      >
                        <TrashIcon strokeWidth={2} className='w-5 h-5' />
                        <Typography variant='paragraph' className='font-medium'>
                          Xóa nhân sự
                        </Typography>
                      </div>
                      <RemovePersonnelBox
                        personnelId={personnel.id}
                        personnelName={personnel.name}
                      />
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
      <PersonnelBoxInfo personnelBoxInfo={personnelBoxInfo} />
    </>
  );
}
