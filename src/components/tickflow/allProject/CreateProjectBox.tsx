import { useRef, useState } from 'react';
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
  Select,
  Option,
  Typography
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SearchMember as SearchTeamLeader } from '@components/tickflow';
import { ScreenSize, PROJECT_STATUS, PROJECT_TIME } from '@constants';
import { useScreenSize, useQueryProject } from '@hooks';
import { memberSearchService, projectSearchService } from '@services';
import { useProjectGeneralStore, useFilterProjectStore } from '@states';
import { manipulateTime, fromToNow, timeCurrent } from '@utils';

export function useCreateProjectBox() {
  const [open, setOpen] = useState<boolean>(false);
  const { createProject } = useProjectGeneralStore();
  const { status, timeInterval } = useFilterProjectStore();
  const { screenSize } = useScreenSize();
  const { projectParam } = useQueryProject();
  const isResetLeaderName = useRef<boolean>(true);
  const selectedLeaderName = useRef<boolean>(false);

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg';
  const desktopStyle = 'self-center rounded-lg';

  const handleOpen = () => setOpen((cur) => !cur);

  const isDuplicateProjectName = async (projectName: string) => {
    const searchParam: ProjectSearchParam = {
      name: '',
      status: status
    };
    if (timeInterval !== PROJECT_TIME[0]) {
      const startDateToNow = fromToNow(manipulateTime[timeInterval]);
      const current = timeCurrent();
      searchParam.fromTime = startDateToNow;
      searchParam.toTime = current;
    }
    const projectNameList = await projectSearchService.search(searchParam);
    return projectNameList.some((project) => project.name === projectName);
  };

  const isExitLeaderName = async (leaderName: string) => {
    if (selectedLeaderName.current) {
      return true;
    }
    try {
      const memberNameList: SearchMember[] = await memberSearchService.searchByName('');
      const targetMember = {
        isExit: false,
        id: ''
      };
      for (const member of memberNameList) {
        if (member.name === leaderName) {
          targetMember.isExit = true;
          targetMember.id = member.id;
          break;
        }
      }
      if (targetMember.isExit && selectedLeaderName.current === false) {
        setValue('memberId', targetMember.id);
      }
      return targetMember.isExit;
    } catch (err) {
      throw (err as ResponseError).message;
    }
  };

  const checkFormError = async (projectName: string, leaderName: string) => {
    const projectError = {
      type: 'custom',
      message: 'Tên dự án đã tồn tại'
    };
    const leaderError = {
      type: 'custom',
      message: 'Không tồn tại thành viên này'
    };
    const duplicateProjectName: boolean = await isDuplicateProjectName(projectName);
    const exitLeaderName: boolean = await isExitLeaderName(leaderName);

    if (duplicateProjectName && !exitLeaderName) {
      setError('name', projectError, { shouldFocus: true });
      setError('memberId', leaderError, { shouldFocus: true });
      return false;
    } else if (duplicateProjectName) {
      setError('name', projectError, { shouldFocus: true });
      return false;
    } else if (!exitLeaderName) {
      setError('memberId', leaderError, { shouldFocus: true });
      return false;
    } else {
      return true;
    }
  };

  const validateSchema = yup.object({
    name: yup.string().required('Vui lòng nhập tên dự án'),
    memberId: yup.string().required('Vui lòng nhập tên trưởng nhóm')
  }) as yup.ObjectSchema<ProjectCreationParams>;

  const { handleSubmit, setValue, setError, control, reset } = useForm<ProjectCreationParams>({
    defaultValues: {
      name: '',
      status: PROJECT_STATUS[0],
      memberId: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const handleAddProject = async (project: ProjectCreationParams) => {
    const hasFormError = await checkFormError(project.name, project.memberId);
    if (!hasFormError) {
      return;
    }
    handleOpen();
    await createProject(project, projectParam);
    reset();
    isResetLeaderName.current = true;
  };

  const ProjectNameInput: Component<{
    control: Control<ProjectCreationParams>;
    name: keyof ProjectCreationParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<ProjectCreationParams>({ control, name });
    return (
      <div>
        <Input
          {...field}
          error={error?.message ? true : false}
          size='md'
          label='Tên dự án'
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
    control: Control<ProjectCreationParams>;
    name: keyof ProjectCreationParams;
  }> = ({ control, name }) => {
    const { field } = useController<ProjectCreationParams>({ control, name });
    return (
      <Select
        {...field}
        className='z-50'
        label='Trạng thái'
        value={field.value}
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

  const TeamLeaderInput: Component<{
    control: Control<ProjectCreationParams>;
    name: keyof ProjectCreationParams;
  }> = ({ control, name }) => {
    const {
      field,
      fieldState: { error }
    } = useController<ProjectCreationParams>({ control, name });
    return (
      <div>
        <SearchTeamLeader
          field={field}
          error={error?.message ? true : false}
          setValue={(memberId: string) => setValue('memberId', memberId)}
          isResetLeaderName={isResetLeaderName}
          selectedLeaderName={selectedLeaderName}
        />
        {error?.message && (
          <Typography color='red' variant='small'>
            {error.message}{' '}
          </Typography>
        )}
      </div>
    );
  };

  return {
    openCreateProjectBox: () => handleOpen(),
    CreateProjectBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={open}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'sm'}
        handler={() => {
          handleOpen();
          reset();
          isResetLeaderName.current = true;
        }}
      >
        <DialogHeader className='grid grid-cols-11 pt-8'>
          <div className='col-span-7 text-teal-500 font-bold border-b-2 border-teal-500'>
            Thêm dự án mới
          </div>
          <div
            className='col-span-4 flex justify-self-end p-2 hover:bg-gray-300 rounded-full w-fit cursor-pointer'
            onClick={() => {
              handleOpen();
              reset();
              isResetLeaderName.current = true;
            }}
          >
            <XMarkIcon className='h-5 w-5 text-gray-400 hover:text-gray-700' strokeWidth={3} />
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddProject)} autoComplete='off'>
          <DialogBody className='grid border-0 gap-4' divider>
            <ProjectNameInput control={control} name='name' />
            <StatusSelect control={control} name='status' />
            <TeamLeaderInput control={control} name='memberId' />
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
