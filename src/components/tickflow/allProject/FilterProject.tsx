import {
  Button,
  Chip,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Typography
} from '@material-tailwind/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { PROJECT_STATUS, PROJECT_TIME } from '@constants';
import { useFilterProjectStore, useProjectGeneralStore } from '@states';
import filter from '@assets/filter.svg';

export function FilterProject() {
  const { status, timeInterval, selectStatus, selectTimeInterval, removeStatus } =
    useFilterProjectStore();
  const { setActivePage, setInputPage } = useProjectGeneralStore();

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
          Lọc dự án
        </Typography>
        <div className='grid gap-2'>
          <Typography variant='h6' color='blue-gray'>
            Trạng thái
          </Typography>
          <div className='grid grid-cols-3 gap-2 justify-items-center'>
            {PROJECT_STATUS.map((item, index) => (
              <Button
                key={index}
                tabIndex={-1}
                variant='outlined'
                size='sm'
                color='teal'
                className={
                  'rounded-full focus:ring-0 hover:bg-teal-50' +
                  (status.includes(item) ? ' bg-teal-100' : '')
                }
                onClick={() => {
                  selectStatus(item);
                  setActivePage(1);
                  setInputPage('1');
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className='grid gap-2'>
          <Typography variant='h6' color='blue-gray'>
            Ngày bắt đầu
          </Typography>
          <Select
            label='Trong vòng...'
            value={timeInterval !== PROJECT_TIME[0] ? timeInterval : ''}
            onChange={(value) => {
              if (value) {
                selectTimeInterval(value);
                setActivePage(1);
                setInputPage('1');
              }
            }}
          >
            {PROJECT_TIME.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div
          className='flex items-center gap-2 p-1 w-fit cursor-pointer hover:bg-red-100 hover:rounded-full hover:border hover:border-red-200 active:border-red-300 active:bg-red-200'
          onClick={() => {
            removeStatus();
            selectTimeInterval(PROJECT_TIME[0]);
            setActivePage(1);
            setInputPage('1');
          }}
        >
          <img src={filter} alt='Funnel Slash' />
          <span className='text-red-500 text-base font-medium'>Bỏ lựa chọn</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
