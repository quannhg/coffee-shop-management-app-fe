import { useState, useRef } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Option,
  Select,
  Textarea,
  Typography
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SearchPersonnelInProject } from '@components/tickflow';
import {
  ScreenSize,
  MEMBER_ROLE_REDUCED_IN_PROJECT,
  MAX_ROLE_DESCRIPTION_LENGTH
} from '@constants';
import { useScreenSize } from '@hooks';
import { memberSearchService } from '@services';
import { usePersonnelProjectGeneralStore, useProjectDetailStore } from '@states';

export function useCreatePersonnelBox() {
  const validateSchema = yup.object({
    userId: yup.string().required('Vui lòng nhập tên nhân sự'),
    role: yup.string().required('Vui lòng nhập vai trò trong dự án'),
    description: yup
      .string()
      .max(
        MAX_ROLE_DESCRIPTION_LENGTH,
        `Mô tả dự án không được vượt quá ${MAX_ROLE_DESCRIPTION_LENGTH} ký tự`
      )
  }) as yup.ObjectSchema<PersonnelProjectDetailParams>;

  const { control, handleSubmit, setValue, setError, reset } =
    useForm<PersonnelProjectDetailParams>({
      defaultValues: {
        userId: '',
        role: '',
        description: ''
      },
      resolver: yupResolver(validateSchema)
    });

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg overflow-auto';
  const desktopStyle = 'self-center rounded-lg overflow-auto';

  const selectedPersonnel = useRef<boolean>(false);
  const isResetPersonnel = useRef<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);

  const { screenSize } = useScreenSize();
  const { projectDetail } = useProjectDetailStore();
  const { personnelList, createPersonnelProject } = usePersonnelProjectGeneralStore();

  const isExistPersonnelName = async (leaderName: string) => {
    if (selectedPersonnel.current) {
      return {
        existPersonnel: true,
        doublePersonnel: false
      };
    }
    try {
      const memberNameList: SearchMember[] = await memberSearchService.searchByName('');
      const targetMember = {
        isExist: false,
        id: ''
      };
      for (const member of memberNameList) {
        if (member.name === leaderName) {
          targetMember.isExist = true;
          for (const personnel of personnelList.data) {
            if (personnel.name === leaderName) {
              return {
                existPersonnel: true,
                doublePersonnel: true
              };
            } else {
              targetMember.id = member.id;
              break;
            }
          }
        }
      }
      if (targetMember.isExist && selectedPersonnel.current === false) {
        setValue('userId', targetMember.id);
      }
      return {
        existPersonnel: targetMember.isExist,
        doublePersonnel: false
      };
    } catch (err) {
      throw (err as ResponseError).message;
    }
  };

  const checkFormError = async (leaderName: string) => {
    const personnelError = {
      type: 'custom',
      message: 'Không tồn tại thành viên này'
    };
    const doublePersonnelError = {
      type: 'custom',
      message: 'Nhân sự này đã có trong dự án'
    };
    const existPersonnelName: { existPersonnel: boolean; doublePersonnel: boolean } =
      await isExistPersonnelName(leaderName);

    if (!existPersonnelName.existPersonnel) {
      setError('userId', personnelError, { shouldFocus: true });
      return true;
    }
    if (existPersonnelName.doublePersonnel) {
      setError('userId', doublePersonnelError, { shouldFocus: true });
      return true;
    }
    return false;
  };

  const handleAddPersonnel = async (personnel: PersonnelProjectDetailParams) => {
    const hasFormError = await checkFormError(personnel.userId);
    if (hasFormError) {
      return;
    }
    setOpen(false);
    await createPersonnelProject(projectDetail.id, personnel);
    reset();
    isResetPersonnel.current = true;
  };

  const PersonnelInput: Component<{
    control: Control<PersonnelProjectDetailParams>;
    name: keyof PersonnelProjectDetailParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<PersonnelProjectDetailParams>({ control, name });
    return (
      <div>
        <SearchPersonnelInProject
          field={field}
          error={error?.message ? true : false}
          selectedPersonnel={selectedPersonnel}
          isResetPersonnel={isResetPersonnel}
          setValue={(userId: string) => setValue('userId', userId)}
        />
        {error?.message && (
          <Typography color='red' variant='small'>
            {error.message}{' '}
          </Typography>
        )}
      </div>
    );
  };

  const RoleInput: Component<{
    control: Control<PersonnelProjectDetailParams>;
    name: keyof PersonnelProjectDetailParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<PersonnelProjectDetailParams>({ control, name });
    return (
      <div>
        <Select {...field} error={error?.message ? true : false} label='Vai trò'>
          {MEMBER_ROLE_REDUCED_IN_PROJECT.map((role, index) => (
            <Option key={index} value={role}>
              {role}
            </Option>
          ))}
        </Select>
        {error?.message && (
          <Typography color='red' variant='small'>
            {error.message}{' '}
          </Typography>
        )}
      </div>
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
            {field.value.length} / {MAX_ROLE_DESCRIPTION_LENGTH} characters
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

  return {
    openCreatePersonnelBox: () => setOpen(true),
    CreatePersonnelBox: () => (
      <Dialog
        open={open}
        handler={handleOpen}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
      >
        <DialogHeader className='flex items-center justify-between'>
          <Typography variant='h5' className='underline underline-offset-8 text-teal-500 font-bold'>
            Thêm nhân sự
          </Typography>
          <div
            className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'
            onClick={() => {
              setOpen(false);
              reset();
              isResetPersonnel.current = true;
            }}
          >
            <XMarkIcon className='h-5 w-5 text-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddPersonnel)} autoComplete='off'>
          <DialogBody className='grid gap-4'>
            <PersonnelInput control={control} name='userId' />
            <RoleInput control={control} name='role' />
            <DescriptionInput control={control} name='description' />
          </DialogBody>
          <DialogFooter className='justify-center'>
            <Button type='submit' color='teal' className='w-full'>
              <span>Xác nhận</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    )
  };
}
