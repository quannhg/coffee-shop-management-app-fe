import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  Input,
  Select,
  Option,
  Typography
} from '@material-tailwind/react';
import {
  XMarkIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowLongLeftIcon
} from '@heroicons/react/24/outline';
import { PROJECT_STATUS, ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useProjectDetailStore } from '@states';
import { useForm, useController, Control, useWatch } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const useChangeStatusProjectBox = (handleOpenParent: () => void) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const { screenSize } = useScreenSize();
  const mobileStyle = 'self-center min-w-full m-0 rounded-none rounded-lg';
  const desktopStyle = 'self-center rounded-lg';

  const { status: projectStatus } = useProjectDetailStore().projectDetail;

  const { handleSubmit, setValue, control } = useForm<{ status: string }>();

  const { updateStatus } = useProjectDetailStore();

  const handleStatusProject = async (data: { status: string }) => {
    await updateStatus(data);
    handleOpen();
    handleOpenParent();
  };

  const StatusSelect: Component<{
    control: Control<{ status: string }>;
    name: keyof { status: string };
  }> = ({ control, name }) => {
    const { field } = useController<{ status: string }>({ control, name });
    return (
      <Select
        {...field}
        label='Trạng thái'
        value={projectStatus}
        onChange={(e) => {
          e && setValue(field.name, e);
        }}
      >
        {PROJECT_STATUS.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  };

  return {
    openChangeStatusProjectBox: () => handleOpen(),
    CreateChangeStatusProjectBox: () => (
      <div>
        <Dialog
          className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
          open={open}
          size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
          handler={handleOpen}
          dismiss={
            {
              outsidePress: false
            } as DismissProps
          }
        >
          <DialogHeader className='flex flex-col pt-4 mx-2'>
            <div className='min-w-full mt-2 mb-1 flex justify-between'>
              <span className='cursor-pointer' onClick={handleOpen}>
                <ArrowLongLeftIcon
                  className='inline w-7 h-7 p-1 mr-2 text-gray-400'
                  strokeWidth={3}
                />
                <Typography className='inline font-medium text-gray-400' variant='paragraph'>
                  Quay lại
                </Typography>
              </span>
              <div>
                <XMarkIcon
                  onClick={() => {
                    handleOpen();
                    handleOpenParent();
                  }}
                  className='h-7 w-7 p-1 text-gray-400 bg-gray-100 rounded-full cursor-pointer'
                  strokeWidth={3}
                />
              </div>
            </div>
            <div className='min-w-full mb-4'>
              <div className='inline text-teal-500 font-bold border-b-2 border-teal-500 justify-self-start'>
                Chỉnh sửa dự án
              </div>
            </div>

            <div className='w-full flex justify-between'>
              <form className='min-w-full' onSubmit={handleSubmit(handleStatusProject)}>
                <StatusSelect control={control} name={'status'} />
                <Button
                  style={{ minWidth: '100%' }}
                  className='bg-teal-500 mt-8 mb-2 rounded-full px-14'
                  type='submit'
                  size='md'
                >
                  <span>Lưu thay đổi</span>
                </Button>
              </form>
            </div>
          </DialogHeader>
        </Dialog>
      </div>
    )
  };
};

export function useRemoveProjectBox() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const { screenSize } = useScreenSize();
  const mobileStyle = 'self-center min-w-full m-0 rounded-none rounded-lg';
  const desktopStyle = 'self-center rounded-lg';

  const useContent = () => {
    const [openConfirmRemoveProjectBox, setOpenConfirmRemoveProjectBox] = useState<boolean>(false);

    const handleConfirmRemoveProjectBox = () =>
      setOpenConfirmRemoveProjectBox(!openConfirmRemoveProjectBox);

    const { openChangeStatusProjectBox, CreateChangeStatusProjectBox } =
      useChangeStatusProjectBox(handleOpen);

    const { removeProject } = useProjectDetailStore();

    const { name: projectName } = useProjectDetailStore().projectDetail;

    const { handleSubmit, control } = useForm<{ confirmString: string }>({
      defaultValues: { confirmString: '' }
    });

    const navigate: NavigateFunction = useNavigate();

    const handleRemoveProject = async () => {
      await removeProject();
      navigate('/project');
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
        rules: { validate: (value) => value === projectName || 'Vui lòng nhập đúng tên dự án' }
      });

      const { onChange } = field;
      return (
        <div className='mt-2'>
          <Input
            onChange={onChange}
            style={{ minWidth: '100%' }}
            icon={(field.value || '') === projectName ? <CheckCircleIcon /> : undefined}
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
          className='justify-center normal-case font-semibold text-base flex gap-2 items-center place-self-start px-8 bg-red-500 border-0 mt-4 text-white rounded-full'
          type='submit'
          variant='outlined'
          size='md'
          disabled={!(currentInput === projectName)}
        >
          Xác nhận
          <TrashIcon className='w-4 h-4' />
        </Button>
      );
    };

    return {
      BoxHeader: (
        <div className='min-w-full'>
          {openConfirmRemoveProjectBox && (
            <div className='min-w-full mb-1 flex justify-between'>
              <span className='cursor-pointer' onClick={handleConfirmRemoveProjectBox}>
                <ArrowLongLeftIcon
                  className='inline w-7 h-7 p-1 mr-2 text-gray-400'
                  strokeWidth={3}
                />
                <Typography className='inline font-medium text-gray-400' variant='paragraph'>
                  Quay lại
                </Typography>
              </span>
              <div>
                <XMarkIcon
                  onClick={() => {
                    handleOpen();
                  }}
                  className='h-7 w-7 p-1 text-gray-400 bg-gray-100 rounded-full cursor-pointer'
                  strokeWidth={3}
                />
              </div>
            </div>
          )}
          <div className='flex items-start justify-between border-0 border-b-2 border-red-500 mb-3'>
            <div className='text-red-500 font-bold flex flex-col'>
              <Typography className='block mb-1' variant='h4' color='red'>
                Xóa dự án
              </Typography>
              <Typography className='block leading-6' variant='paragraph' color='red'>
                Hành động không thể hoàn tác. Dữ liệu dự án sẽ mất hoàn toàn.
              </Typography>
            </div>
            <div>
              {!openConfirmRemoveProjectBox && (
                <XMarkIcon
                  onClick={handleOpen}
                  className='h-7 w-7 p-1 text-gray-400 bg-gray-100 rounded-full cursor-pointer'
                  strokeWidth={3}
                />
              )}
            </div>
          </div>
        </div>
      ),
      BoxBody: openConfirmRemoveProjectBox ? (
        <>
          <div className='leading-none'>
            <Typography className='inline leading-6' variant='paragraph'>
              Vui lòng nhập <span className='font-semibold'>{projectName}</span> để xác nhận xóa
            </Typography>
          </div>

          <div className='w-full flex justify-between'>
            <form className='min-w-full' onSubmit={handleSubmit(handleRemoveProject)}>
              <ConfirmRemoveInput control={control} name={'confirmString'} />
              <ConfirmRemoveButton control={control} name={'confirmString'} />
            </form>
          </div>
        </>
      ) : (
        <div className='min-w-full'>
          <div className='leading-6 mt-1'>
            <Typography className='inline font-bold' variant='paragraph'>
              Lưu ý:&nbsp;
            </Typography>
            <Typography className='inline' variant='paragraph'>
              Chuyển dự án sang trạng thái&nbsp;
            </Typography>
            <Typography className='inline font-bold' variant='paragraph'>
              Delay, Canceled&nbsp;
            </Typography>
            <Typography className='inline' variant='paragraph'>
              để lưu lại lịch sử hoạt động.
            </Typography>
          </div>
          <div className='mt-8 min-w-full flex justify-between'>
            <Button
              className='normal-case text-semibold text-white text-base bg-teal-500 rounded-full'
              type='submit'
              size='md'
              onClick={openChangeStatusProjectBox}
            >
              <span>Chuyển trạng thái</span>
            </Button>

            <Button
              className='normal-case text-semibold text-base flex gap-2 items-center place-self-start px-8 bg-red-200 bg-opacity-20 border-0 text-red-500 rounded-full'
              type='button'
              variant='outlined'
              size='md'
              onClick={handleConfirmRemoveProjectBox}
            >
              <span>Xóa</span>
              <TrashIcon className='w-4 h-4' />
            </Button>
          </div>
          <CreateChangeStatusProjectBox />
        </div>
      )
    };
  };

  const BoxContent = () => {
    const { BoxHeader, BoxBody } = useContent();

    return (
      <>
        {BoxHeader}
        {BoxBody}
      </>
    );
  };

  return {
    openRemoveProjectBox: () => handleOpen(),
    CreateRemoveProjectBox: () => (
      <div>
        <Dialog
          className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
          open={open}
          size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
          handler={handleOpen}
          dismiss={
            {
              outsidePress: false
            } as DismissProps
          }
        >
          <DialogHeader className='flex flex-col pt-6 mx-2'>
            <BoxContent />
          </DialogHeader>
        </Dialog>
      </div>
    )
  };
}
