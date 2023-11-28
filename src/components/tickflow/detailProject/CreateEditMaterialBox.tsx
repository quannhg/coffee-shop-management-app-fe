import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Textarea
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import * as yup from 'yup';
import { useDetailProjectMaterialsStore, useGeneralProjectMaterialsStore } from '@states';

const MaterialNameInput: Component<{
  control: Control<ProjectMaterialParams>;
  name: keyof ProjectMaterialParams;
}> = ({ control, name }) => {
  const {
    field,
    fieldState: { error }
  } = useController<ProjectMaterialParams>({ control, name });
  return (
    <div className='w-full'>
      <Input
        {...field}
        error={error?.message ? true : false}
        size='md'
        label='Tiêu đề'
        labelProps={{ className: 'text-gray-400' }}
        required
      />
      {error?.message && (
        <Typography color='red' variant='small'>
          {error?.message}{' '}
        </Typography>
      )}
    </div>
  );
};

const MaterialDescriptionInput: Component<{
  control: Control<ProjectMaterialParams>;
  name: keyof ProjectMaterialParams;
}> = ({ control, name }) => {
  const {
    field,
    fieldState: { error }
  } = useController<ProjectMaterialParams>({ control, name });
  return (
    <div>
      <Textarea
        {...field}
        error={error?.message ? true : false}
        size='md'
        label='Mô tả'
        labelProps={{ className: 'text-gray-400' }}
        required={true}
      />
      {error?.message && (
        <Typography color='red' variant='small'>
          {error?.message}{' '}
        </Typography>
      )}
    </div>
  );
};

export function useCreateMaterialBox() {
  const [open, setOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg ';
  const desktopStyle = 'self-center rounded-lg';

  const handleOpen = () => setOpen((cur) => !cur);

  const validateSchema = yup.object({}) as yup.ObjectSchema<ProjectMaterialParams>;

  const { handleSubmit, control, reset } = useForm<ProjectMaterialParams>({
    defaultValues: { name: '', description: '' },
    resolver: yupResolver(validateSchema)
  });

  const Form = () => {
    const { createMaterial } = useGeneralProjectMaterialsStore();

    const handleAddProject = async (project: ProjectMaterialParams) => {
      createMaterial(project);
      handleOpen();
      reset();
    };

    return (
      <form onSubmit={handleSubmit(handleAddProject)} autoComplete='off'>
        <DialogBody className='border-0 flex flex-col gap-4' divider>
          <div className='flex gap-4 w-full justify-center items-center'>
            <div className='p-1 border rounded-md border-blue-gray-300'>
              <div className='p-1 rounded-full bg-blue-500/20'>
                <ArrowTrendingUpIcon className='w-5 h-5 text-blue-400' />
              </div>
            </div>

            <MaterialNameInput control={control} name='name' />
          </div>
          <MaterialDescriptionInput control={control} name='description' />
        </DialogBody>
        <DialogFooter className='pt-4 py-0 pb-4'>
          <Button className='normal-case bg-teal-500 p-2 w-full' type='submit'>
            <span className='text-sm font-semibold'>Xác nhận</span>
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return {
    openCreateMaterialBox: () => handleOpen(),
    CreateMaterialBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={open}
        size={screenSize === ScreenSize.MOBILE ? 'xxl' : 'sm'}
        handler={handleOpen}
      >
        <DialogHeader className='pt-4 pb-0 flex justify-between'>
          <div className=''>
            <Typography className='mr-10 text-teal-500 font-bold border-b-2 border-teal-500 text-lg'>
              Tạo danh mục
            </Typography>
          </div>
          <div
            className='flex justify-self-end p-1.5 bg-blue-gray-100 rounded-full w-fit cursor-pointer'
            onClick={() => {
              handleOpen();
              reset();
            }}
          >
            <XMarkIcon className='h-3 w-3 text-blue-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
        </DialogHeader>
        <Form />
      </Dialog>
    )
  };
}

export function useEditMaterialBox() {
  const [open, setOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg ';
  const desktopStyle = 'self-center rounded-lg';

  const handleOpen = () => setOpen((cur) => !cur);

  const [materialName, setMaterialName] = useState('');

  const [materialDescription, setMaterialDescription] = useState('');

  const validateSchema = yup.object({}) as yup.ObjectSchema<ProjectMaterialParams>;

  const { handleSubmit, control, reset } = useForm<ProjectMaterialParams>({
    defaultValues: { name: '', description: '' },
    resolver: yupResolver(validateSchema)
  });

  useEffect(() => {
    reset({ name: materialName, description: materialDescription });
  }, [materialDescription, materialName, reset]);

  const Form = () => {
    const { editMaterial } = useDetailProjectMaterialsStore();

    const handleAddProject = async (project: ProjectMaterialParams) => {
      editMaterial(project);
      handleOpen();
    };

    return (
      <form onSubmit={handleSubmit(handleAddProject)} autoComplete='off'>
        <DialogBody className='border-0 flex flex-col gap-4' divider>
          <div className='flex gap-4 w-full justify-center items-center'>
            <div className='p-1 border rounded-md border-blue-gray-300'>
              <div className='p-1 rounded-full bg-blue-500/20'>
                <ArrowTrendingUpIcon className='w-5 h-5 text-blue-400' />
              </div>
            </div>

            <MaterialNameInput control={control} name='name' />
          </div>
          <MaterialDescriptionInput control={control} name='description' />
        </DialogBody>
        <DialogFooter className='pt-4 py-0 pb-4'>
          <Button className='normal-case bg-teal-500 p-2 w-full' type='submit'>
            <span className='text-sm font-semibold'>Lưu thay đổi</span>
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return {
    openEditMaterialBox: (materialName: string, materialDescription: string) => {
      handleOpen();
      setMaterialName(materialName);
      setMaterialDescription(materialDescription);
    },
    EditMaterialBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={open}
        size={screenSize === ScreenSize.MOBILE ? 'xxl' : 'sm'}
        handler={handleOpen}
      >
        <DialogHeader className='pt-4 pb-0 flex justify-between'>
          <div className=''>
            <Typography className='mr-10 text-teal-500 font-bold border-b-2 border-teal-500 text-lg'>
              Chỉnh sửa danh mục
            </Typography>
          </div>
          <div
            className='flex justify-self-end p-1.5 bg-blue-gray-100 rounded-full w-fit cursor-pointer'
            onClick={() => {
              handleOpen();
            }}
          >
            <XMarkIcon className='h-3 w-3 text-blue-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
        </DialogHeader>
        <Form />
      </Dialog>
    )
  };
}
