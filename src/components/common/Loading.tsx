import { Spinner } from '@material-tailwind/react';

export const Loading = () => (
  <div className='grid justify-items-center items-center'>
    <Spinner color='green' className='h-12 w-12' />
    <span>Đang tải dữ liệu...</span>
  </div>
);
