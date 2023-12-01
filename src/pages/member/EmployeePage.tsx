import { Breadcrumbs, Spinner } from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import { MemberDetails } from '@components/member';
import { useDetailEmployeeStore } from '@states';
import { useState } from 'react';
export function MemberPage() {
  const { memberId } = useParams();

  const { member: memberDetails, getMember } = useDetailEmployeeStore();

  useState(() => {
    getMember(memberId || '');
  });

  return (
    <div className='flex flex-col gap-4 max-h-screen h-full'>
      <Breadcrumbs separator={<ChevronRightIcon strokeWidth={2} className='w-4' />}>
        <Link to='/employees' className='flex items-center gap-2 text-base'>
          <UserCircleIcon className='w-5 h-5' />
          Danh sách nhân viên
        </Link>
        {memberDetails && (
          <Link to='#' className='text-base font-medium'>
            {memberDetails.name}
          </Link>
        )}
      </Breadcrumbs>
      {!memberDetails ? (
        <div className='grid justify-items-center items-center'>
          <Spinner color='green' className='h-12 w-12' />
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : (
        <div className='grid grid-cols-5 gap-4 h-full'>
          <MemberDetails />
        </div>
      )}
    </div>
  );
}
