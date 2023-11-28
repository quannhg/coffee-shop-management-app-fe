import { useState } from 'react';
import { useForm, useController, Control, useFormState } from 'react-hook-form';
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
  Select,
  Option,
  Typography,
  Textarea
} from '@material-tailwind/react';
import TagSelect, { ControlProps, GroupBase, components } from 'react-select';
import { XMarkIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import {
  ScreenSize,
  PROJECT_STATUS,
  PRODUCT_TYPES,
  UNDO_NOTIFICATION,
  EXIT_NOTIFICATION,
  MAX_ROLE_DESCRIPTION_LENGTH
} from '@constants';
import { useScreenSize } from '@hooks';
import { useProjectDetailStore } from '@states';
import { FloatingLabel, useConfirmCloseBox } from '@components/common';

export function useEditProjectBox() {
  const [open, setOpen] = useState<boolean>(false);

  const { screenSize } = useScreenSize();
  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg';
  const desktopStyle = 'self-center rounded-lg';

  const {
    avatarUrl,
    name: projectName,
    status: projectStatus,
    productType,
    description: projectDescription
  } = useProjectDetailStore().projectDetail;

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const { updateProject } = useProjectDetailStore();

  const Content = () => {
    const validateSchema = yup.object({
      name: yup.string().required('Vui lòng nhập tên dự án'),
      description: yup
        .string()
        .max(
          MAX_ROLE_DESCRIPTION_LENGTH,
          `Mô tả dự án không được vượt quá ${MAX_ROLE_DESCRIPTION_LENGTH} ký tự`
        )
    }) as yup.ObjectSchema<ProjectEditParams>;

    const { handleSubmit, setValue, control, reset } = useForm<ProjectEditParams>({
      defaultValues: {
        name: projectName,
        status: projectStatus,
        productType: productType,
        description: projectDescription,
        avatarUrl: avatarUrl
      },
      resolver: yupResolver(validateSchema)
    });

    const CloseButton: Component<{ control: Control<ProjectEditParams> }> = ({ control }) => {
      const { isDirty } = useFormState<ProjectEditParams>({ control: control });

      const { openConfirmCloseBox, ConfirmCloseBox } = useConfirmCloseBox(
        handleOpen,
        EXIT_NOTIFICATION
      );

      const handleOpenConfirmCloseBox = () => {
        if (isDirty) openConfirmCloseBox();
        else handleOpen();
      };

      return (
        <div>
          <div className='flex justify-end '>
            <XMarkIcon
              onClick={handleOpenConfirmCloseBox}
              className='h-7 w-7 p-1 text-gray-400 bg-gray-100 rounded-full cursor-pointer'
              strokeWidth={3}
            />
          </div>
          {<ConfirmCloseBox />}
        </div>
      );
    };

    const EditProjectForm = () => {
      const UndoButton: Component<{ control: Control<ProjectEditParams> }> = ({ control }) => {
        const { isDirty } = useFormState<ProjectEditParams>({ control: control });

        const { openConfirmCloseBox, ConfirmCloseBox } = useConfirmCloseBox(
          () => reset(),
          UNDO_NOTIFICATION
        );
        return (
          <div>
            <Button
              className='flex gap-2 place-self-start border-teal-500 bg-teal-200 bg-opacity-20 border-0 mr-1 text-teal-500 rounded-full'
              type='button'
              variant='outlined'
              disabled={!isDirty}
              size='md'
              onClick={openConfirmCloseBox}
            >
              <ArrowUturnLeftIcon className='w-4 h-4' />
              <span>Hoàn tác</span>
            </Button>
            {<ConfirmCloseBox />}
          </div>
        );
      };

      const SaveButton: Component<{ control: Control<ProjectEditParams> }> = ({ control }) => {
        const { isDirty } = useFormState<ProjectEditParams>({ control: control });
        return (
          <Button
            className='bg-teal-500 mr-1 rounded-full px-14'
            type='submit'
            size='lg'
            disabled={!isDirty}
          >
            <span>Lưu thay đổi</span>
          </Button>
        );
      };

      const ProjectNameInput: Component<{
        control: Control<ProjectEditParams>;
        name: keyof ProjectEditParams;
      }> = ({ control, name }) => {
        const {
          field,
          fieldState: { error }
        } = useController<ProjectEditParams>({ control, name });
        return (
          <div>
            <Input
              {...field}
              value={field.value ?? ''}
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
        control: Control<ProjectEditParams>;
        name: keyof ProjectEditParams;
      }> = ({ control, name }) => {
        const { field } = useController<ProjectEditParams>({ control, name });
        return (
          <Select
            {...field}
            label='Trạng thái'
            value={Array.isArray(field.value) ? field.value[0] : field.value ?? ''}
            onChange={(e) => {
              e && setValue(field.name, e, { shouldDirty: true });
            }}
          >
            {PROJECT_STATUS.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        );
      };

      const ProductTypeSelect: Component<{
        control: Control<ProjectEditParams>;
        name: keyof ProjectEditParams;
      }> = ({ control, name }) => {
        const { field } = useController<ProjectEditParams>({ control, name });

        const Control = (
          props: ControlProps<
            {
              label: string;
              value: string;
            },
            true,
            GroupBase<{
              label: string;
              value: string;
            }>
          >
        ) => {
          return (
            <div className='group'>
              <components.Control {...props} className='peer/x' />
              <FloatingLabel
                className='bg-white px-1 py-0 peer-focus/i:bg-red-500 peer-focus/x:bg-red-500 group-focus:bg-red-500'
                htmlFor='productTypeSelect'
                isfloating={(props.isFocused || props.hasValue).toString()}
                isfocusing={props.isFocused.toString()}
              >
                Loại sản phẩm
              </FloatingLabel>
            </div>
          );
        };

        return (
          <div>
            <TagSelect
              id='productTypeSelect'
              options={PRODUCT_TYPES.map((item, index) => ({
                ...item,
                key: index.toString()
              }))}
              value={
                Array.isArray(field.value)
                  ? field.value.map((item) => ({ label: item, value: item }))
                  : null
              }
              isMulti
              onChange={(option) =>
                setValue(
                  field.name,
                  Array.isArray(option) ? option.map((item) => item.value) : [],
                  {
                    shouldDirty: true
                  }
                )
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: '#b0bec5',
                  borderRadius: '7px'
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: '#607d8b'
                }),
                input: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: 'sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  color: '#455a64'
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: 'sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  color: '#455a64'
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: 'sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  color: '#78909c'
                }),
                multiValue: () => ({
                  display: 'flex',
                  border: 'solid',
                  borderWidth: '1px',
                  borderColor: '#b0bec5',
                  margin: '0.2em',
                  paddingInline: '0.2em'
                }),
                menu: (provided) => ({
                  ...provided,
                  paddingTop: '9px',
                  paddingBottom: '0.5rem',
                  paddingInline: '0.75rem',
                  borderRadius: 5,
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  shadowColor: 'rgb(96 125 139 / 0.1)',

                  marginBottom: 0
                }),
                option: (provided, state) => ({
                  ...provided,
                  paddingTop: '9px',
                  paddingBottom: '0.5rem',
                  paddingInline: '0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: state.isFocused ? '#eceff1' : 'white',
                  color: state.isFocused ? '#263238' : '#78909c'
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: '#90a4ae'
                })
              }}
              classNames={{
                control: () => 'peer pt-1 h-full w-full',
                input: () => 'peer/i',
                multiValue: () => 'rounded-full'
              }}
              placeholder=''
              components={{
                Control: Control
              }}
            />
          </div>
        );
      };

      const ProjectDescriptionInput: Component<{
        control: Control<ProjectEditParams>;
        name: keyof ProjectEditParams;
      }> = ({ control, name }) => {
        const {
          field,
          fieldState: { error }
        } = useController<ProjectEditParams>({ control, name });
        return (
          <div>
            <div className='relative'>
              <Textarea
                {...field}
                value={field.value ?? ''}
                error={error?.message ? true : false}
                className='overflow-auto max-w-full pb-5'
                label='Mô tả dự án'
              />
              <div className='absolute min-w-[97%] text-right bottom-2.5 right-2 text-blue-gray-600 text-[0.875rem] bg-white'>
                {field.value.length} / {MAX_ROLE_DESCRIPTION_LENGTH}
              </div>
            </div>
            {error?.message && (
              <Typography color='red' variant='small'>
                {error?.message}{' '}
              </Typography>
            )}
          </div>
        );
      };

      const handleUpdateProject = async (data: ProjectEditParams) => {
        await updateProject(data);
        handleOpen();
      };

      return (
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <DialogBody className='grid border-0 gap-4' divider>
            <Avatar className='justify-self-center' src={avatarUrl} alt='user' size='xxl' />
            <ProjectNameInput control={control} name='name' />
            <StatusSelect control={control} name='status' />
            <ProductTypeSelect control={control} name='productType' />
            <ProjectDescriptionInput control={control} name='description' />
          </DialogBody>
          <DialogFooter className='flex justify-between'>
            <UndoButton control={control} />

            <SaveButton control={control} />
          </DialogFooter>
        </form>
      );
    };

    return (
      <>
        <DialogHeader className='flex justify-between pt-6'>
          <div className='text-teal-500 font-bold border-b-2 border-teal-500 flex justify-start'>
            Chỉnh sửa dự án
          </div>
          <CloseButton control={control} />
        </DialogHeader>
        <EditProjectForm />
      </>
    );
  };

  return {
    openEditProjectBox: () => handleOpen(),
    CreateEditProjectBox: () => (
      <div>
        <Dialog
          className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
          open={open}
          size={screenSize === ScreenSize.MOBILE ? 'xl' : 'sm'}
          handler={handleOpen}
          dismiss={
            {
              outsidePress: false
            } as DismissProps
          }
        >
          <Content />
          {/*body and footer in here */}
        </Dialog>
      </div>
    )
  };
}
