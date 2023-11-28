import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option
} from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CreateEmployeeDto } from '@services';
import { SubmitHandler, useForm } from 'react-hook-form';

export function MutateMemberBox() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { register, setValue, handleSubmit, reset } = useForm<CreateEmployeeDto>();
  // const { mutateAsync } = useMutation({
  //   mutationKey: ['createMember'],
  //   mutationFn: (data: CreateEmployeeDto) => memberService.create(data)
  // });

  const onSubmit: SubmitHandler<CreateEmployeeDto> = (data) => {
    //TODO: remove console log
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
    // mutateAsync(data)
    //   .then(() => {
    //     toast.success('Thêm thành viên thành công!');
    //     emitEvent('member:refetch');
    //     reset();
    //   })
    //   .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <Button className='flex items-center px-4 py-2' onClick={handleOpen}>
        <PlusCircleIcon className='w-6 h-6 pe-1' />
        Thêm nhân viên
      </Button>
      <Dialog open={open} handler={handleOpen} size='xs'>
        <DialogHeader>Thêm nhân viên</DialogHeader>
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
              >
                <Option value='nam'>Nam</Option>
                <Option value='nữ'>Nữ</Option>
              </Select>
            </div>
            <div className='mb-4'>
              {' '}
              <Input {...register('birthday')} label='Ngày sinh' variant='standard' type='date' />
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
                {...register('role')}
                onChange={(value) => setValue('role', value as CreateEmployeeDto['role'])}
                label='Trình độ học vấn'
                variant='standard'
              >
                <Option value='High School Diploma'>Đại học / Cao đẳng</Option>
                <Option value='College Degree'>THPT</Option>
                <Option value='Undergraduate Degree'>Khác</Option>
              </Select>
            </div>
            <div className='mb-4'>
              {' '}
              <Input {...register('joinAt')} label='Ngày vào làm' variant='standard' />
            </div>
            <div className='mb-4'>
              <Select
                {...register('academicLevel')}
                onChange={(value) =>
                  setValue('academicLevel', value as CreateEmployeeDto['academicLevel'])
                }
                label='Vai trò'
                variant='standard'
              >
                <Option value='ADMIN'>Quản lý</Option>
                <Option value='MEMBER'>Bồi bàn</Option>
                <Option value='COLLABORATOR'>Pha chế</Option>
              </Select>
            </div>
          </DialogBody>
          <DialogFooter className='flex items-center justify-between'>
            <Button variant='outlined' color='red' onClick={handleOpen} size='sm'>
              <span>Thoát</span>
            </Button>
            <Button onClick={handleOpen} size='sm' type='submit'>
              <span>Đồng ý</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
