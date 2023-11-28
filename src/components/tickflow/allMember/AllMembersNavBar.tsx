import { useEffect, useRef, useState } from 'react';
import {
  Chip,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography
} from '@material-tailwind/react';
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useCreateMemberBox } from './CreateMemberBox';
import { FilterMember } from './FilterMember';
import { SearchMember } from './SearchMember';
import { useSidebarStore } from '@states';

export function AllMembersNavBar() {
  const { screenSize } = useScreenSize();
  const isResetLeaderName = useRef<boolean>(true);

  const { setToggleSidebarBtn } = useSidebarStore();

  useEffect(() => {
    setToggleSidebarBtn(true);
  }, [setToggleSidebarBtn]);

  const [toggle, setToggle] = useState<boolean>(false);

  const CreateMember = () => {
    const { openCreateMemberBox, CreateMemberBox } = useCreateMemberBox();
    return (
      <>
        <Chip
          value={
            <div className='flex items-center' onClick={openCreateMemberBox}>
              <PlusCircleIcon className='w-6 h-6' />
              {screenSize > ScreenSize.MOBILE && <span>Thêm thành viên</span>}
            </div>
          }
          color='teal'
          className='cursor-pointer hover:bg-teal-700 p-2'
        />
        <CreateMemberBox />
      </>
    );
  };

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-col'>
        <Typography variant='h5' color='gray' className='font-extrabold sm:text-2xl'>
          THÀNH VIÊN
        </Typography>
        <Typography variant='paragraph' color='gray' className='font-medium sm:text-lg truncate'>
          Danh sách thành viên
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
              <SearchMember
                label='Tìm thành viên'
                searchBar={true}
                isResetLeaderName={isResetLeaderName}
              />
              <FilterMember />
              <CreateMember />
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-end'>
            <CreateMember />
          </div>
          <div className='flex gap-2 items-end justify-end'>
            <SearchMember
              label='Tìm thành viên'
              searchBar={true}
              isResetLeaderName={isResetLeaderName}
            />
            <FilterMember />
          </div>
        </div>
      )}
    </div>
  );
}
