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
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEmployeeListStore } from '@states';
import moment from 'moment';

export function MutateEmployeeBox() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { createEmployee } = useEmployeeListStore();

  const { register, setValue, handleSubmit, reset } = useForm<CreateEmployeeDto>();

  const onSubmit: SubmitHandler<CreateEmployeeDto> = async (data) => {
    await createEmployee(data);
    reset();
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
              <Input {...register('username')} label='Tên đăng nhập' variant='standard' />
            </div>
            <div className='mb-4'>
              <Input
                {...register('password')}
                label=' Mật khẩu'
                variant='standard'
                type='password'
              />
            </div>
            <div className='mb-4'>
              <Input {...register('avatarUrl')} label='Avatar URL' variant='standard' />
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
              >
                <Option value='High School Diploma'>Đại học / Cao đẳng</Option>
                <Option value='College Degree'>THPT</Option>
                <Option value='Undergraduate Degree'>Khác</Option>
              </Select>
            </div>
            <div className='mb-4'>
              <Select
                {...register('role')}
                onChange={(value) => setValue('role', value as CreateEmployeeDto['role'])}
                label='Vai trò'
                variant='standard'
              >
                <Option value='quản lý'>Quản lý</Option>
                <Option value='bồi bàn'>Bồi bàn</Option>
                <Option value='pha chế'>Pha chế</Option>
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
