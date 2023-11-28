import { Typography } from '@material-tailwind/react';
import { ReactNode } from 'react';

export const StandardSummary: Component<{ title: string; children: ReactNode }> = ({
  title,
  children
}) => {
  return (
    <div className='flex flex-col gap-1 items-start lg:p-2'>
      <Typography className='text-xs font-medium text-blue-gray-400'>{title}</Typography>
      {children}
    </div>
  );
};
