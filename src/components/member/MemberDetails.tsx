import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
  Typography,
  Spinner
} from '@material-tailwind/react';
import {
  PhoneIcon,
  BanknotesIcon,
  CakeIcon,
  HomeIcon,
  UserIcon,
  AcademicCapIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/20/solid';
import { convertTimestampToDateFormat, formatPhone } from '@utils';
import Avatar from 'react-avatar';
import { RoleColor } from '@constants';
import { useEffect, useState } from 'react';
import { useDetailEmployeeStore } from '@states';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

export function MemberDetails() {
  const { memberId } = useParams();
  const { member: memberDetails, removeMember, updateMember, getMember } = useDetailEmployeeStore();

  useEffect(() => {
    getMember(memberId || '');
  }, [getMember, memberId]);

  const navigate: NavigateFunction = useNavigate();

  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  if (!memberDetails) return <Spinner className='h-12 w-12' />;

  const ConfirmRemoveBox = () => {
    const handleOpen = () => setConfirmRemoveOpen(!confirmRemoveOpen);

    const handleRemove = async () => {
      handleOpen();
      navigate('/employees');
      await removeMember(memberId || '');
    };
    return (
      <div>
        <Button
          color='red'
          onClick={handleOpen}
          className='flex items-center justify-center gap-1 px-5'
        >
          <TrashIcon className='w-4 h-4' />
          Xóa
        </Button>
        <Dialog open={confirmRemoveOpen} handler={handleOpen} size='xs'>
          <DialogHeader>{`Xóa nhân viên "${memberDetails.name}"`}</DialogHeader>
          <DialogBody>Hành động không thể hoàn tác</DialogBody>
          <DialogFooter>
            <Button variant='text' color='blue-gray' onClick={handleOpen} className='mr-1'>
              <span>Hủy</span>
            </Button>
            <Button variant='gradient' color='red' onClick={handleRemove}>
              <span>Xác nhận</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  };

  const EditBox = () => {
    const handleOpen = () => setEditOpen(!editOpen);

    const { register, setValue, handleSubmit, getValues } = useForm<EditEmployeeDetail>({
      defaultValues: {
        name: memberDetails.name,
        avatarUrl: memberDetails.avatarUrl,
        address: memberDetails.address,
        gender: memberDetails.gender,
        birthday: moment(convertTimestampToDateFormat(memberDetails.birthday), 'DD/MM/YYYY').unix(),
        phoneNum: memberDetails.phoneNum,
        bankNum: memberDetails.bankNum,
        academicLevel: memberDetails.academicLevel
      }
    });

    const onSubmit: SubmitHandler<EditEmployeeDetail> = async (data) => {
      handleOpen();
      await updateMember(memberId || '', data);
    };

    return (
      <div>
        <Button
          color='blue'
          onClick={handleOpen}
          className='flex items-center justify-center gap-1 px-5'
        >
          <PencilIcon className='w-4 h-4' />
          Sửa
        </Button>
        <Dialog open={editOpen} handler={handleOpen} size='xs'>
          <DialogHeader>Sửa nhân viên</DialogHeader>
          <form className='px-2' onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
              <div className='mb-4'>
                <Input {...register('name')} label='Tên' variant='standard' />
              </div>
              <div className='mb-4'>
                <Input {...register('address')} label='Địa chỉ' variant='standard' />
              </div>
              <div className='mb-4'>
                <Select
                  {...register('gender')}
                  onChange={(value) => setValue('gender', value as CreateEmployeeDto['gender'])}
                  label='Giới tính'
                  variant='standard'
                  value={getValues('gender')}
                >
                  <Option value='Nam'>Nam</Option>
                  <Option value='Nu'>Nữ</Option>
                </Select>
              </div>
              <div className='mb-4'>
                {' '}
                <Input
                  onChange={(event) => {
                    const selectedDate = event.target.value;
                    const unixTimestamp = moment(selectedDate, 'YYYY-MM-DD').unix();
                    setValue('birthday', unixTimestamp);
                  }}
                  label='Ngày sinh'
                  variant='standard'
                  type='date'
                  defaultValue={moment.unix(getValues('birthday')).format('YYYY-MM-DD')}
                />
              </div>
              <div className='mb-4'>
                {' '}
                <Input {...register('phoneNum')} label='Sđt' variant='standard' />
              </div>
              <div className='mb-4'>
                {' '}
                <Input {...register('bankNum')} label='Số tài khoản' variant='standard' />
              </div>
              <div className='mb-4'>
                <Select
                  {...register('academicLevel')}
                  onChange={(value) =>
                    setValue('academicLevel', value as CreateEmployeeDto['academicLevel'])
                  }
                  label='Trình độ học vấn'
                  variant='standard'
                  value={getValues('academicLevel')}
                >
                  <Option value='High School Diploma'>Đại học / Cao đẳng</Option>
                  <Option value='College Degree'>THPT</Option>
                  <Option value='Undergraduate Degree'>Khác</Option>
                </Select>
              </div>
            </DialogBody>
            <DialogFooter className='flex items-center justify-between'>
              <Button variant='outlined' color='red' onClick={handleOpen} size='sm'>
                <span>Thoát</span>
              </Button>
              <Button size='sm' type='submit'>
                <span>Đồng ý</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    );
  };

  return (
    <Card className='h-full'>
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
            <div className='flex'>
              <Chip
                size='sm'
                color={RoleColor[memberDetails.role]}
                variant={memberDetails.role === 'quản lý' ? 'outlined' : undefined}
                value={memberDetails.role}
              />
            </div>
          </div>
        </div>
        <hr className='my-2 mt-10' />
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
              <span className='break-all capitalize'>
                {memberDetails.gender === 'Nu' ? 'Nữ' : memberDetails.gender ?? '--'}
              </span>
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
                {convertTimestampToDateFormat(memberDetails.birthday) ?? '--'}
              </span>
            </Typography>
          </div>
          <div className='flex flex-col gap-2 pt-2'>
            <Typography variant='small' className='flex flex-col'>
              <span className='font-semibold text-blue-gray-800'>Thời gian làm việc</span>
              <span className='font-normal'>
                {convertTimestampToDateFormat(memberDetails.joinedAt)} -{' '}
                {memberDetails.leaveAt
                  ? convertTimestampToDateFormat(memberDetails.leaveAt)
                  : 'Hiện tại'}
              </span>
            </Typography>
          </div>
          <div className='flex justify-around items-center gap-2 pt-2'>
            <EditBox />
            <ConfirmRemoveBox />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
