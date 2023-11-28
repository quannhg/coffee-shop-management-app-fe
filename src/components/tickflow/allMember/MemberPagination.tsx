import { ChangeEvent, KeyboardEvent } from 'react';
import { toast } from 'react-toastify';
import { IconButton } from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PAGE_NUMBER_ERROR } from '@constants';
import { useQueryMember } from '@hooks';
import { useMemberGeneralStore } from '@states';

export const MemberPagination: Component<{ pageNumberMax: number }> = ({ pageNumberMax }) => {
  const { memberParam, queryMemberParam } = useQueryMember();
  const { activePage, inputPage, setActivePage, setInputPage } = useMemberGeneralStore();

  const regex = /^[0-9\b]*$/;

  const next = () => {
    if (activePage === pageNumberMax) return;

    queryMemberParam({
      ...memberParam,
      pagination: {
        ...memberParam.pagination,
        page: activePage + 1
      }
    });
    setInputPage(`${activePage + 1}`);
    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;

    queryMemberParam({
      ...memberParam,
      pagination: {
        ...memberParam.pagination,
        page: activePage - 1
      }
    });
    setInputPage(`${activePage - 1}`);
    setActivePage(activePage - 1);
  };

  return (
    <div className='flex items-center justify-center gap-8'>
      <IconButton
        size='lg'
        variant='outlined'
        color='blue-gray'
        onClick={prev}
        disabled={activePage === 1}
      >
        <ChevronLeftIcon strokeWidth={3} className='h-6 w-6' />
      </IconButton>
      <div className='flex items-center gap-2 font-normal'>
        Page
        <strong className='text-blue-gray-900'>
          <input
            className='w-8 h-8 border-2 border-indigo-500/100 rounded-md text-center'
            value={inputPage}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setInputPage(event.target.value);
            }}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                if (
                  !regex.test(inputPage) ||
                  parseInt(inputPage) < 1 ||
                  parseInt(inputPage) > pageNumberMax
                ) {
                  toast.error(PAGE_NUMBER_ERROR);
                  toast.clearWaitingQueue();
                } else {
                  queryMemberParam({
                    ...memberParam,
                    pagination: {
                      ...memberParam.pagination,
                      page: parseInt(inputPage)
                    }
                  });
                  setActivePage(parseInt(inputPage));
                }
                event.currentTarget.blur();
              }
            }}
          />
        </strong>{' '}
        of <strong className='text-blue-gray-900'>{pageNumberMax}</strong>
      </div>
      <IconButton
        size='lg'
        variant='outlined'
        color='blue-gray'
        onClick={next}
        disabled={activePage === pageNumberMax}
      >
        <ChevronRightIcon strokeWidth={3} className='h-6 w-6' />
      </IconButton>
    </div>
  );
};
