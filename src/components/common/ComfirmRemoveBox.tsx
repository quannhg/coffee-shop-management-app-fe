import { ScreenSize } from '@constants';
import { CheckCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useScreenSize } from '@hooks';
import { Button, Dialog, DialogHeader, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Control, useController, useForm, useWatch } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function useConfirmRemoveBox(action: () => Promise<void>, navigateTarget?: string) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const { screenSize } = useScreenSize();
  const mobileStyle = 'self-center m-0 p-0 rounded-none rounded-lg';
  const desktopStyle = 'self-center rounded-lg';

  const useContent = (title: string, confirmString: string) => {
    const { handleSubmit, control } = useForm<{ confirmString: string }>({
      defaultValues: { confirmString: '' }
    });

    const navigate: NavigateFunction = useNavigate();

    const handleRemoveProject = async () => {
      await action();
      if (navigateTarget) navigate(navigateTarget);
      handleOpen();
    };

    const ConfirmRemoveInput: Component<{
      control: Control<{ confirmString: string }>;
      name: keyof { confirmString: string };
    }> = ({ control, name }) => {
      const {
        field,
        fieldState: { error }
      } = useController<{ confirmString: string }>({
        control,
        name,
        rules: {
          validate: (value) => value === confirmString || 'Vui lòng nhập đúng từ khóa'
        }
      });

      const { onChange } = field;
      return (
        <div>
          <Input
            onChange={onChange}
            style={{ minWidth: '100%' }}
            icon={(field.value || '') === confirmString ? <CheckCircleIcon /> : undefined}
            defaultValue=''
            className="before:content-['*']"
          />
          {error && (
            <Typography color='red' variant='small'>
              {error.message}{' '}
            </Typography>
          )}
        </div>
      );
    };

    const ConfirmRemoveButton: Component<{
      control: Control<{ confirmString: string }>;
      name: keyof { confirmString: string };
    }> = ({ control, name }) => {
      const currentInput = useWatch<{ confirmString: string }>({ control, name });
      return (
        <Button
          style={{ minWidth: '100%' }}
          className='flex justify-center normal-case font-semibold text-base gap-2 items-center place-self-start px-8 bg-red-500 border-0 mt-8 text-white rounded-lg'
          type='submit'
          variant='outlined'
          size='md'
          disabled={!(currentInput === confirmString)}
        >
          Xác nhận
          <TrashIcon className='w-4 h-4' />
        </Button>
      );
    };

    return {
      BoxHeader: () => (
        <div className='min-w-full'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-fit px-2 border-b-2 border-red-500'>
              <Typography className='text-lg font-bold text-red-500 flex flex-col'>
                {title}
              </Typography>
            </div>
            <div className='p-1.5 bg-gray-100 rounded-full cursor-pointer'>
              <XMarkIcon onClick={handleOpen} className='h-5 w-5 text-gray-400' strokeWidth={3} />
            </div>
          </div>
        </div>
      ),
      BoxBody: () => (
        <>
          <div className='leading-none mb-2'>
            <Typography className='inline' variant='paragraph'>
              Vui lòng nhập <span className='font-semibold'>{confirmString}</span> để xác nhận xóa
            </Typography>
          </div>

          <div className='w-full flex justify-between'>
            <form className='min-w-full' onSubmit={handleSubmit(handleRemoveProject)}>
              <ConfirmRemoveInput control={control} name={'confirmString'} />
              <ConfirmRemoveButton control={control} name={'confirmString'} />
            </form>
          </div>
        </>
      )
    };
  };

  const BoxContent: Component<{ title: string; confirmString: string; navigate?: string }> = ({
    title,
    confirmString
  }) => {
    const { BoxHeader, BoxBody } = useContent(title, confirmString);

    return (
      <div className='p-4 flex flex-col'>
        <BoxHeader />
        <BoxBody />
      </div>
    );
  };

  return {
    openConfirmRemoveBox: () => handleOpen(),
    ConfirmRemoveBox: (title: string, confirmString: string) => (
      <div>
        <Dialog
          className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
          open={open}
          size={screenSize === ScreenSize.MOBILE ? 'xs' : 'xs'}
          handler={handleOpen}
          dismiss={
            {
              outsidePress: false
            } as DismissProps
          }
        >
          <DialogHeader className='flex flex-col p-0 m-0'>
            <BoxContent title={title} confirmString={confirmString} />
          </DialogHeader>
        </Dialog>
      </div>
    )
  };
}
