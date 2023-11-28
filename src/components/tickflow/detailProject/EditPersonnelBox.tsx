import { useState } from 'react';
import { useForm, useController, useFormState, Control } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
  Textarea,
  Tooltip,
  Typography
} from '@material-tailwind/react';
import { ArrowUturnLeftIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useConfirmCloseBox } from '@components/common';
import {
  MEMBER_ROLE_IN_PROJECT,
  MAX_ROLE_DESCRIPTION_LENGTH,
  ScreenSize,
  UNDO_NOTIFICATION,
  EXIT_NOTIFICATION
} from '@constants';
import { useScreenSize } from '@hooks';
import { usePersonnelProjectGeneralStore, useProjectDetailStore } from '@states';

export function useEditPersonnelBox() {
  const validateSchema = yup.object({
    description: yup
      .string()
      .max(
        MAX_ROLE_DESCRIPTION_LENGTH,
        `Mô tả dự án không được vượt quá ${MAX_ROLE_DESCRIPTION_LENGTH} ký tự`
      )
  }) as yup.ObjectSchema<PersonnelProjectDetailParams>;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg overflow-auto';
  const desktopStyle = 'self-center rounded-lg overflow-auto';

  const { screenSize } = useScreenSize();
  const { personnelList, updatePersonnelProject } = usePersonnelProjectGeneralStore();
  const { projectDetail } = useProjectDetailStore();
  const { leader } = personnelList.metadata;

  const EditPersonnelBox: Component<{ personnel: PersonnelProject }> = ({ personnel }) => {
    const { control, handleSubmit, reset } = useForm<PersonnelProjectDetailParams>({
      defaultValues: {
        userId: personnel.id,
        role: personnel.role,
        description: personnel.description
      },
      resolver: yupResolver(validateSchema),
      mode: 'onBlur'
    });

    const handleUpdatePersonnel = async (personnel: PersonnelProjectDetailParams) => {
      setOpen(false);
      await updatePersonnelProject(projectDetail.id, personnel);
    };

    const RoleInput: Component<{
      control: Control<PersonnelProjectDetailParams>;
      name: keyof PersonnelProjectDetailParams;
    }> = ({ control, name }) => {
      const { field } = useController<PersonnelProjectDetailParams>({ control, name });
      return (
        <>
          {personnel.role === 'Trưởng nhóm' && leader === 1 ? (
            <Tooltip
              placement='bottom-end'
              className='bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3 z-[10000] w-fit'
              content={
                <div className='w-72 divide-y divide-gray-400'>
                  <Typography variant='paragraph' color='blue-gray' className='font-medium'>
                    Bắt buộc có tối thiểu 1 Trưởng nhóm
                  </Typography>
                  <Typography variant='small' color='blue-gray' className='font-normal opacity-80'>
                    Chuyển nhân sự khác thành Trưởng nhóm trước khi muốn xóa Trưởng nhóm này.
                  </Typography>
                </div>
              }
            >
              <Input
                {...field}
                label='Vai trò'
                icon={<InformationCircleIcon strokeWidth={2} className='w-4 h-4' />}
                className='cursor-not-allowed'
                disabled
              />
            </Tooltip>
          ) : (
            <div>
              <Select {...field} label='Vai trò'>
                {MEMBER_ROLE_IN_PROJECT.map((role, index) => (
                  <Option key={index} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </>
      );
    };

    const DescriptionInput: Component<{
      control: Control<PersonnelProjectDetailParams>;
      name: keyof PersonnelProjectDetailParams;
    }> = ({ control, name }) => {
      const {
        field,
        fieldState: { error }
      } = useController<PersonnelProjectDetailParams>({ control, name });
      return (
        <div>
          <div className='relative'>
            <Textarea
              {...field}
              error={error?.message ? true : false}
              label='Mô tả vai trò'
              rows={
                screenSize === ScreenSize.MOBILE
                  ? Math.ceil(field.value.length / 40)
                  : Math.ceil(field.value.length / 50)
              }
            />
            <span className='absolute bottom-2 right-2 text-gray-700 text-sm'>
              {field.value.length} / {MAX_ROLE_DESCRIPTION_LENGTH}
            </span>
          </div>
          {error?.message && (
            <Typography color='red' variant='small'>
              {error.message}{' '}
            </Typography>
          )}
        </div>
      );
    };

    const UndoButton: Component<{ control: Control<PersonnelProjectDetailParams> }> = ({
      control
    }) => {
      const { isDirty } = useFormState<PersonnelProjectDetailParams>({ control });

      const { openConfirmCloseBox, ConfirmCloseBox } = useConfirmCloseBox(
        () => reset(),
        UNDO_NOTIFICATION
      );

      return (
        <>
          <Button
            color='teal'
            variant='text'
            className='flex items-center justify-center gap-2 col-span-2 bg-teal-50 hover:bg-teal-100 rounded-full normal-case'
            disabled={!isDirty}
            onClick={openConfirmCloseBox}
          >
            <ArrowUturnLeftIcon strokeWidth={2} className='w-4 h-4' />
            <span className='text-base'>Hoàn tác</span>
          </Button>
          <ConfirmCloseBox />
        </>
      );
    };

    const CloseButton: Component<{ control: Control<PersonnelProjectDetailParams> }> = ({
      control
    }) => {
      const { isDirty } = useFormState<PersonnelProjectDetailParams>({ control });

      const { openConfirmCloseBox, ConfirmCloseBox } = useConfirmCloseBox(
        () => setOpen(false),
        EXIT_NOTIFICATION
      );

      return (
        <>
          <div
            className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'
            onClick={isDirty ? openConfirmCloseBox : () => setOpen(false)}
          >
            <XMarkIcon className='h-5 w-5 text-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
          <ConfirmCloseBox />
        </>
      );
    };

    return (
      <Dialog
        open={open}
        handler={handleOpen}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
      >
        <DialogHeader className='flex items-center justify-between'>
          <Typography variant='h5' className='underline underline-offset-8 text-teal-500 font-bold'>
            Chỉnh sửa nhân sự
          </Typography>
          <CloseButton control={control} />
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdatePersonnel)}>
          <DialogBody className='grid gap-4'>
            <div className='flex items-center gap-2'>
              <Avatar src={personnel.avatarUrl} alt='avatar' size='md' />
              <div className='flex flex-col items-start'>
                <Typography variant='h6' className='font-bold'>
                  {personnel.name}
                </Typography>
                <Typography variant='small' className='font-normal'>
                  {personnel.department}
                </Typography>
              </div>
            </div>
            <RoleInput control={control} name='role' />
            <DescriptionInput control={control} name='description' />
          </DialogBody>
          <DialogFooter className='grid grid-cols-5 gap-2 items-center'>
            <UndoButton control={control} />
            <Button
              type='submit'
              color='teal'
              className='col-span-3 rounded-full normal-case text-base'
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    );
  };

  return {
    openEditPersonnelBox: () => setOpen(true),
    EditPersonnelBox
  };
}
