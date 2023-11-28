import { useMemo, useState } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
  Typography
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ScreenSize, MEMBER_STATUS, MEMBER_ROLE } from '@constants';
import { useScreenSize, useQueryMember } from '@hooks';
import { useMemberGeneralStore } from '@states';

export function useCreateMemberBox() {
  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg';
  const desktopStyle = 'self-center rounded-lg';

  const validateSchema = yup.object({
    name: yup.string().required('Vui lòng nhập tên thành viên'),
    roles: yup.string().required('Vui lòng chọn vai trò thành viên')
  }) as yup.ObjectSchema<MemberCreationParams>;

  const { handleSubmit, control, reset } = useForm<MemberCreationParams>({
    defaultValues: {
      name: '',
      status: MEMBER_STATUS[0],
      roles: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { screenSize } = useScreenSize();
  const { createMember } = useMemberGeneralStore();
  const { memberParam } = useQueryMember();

  const handleOpen = useMemo(() => () => setOpenDialog(!openDialog), [openDialog]);

  const handleAddMember = useMemo(
    () => async (member: MemberCreationParams) => {
      handleOpen();
      await createMember(member, memberParam);
      reset();
    },
    [createMember, handleOpen, memberParam, reset]
  );

  const MemberNameInput: Component<{
    control: Control<MemberCreationParams>;
    name: keyof MemberCreationParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<MemberCreationParams>({ control, name });
    return (
      <div>
        <Input
          {...field}
          error={error?.message ? true : false}
          size='md'
          label='Tên thành viên'
          labelProps={{ className: 'text-gray-400' }}
        />
        {error?.message && (
          <Typography color='red' variant='small'>
            {error?.message}{' '}
          </Typography>
        )}
      </div>
    );
  };

  const StatusSelect: Component<{
    control: Control<MemberCreationParams>;
    name: keyof MemberCreationParams;
  }> = ({ control, name }) => {
    const { field } = useController<MemberCreationParams>({ control, name });
    return (
      <Select {...field} className='z-50' label='Trạng thái'>
        {MEMBER_STATUS.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  };

  const RoleSelect: Component<{
    control: Control<MemberCreationParams>;
    name: keyof MemberCreationParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<MemberCreationParams>({ control, name });
    return (
      <div>
        <Select {...field} error={error?.message ? true : false} className='z-50' label='Vai trò'>
          {MEMBER_ROLE.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        {error?.message && (
          <Typography color='red' variant='small'>
            {error?.message}{' '}
          </Typography>
        )}
      </div>
    );
  };

  return {
    openCreateMemberBox: () => setOpenDialog(true),
    CreateMemberBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={openDialog}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'sm'}
        handler={handleOpen}
      >
        <DialogHeader className='grid grid-cols-11 pt-8'>
          <div className='col-span-7 text-teal-500 font-bold border-b-2 border-teal-500'>
            Thêm thành viên mới
          </div>
          <div
            className='col-span-4 flex justify-self-end p-2 hover:bg-gray-300 rounded-full w-fit cursor-pointer'
            onClick={() => {
              handleOpen();
              reset();
            }}
          >
            <XMarkIcon className='h-5 w-5 text-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddMember)} autoComplete='off'>
          <DialogBody className='grid border-0 gap-4' divider>
            <MemberNameInput control={control} name='name' />
            <StatusSelect control={control} name='status' />
            <RoleSelect control={control} name='roles' />
          </DialogBody>
          <DialogFooter>
            <Button className='bg-teal-500 mr-1' type='submit'>
              <span>XÁC NHẬN</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    )
  };
}
