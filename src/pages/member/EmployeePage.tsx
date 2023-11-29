import { Breadcrumbs } from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { MemberDetails } from '@components/member';
export function MemberPage() {
  // const { memberId } = useParams();

  // const { data: memberDetails, isLoading } = useQuery(['/api/members', memberId], {
  //   queryFn: () => (memberId ? memberService.getDetails(memberId) : undefined),
  //   retry: retryQueryFn
  // });

  const memberDetails = {
    id: 'abc',
    name: 'nguyen hong quan',
    avatarUrl:
      'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/327469869_722907669285814_7316941061051549723_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mo5WThjzdXMAX-zb3ro&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfC8yyAHtmntVllfwkx9qHSkIvNYZbgxw57j6PjhuT865A&oe=6564F233',
    role: 'bồi bàn',
    joinedAt: 1,
    birthday: 1,
    gender: 'nam',
    phoneNum: '0999999999'
  };

  return (
    <div className='flex flex-col gap-4 max-h-screen'>
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
      {/* {isLoading ? (
        <div className='grid justify-items-center items-center'>
          <Spinner color='green' className='h-12 w-12' />
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : ( */}
      <div className='grid grid-cols-5 gap-4'>
        <MemberDetails />
        {/* <Card className='col-span-4 h-fit'>
          <CardBody className='p-2'>
            {memberDetails && (
              <MemberStandard applyingStandards={memberDetails.applyingStandards} />
            )}
          </CardBody>
        </Card> */}
      </div>
      {/* )} */}
    </div>
  );
}
