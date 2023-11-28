import { SubmitHandler, useForm } from 'react-hook-form';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@services';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import loginImage from '@assets/login.svg';

type LoginFormData = {
  usernameOrEmail: string;
  password: string;
};

const schema = yup
  .object({
    usernameOrEmail: yup.string().min(5).required(),
    password: yup.string().min(8).required()
  })
  .required();

export function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginFormData) => authService.login(data)
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutateAsync(data)
      .then(() => {
        toast.success('Login successfully!');
        window.location.pathname = '/';
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return;
    const firstErrorKey = keys[0] as keyof LoginFormData;

    const message = errors[firstErrorKey]?.message;
    if (!message) return;

    toast.warn(message[0].toUpperCase() + message.slice(1));
  }, [errors]);

  return (
    <div className='flex px-10 flex-col sm:flex-row justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full gap-6'>
      <div className='basis-1/2 flex justify-center items-end sm:items-center bg-emerald-100'>
        <img src={loginImage} alt='TickLab Banner' width={370} />
      </div>
      <div className='basis-1/2 flex justify-center items-start sm:items-center'>
        <Card color='transparent' shadow={false}>
          <Typography variant='h4' color='blue-gray'>
            Login
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Enter your email and password.
          </Typography>
          <form
            className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-4 flex flex-col gap-6'>
              <Input
                id='auth-email'
                size='lg'
                label='Email or username'
                icon={<EnvelopeIcon />}
                {...register('usernameOrEmail')}
                type='text'
                error={!!errors.usernameOrEmail}
              />

              <Input
                id='auth-password'
                type='password'
                size='lg'
                icon={<KeyIcon />}
                label='Password'
                {...register('password')}
                error={!!errors.password}
                autoComplete='on'
              />
            </div>

            <Button className='mt-6' fullWidth type='submit'>
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
