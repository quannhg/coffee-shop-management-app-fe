import { Breadcrumbs, Card, Spinner, CardBody } from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import { MemberDetails, MemberStandard } from '@components/member';
import { memberService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { retryQueryFn } from '@utils';

export function EmployeePage() {
  const { memberId } = useParams();

  const { data: memberDetails, isLoading } = useQuery(['/api/members', memberId], {
    queryFn: () => (memberId ? memberService.getDetails(memberId) : undefined),
    retry: retryQueryFn
  });

  return (
    <div className='flex flex-col gap-4 max-h-screen'>
      <Breadcrumbs separator={<ChevronRightIcon strokeWidth={2} className='w-4' />}>
        <Link to='/members' className='flex items-center gap-2 text-base'>
          <UserCircleIcon className='w-5 h-5' />
          Danh sách thành viên
        </Link>
        {memberDetails && (
          <Link to='#' className='text-base font-medium'>
            {memberDetails.lastName} {memberDetails.firstName}
          </Link>
        )}
      </Breadcrumbs>
      {isLoading ? (
        <div className='grid justify-items-center items-center'>
          <Spinner color='green' className='h-12 w-12' />
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : (
        <div className='grid grid-cols-5 gap-4'>
          <MemberDetails />
          <Card className='col-span-4 h-fit'>
            <CardBody className='p-2'>
              {memberDetails && (
                <MemberStandard applyingStandards={memberDetails.applyingStandards} />
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
