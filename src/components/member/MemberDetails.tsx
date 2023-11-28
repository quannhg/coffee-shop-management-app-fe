import moment from 'moment';
import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import {
  PhoneIcon,
  BanknotesIcon,
  CakeIcon,
  HomeIcon,
  UserIcon,
  AcademicCapIcon
} from '@heroicons/react/20/solid';
import { formatPhone } from '@utils';
import Avatar from 'react-avatar';
import { RoleColor } from '@constants';

type EmployeeDetail = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  gender: 'nam' | 'nữ';
  birthday: number;
  phoneNum: string;
  bankNum: string;
  academicLevel: AcademicStandard;
  joinedAt: number;
  leaveAt: number;
  role: Role;
};

export function MemberDetails() {
  // const { memberId } = useParams();

  // const {
  //   data: memberDetails,
  //   isLoading,
  //   isError
  // } = useQuery(['/api/members', memberId], {
  //   queryFn: () => (memberId ? memberService.getDetails(memberId) : undefined),
  //   retry: retryQueryFn
  // });

  // if (isLoading) return <Spinner className='h-12 w-12' />;
  // if (isError || !memberDetails)
  //   return <Typography color='red'>Something went wrong! Please try again!</Typography>;

  const memberDetails: EmployeeDetail = {
    id: 'abc',
    name: 'nguyen hong quan',
    avatarUrl:
      'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/327469869_722907669285814_7316941061051549723_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mo5WThjzdXMAX-zb3ro&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfC8yyAHtmntVllfwkx9qHSkIvNYZbgxw57j6PjhuT865A&oe=6564F233',
    address: 'Viet Nam',
    gender: 'nam',
    birthday: 1,
    phoneNum: '0999999999',
    bankNum: '0000000000000000',
    academicLevel: 'High School Diploma',
    joinedAt: 1,
    leaveAt: 1,
    role: 'bồi bàn'
  };

  return (
    <Card className='h-fit'>
      <CardBody className='p-4'>
        <div className='flex items-center gap-2 lg:gap-5 lg:flex-col'>
          <Avatar
            src={memberDetails?.avatarUrl ?? undefined}
            value={memberDetails.name[0].toUpperCase()}
            round
            size='80px'
            textSizeRatio={2.3}
          />
          <div className='flex flex-col min-w-full gap-1 justify-start items-center'>
            <Typography variant='h5' className='text-blue-gray-700'>
              {memberDetails.name}
            </Typography>
            <Typography>
              <div className='flex'>
                <Chip
                  size='sm'
                  color={RoleColor[memberDetails.role]}
                  variant={memberDetails.role === 'quản lý' ? 'outlined' : undefined}
                  value={memberDetails.role}
                />
              </div>
            </Typography>
          </div>
        </div>
        <hr className='my-2' />
        <div className='grid gap-2 divide-y'>
          <div className='flex flex-col gap-2'>
            <Typography
              variant='small'
              className='flex gap-2 items-center font-medium text-blue-gray-500'
            >
              <HomeIcon className='w-5 h-5' />
              {memberDetails.address ?? '--'}
            </Typography>
            <Typography variant='small' className='flex gap-2 font-medium text-blue-gray-500'>
              <UserIcon className='w-5 h-5' />
              <span className='break-all'>{memberDetails.gender ?? '--'}</span>
            </Typography>
            <Typography
              variant='small'
              className='flex gap-2 items-center font-medium text-blue-gray-500'
            >
              <PhoneIcon className='w-5 h-5' />
              <span className='text-sm font-semibold'>
                {memberDetails.phoneNum ? formatPhone(memberDetails.phoneNum) : '--'}
              </span>
            </Typography>
            <Typography
              variant='small'
              className='flex gap-2 items-center font-medium text-blue-gray-500'
            >
              <BanknotesIcon className='w-5 h-5' />
              <span className='text-sm font-semibold'>
                {memberDetails.bankNum ? memberDetails.bankNum : '--'}
              </span>
            </Typography>
            <Typography
              variant='small'
              className='flex gap-2 items-center font-medium text-blue-gray-500'
            >
              <AcademicCapIcon className='w-5 h-5' />
              <span className='text-sm font-semibold'>
                {memberDetails.academicLevel ? memberDetails.academicLevel : '--'}
              </span>
            </Typography>
            <Typography
              variant='small'
              className='flex gap-2 items-center font-medium text-blue-gray-500'
            >
              <CakeIcon className='w-5 h-5' />
              <span className='text-sm font-semibold'>
                {moment.unix(memberDetails.birthday).format('DD/MM/YYYY') ?? '--'}
              </span>
            </Typography>
          </div>
          <div className='flex flex-col gap-2 pt-2'>
            <Typography variant='small' className='flex flex-col'>
              <span className='font-semibold text-blue-gray-800'>Thời gian làm việc</span>
              <span className='font-normal'>
                {moment.unix(memberDetails.joinedAt).format('MMM, YYYY')} -{' '}
                {memberDetails.leaveAt
                  ? moment.unix(memberDetails.leaveAt).format('MM, YYYY')
                  : 'Hiện tại'}
              </span>
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
