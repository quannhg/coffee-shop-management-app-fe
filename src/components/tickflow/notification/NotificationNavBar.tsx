import { useState, useMemo, useEffect } from 'react';
import {
  Chip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography
} from '@material-tailwind/react';
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { FilterNotification } from './FilterNotification';
import { SearchNotification } from './SearchNotification';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useSidebarStore } from '@states';

export function NotificationNavBar() {
  const { screenSize } = useScreenSize();

  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  const [toggle, setToggle] = useState<boolean>(false);

  const CreateNotification = useMemo(
    () => () => {
      return (
        <>
          <Chip
            value={
              <div className='flex items-center' /*onClick={openCreateNotificationBox}*/>
                <PlusCircleIcon className='w-6 h-6' />
                {screenSize > ScreenSize.MOBILE && <span>Thêm bản mẫu</span>}
              </div>
            }
            color='teal'
            className='cursor-pointer hover:bg-teal-700 p-2'
          />
          {/* <CreateNotificationBox /> */}
        </>
      );
    },
    [screenSize]
  );

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-col'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl'>
          THÔNG BÁO
        </Typography>
        <Typography variant='paragraph' color='gray' className='font-medium sm:text-lg truncate'>
          Danh sách các bản mẫu thông báo
        </Typography>
      </div>
      {screenSize <= ScreenSize.MD ? (
        <Popover>
          <PopoverHandler onClick={() => setToggle(!toggle)}>
            <ChevronDownIcon
              strokeWidth={4}
              className={`w-4 h-4 cursor-pointer ${toggle ? 'rotate-180' : ''}`}
            />
          </PopoverHandler>
          <PopoverContent className='mt-8 w-full z-50'>
            <div className='flex items-center gap-4 sm:px-8'>
              <SearchNotification />
              <FilterNotification />
              <CreateNotification />
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-end'>
            <CreateNotification />
          </div>
          <div className='flex gap-2 items-center'>
            <SearchNotification />
            <FilterNotification />
          </div>
        </div>
      )}
    </div>
  );
}
