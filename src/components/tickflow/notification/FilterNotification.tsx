import {
  Chip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography
} from '@material-tailwind/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import filter from '@assets/filter.svg';

export function FilterNotification() {
  return (
    <Popover placement='bottom-start'>
      <PopoverHandler>
        <Chip
          variant='ghost'
          color='teal'
          className='cursor-pointer hover:bg-teal-100 p-2'
          value={<FunnelIcon color='teal' className='w-6 h-6' />}
        />
      </PopoverHandler>
      <PopoverContent className='grid gap-2 w-76'>
        <Typography variant='h5' color='teal' className='font-bold'>
          Lọc thông báo
        </Typography>
        <div className='grid gap-2'>
          <Typography variant='h6' color='blue-gray'>
            Trạng thái
          </Typography>
          <div className='grid grid-cols-3 gap-2 justify-items-center'></div>
        </div>
        <div className='grid gap-2'>
          <Typography variant='h6' color='blue-gray'>
            Ngày bắt đầu
          </Typography>
        </div>
        <div className='flex items-center gap-2 p-1 w-fit cursor-pointer hover:bg-red-100 hover:rounded-full hover:border hover:border-red-200 active:border-red-300 active:bg-red-200'>
          <img src={filter} alt='Funnel Slash' />
          <span className='text-red-500 text-base font-medium'>Bỏ lựa chọn</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
