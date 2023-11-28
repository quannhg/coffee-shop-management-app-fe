import moment from 'moment';
import { Avatar, Button, Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useProjectDetailStore } from '@states';
import { statusColor } from '@utils';
import { useEditProjectBox, useRemoveProjectBox } from '@components/tickflow';

export function DetailProjectInfo() {
  const { projectDetail } = useProjectDetailStore();
  const { openEditProjectBox, CreateEditProjectBox } = useEditProjectBox();
  const { openRemoveProjectBox, CreateRemoveProjectBox } = useRemoveProjectBox();

  return (
    <Card className='lg:h-screen shadow-none lg:drop-shadow-lg lg:p-3 lg:overflow-y-auto'>
      <CardBody className='grid gap-2 p-0 sm:items-center sm:justify-items-center'>
        <div className='flex items-end -space-x-12 lg:justify-center'>
          <Avatar src={projectDetail.avatarUrl} alt='avatar' size='xxl' />
          <Chip
            variant='filled'
            value={projectDetail.status}
            color={statusColor[projectDetail.status]}
          />
        </div>
        <Typography variant='h4' className='text-black'>
          {projectDetail.name}
        </Typography>
        <div className='w-56'>
          <Typography variant='paragraph' className='grid grid-cols-2 items-center font-medium'>
            <span>Bắt đầu:</span>
            <span>
              {moment.unix(projectDetail.startDate).locale('en-gb').format('MMM DD, YYYY')}
            </span>
          </Typography>
          <Typography variant='paragraph' className='grid grid-cols-2 items-center font-medium'>
            <span>Kết thúc:</span>
            <span>
              {projectDetail.endDate === 0
                ? '--'
                : moment.unix(projectDetail.endDate).locale('en-gb').format('MMM DD, YYYY')}
            </span>
          </Typography>
        </div>
        <div className='grid gap-2'>
          <div>
            <Typography variant='h6' className='text-black'>
              Loại sản phẩm
            </Typography>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 gap-1 bg-gray-100 p-4 lg:p-1 rounded-xl'>
              {projectDetail.productType.map((type, index) => (
                <Chip
                  key={index}
                  size='sm'
                  variant='outlined'
                  className='w-fit rounded-full capitalize border-gray-500 text-gray-600'
                  value={type}
                />
              ))}
            </div>
          </div>
          <div>
            <Typography variant='h6' className='text-black'>
              Mô tả dự án
            </Typography>
            <Typography
              variant='paragraph'
              className='font-semibold bg-gray-100 p-4 lg:p-1 rounded-xl'
            >
              {projectDetail.description}
            </Typography>
          </div>
        </div>
        <div className='flex lg:grid lg:gap-1 items-center justify-between sm:gap-40 md:justify-center'>
          <Button
            variant='outlined'
            color='red'
            className='flex items-center gap-2 hover:bg-red-100 lg:order-last'
            onClick={openRemoveProjectBox}
          >
            Xóa dự án
            <TrashIcon strokeWidth={2} className='w-5 h-5' />
          </Button>
          <Button
            variant='filled'
            color='teal'
            className='flex items-center gap-2'
            onClick={openEditProjectBox}
          >
            Chỉnh sửa
            <PencilIcon strokeWidth={2} className='w-5 h-5' />
          </Button>
        </div>
        <CreateRemoveProjectBox />
        <CreateEditProjectBox />
      </CardBody>
    </Card>
  );
}
