import { useState } from 'react';
import { Control, useForm, useController } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from '@material-tailwind/react';
import { ArrowLeftIcon, CheckCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { usePersonnelProjectGeneralStore, useProjectDetailStore } from '@states';

export function useRemovePersonnelBox() {
  const { markLeavingProject, removePersonnelProject } = usePersonnelProjectGeneralStore();
  const { projectDetail } = useProjectDetailStore();
  const { screenSize } = useScreenSize();

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg overflow-auto';
  const desktopStyle = 'self-center rounded-lg overflow-auto';

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);

  const RemovePersonnelBox: Component<{ personnelId: string; personnelName: string }> = ({
    personnelId,
    personnelName
  }) => {
    const { control, handleSubmit } = useForm<{ personnelName: string }>({
      defaultValues: {
        personnelName: ''
      }
    });

    const [formOverride, setFormOverride] = useState<boolean>(false);

    const handleMarkLeavingProject = async () => {
      setOpen(false);
      await markLeavingProject(projectDetail.id, personnelId);
    };

    const handleRemovePersonnel = async () => {
      setOpen(false);
      await removePersonnelProject(projectDetail.id, personnelId);
    };

    const PersonnelNameInput: Component<{
      control: Control<{ personnelName: string }>;
      name: keyof { personnelName: string };
    }> = ({ control, name }) => {
      const { field } = useController<{ personnelName: string }>({ control, name });
      return (
        <Input
          {...field}
          label='Tên nhân sự'
          icon={(field.value || '') === personnelName ? <CheckCircleIcon /> : undefined}
          autoFocus
        />
      );
    };

    const ConfirmButton: Component<{
      control: Control<{ personnelName: string }>;
      name: keyof { personnelName: string };
    }> = ({ control, name }) => {
      const { field } = useController<{ personnelName: string }>({ control, name });
      return (
        <Button
          type='submit'
          color='red'
          className='w-full flex items-center justify-center gap-2 rounded-full normal-case text-base'
          disabled={field.value !== personnelName}
        >
          <span>Xác nhận</span>
          <TrashIcon strokeWidth={2} className='w-5 h-5' />
        </Button>
      );
    };

    return (
      <Dialog
        open={open}
        handler={handleOpen}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
      >
        <DialogHeader className='grid gap-2'>
          <div className='border-b-2 border-red-500'>
            <div className={'items-center ' + (formOverride ? 'grid' : 'flex justify-between')}>
              <Typography
                variant='h5'
                className={'font-bold text-red-500 ' + (formOverride ? 'order-last' : '')}
              >
                Xóa nhân sự
              </Typography>
              <div className='flex items-center justify-between'>
                {formOverride && (
                  <div className='flex items-center gap-2 text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer'>
                    <ArrowLeftIcon strokeWidth={2} className='w-4 h-4' />
                    <Typography variant='paragraph' className='font-medium'>
                      Quay lại
                    </Typography>
                  </div>
                )}
                <div
                  className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon
                    className='h-5 w-5 text-gray-400 hover:text-gray-700'
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>
            <Typography variant='paragraph' className='text-red-500 font-normal'>
              Hành động không thể hoàn tác. Dữ liệu về nhân sự này trong dự án sẽ mất hoàn toàn.
            </Typography>
          </div>
          {formOverride ? (
            <Typography variant='paragraph' className='font-normal'>
              <span>Vui lòng nhập </span>
              <span className='font-bold'>Tên nhân sự </span>
              <span>để xác nhận xóa</span>
            </Typography>
          ) : (
            <Typography variant='paragraph' className='font-normal'>
              <span className='font-bold'>Lưu ý: </span>
              <span>Đánh dấu nhân sự </span>
              <span className='font-bold'>Rời dự án </span>
              <span>để lưu lại dữ liệu hoạt động.</span>
            </Typography>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit(handleRemovePersonnel)}>
          {formOverride && (
            <DialogBody>
              <PersonnelNameInput control={control} name='personnelName' />
            </DialogBody>
          )}
          <DialogFooter
            className={formOverride ? 'items-center' : 'grid grid-cols-5 gap-2 items-center'}
          >
            {formOverride ? (
              <ConfirmButton control={control} name='personnelName' />
            ) : (
              <>
                <Button
                  color='teal'
                  className='col-span-3 rounded-full normal-case text-base'
                  onClick={handleMarkLeavingProject}
                >
                  <span>Đánh dấu </span>
                  <span className='font-black'>“Rời dự án”</span>
                </Button>
                <Button
                  variant='text'
                  className='col-span-2 flex items-center justify-center gap-2 rounded-full normal-case text-base text-red-500 bg-red-50 hover:bg-red-100'
                  onClick={() => setFormOverride(!formOverride)}
                >
                  <span>Xóa</span>
                  <TrashIcon strokeWidth={2} className='w-5 h-5' />
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </Dialog>
    );
  };

  return {
    openRemovePersonnelBox: () => setOpen(true),
    RemovePersonnelBox
  };
}
