import { Typography } from '@material-tailwind/react';

export const FetchError: Component<{ message?: string }> = (message) => {
  return (
    <Typography className='text-red-500'>
      {message ?? 'An error occured! Please try again later!'}
    </Typography>
  );
};
