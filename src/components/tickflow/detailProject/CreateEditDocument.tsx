import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useForm, useController, Control, useFormContext, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { useDetailProjectMaterialsStore } from '@states';
import CreatableSelect from 'react-select/creatable';
import { FloatingLabel } from '@components/common';
import { ControlProps, GroupBase, components } from 'react-select';
const documents = [
  {
    id: '1',
    projectId: 'string',
    materialId: 'string',
    name: 'string1',
    createDay: 13112342,
    url: 'string'
  },
  {
    id: '2',
    projectId: 'string',
    materialId: 'string',
    name: 'string2',
    createDay: 13112342,
    url: 'string'
  },
  {
    id: '3',
    projectId: 'string',
    materialId: 'string',
    name: 'string3',
    createDay: 13112342,
    url: 'string'
  }
];

const options = documents.map((document) => ({ label: document.name, value: document.name }));

const DocumentNameInput: Component<{
  control?: Control<ProjectDocumentParams>;
  name: keyof ProjectDocumentParams;
  error?: boolean;
}> = ({ control, name, error }) => {
  const { setValue } = useFormContext<ProjectDocumentParams>();
  const {
    field: { value }
  } = useController({ control, name });

  const defaultValue: { label: string; value: string } = {
    label: value ? value : '',
    value: value ? value : ''
  };

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
          className='bg-white px-1 py-0'
          htmlFor='productTypeSelect'
          isfloating={(props.isFocused || props.hasValue).toString()}
          isfocusing={props.isFocused.toString()}
          errorcolor={error ? 'true' : 'false'}
        >
          {'Tên tài liệu'} {<span className='text-red-500'>*</span>}
        </FloatingLabel>
      </div>
    );
  };

  return (
    <div>
      <CreatableSelect
        id={name}
        options={options}
        value={defaultValue}
        noOptionsMessage={() => 'Không có lựa chọn'}
        onChange={(option) => {
          if ('value' in option && typeof option.value === 'string') setValue(name, option.value);
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: error ? 'red' : '#b0bec5',
            borderRadius: '7px'
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: error ? 'red' : '#607d8b'
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            fontFamily: 'sans-serif',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            color: '#455a64'
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
            zIndex: '50',

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
          input: () => 'peer/i'
        }}
        placeholder=''
        components={{
          Control: Control
        }}
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

const DocumentDescriptionInput: Component<{
  control: Control<ProjectDocumentParams>;
  name: keyof ProjectDocumentParams;
}> = ({ control, name }) => {
  const {
    field,
    fieldState: { error }
  } = useController<ProjectDocumentParams>({ control, name });
  return (
    <div>
      <Input
        {...field}
        error={error?.message ? true : false}
        label='Đường dẫn'
        labelProps={{ className: 'text-gray-400' }}
        required={true}
        type='url'
      />
      {error?.message && (
        <Typography color='red' variant='small'>
          {error?.message}{' '}
        </Typography>
      )}
    </div>
  );
};

export function useCreateDocumentBox() {
  const [open, setOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg ';
  const desktopStyle = 'self-center rounded-lg';

  const handleOpen = () => setOpen((cur) => !cur);

  const validateSchema = yup.object({}) as yup.ObjectSchema<ProjectDocumentParams>;

  const methods = useForm<ProjectDocumentParams>({
    defaultValues: { name: '', url: '' },
    resolver: yupResolver(validateSchema)
  });

  const { handleSubmit, control, reset } = methods;

  const Form = () => {
    const { addDocument } = useDetailProjectMaterialsStore();

    const handleAddProject = async (project: ProjectDocumentParams) => {
      addDocument(project);
      handleOpen();
      reset();
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAddProject)} autoComplete='off'>
          <DialogBody className='border-0 flex flex-col gap-4' divider>
            <DocumentNameInput name='name' />
            <DocumentDescriptionInput control={control} name='url' />
          </DialogBody>
          <DialogFooter className='pt-4 py-0 pb-4'>
            <Button className='normal-case bg-teal-500 p-2 w-full' type='submit'>
              <span className='text-sm font-semibold'>Xác nhận</span>
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    );
  };

  return {
    openAddDocumentBox: () => handleOpen(),
    AddDocumentBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={open}
        size={screenSize === ScreenSize.MOBILE ? 'xxl' : 'sm'}
        handler={handleOpen}
      >
        <DialogHeader className='pt-4 pb-0 flex justify-between'>
          <div className=''>
            <Typography className='mr-10 text-teal-500 font-bold border-b-2 border-teal-500 text-lg'>
              Tạo tài liệu
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

export function useEditDocumentBox() {
  const [open, setOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();

  const mobileStyle = 'self-center min-w-full rounded-none rounded-t-lg ';
  const desktopStyle = 'self-center rounded-lg';

  const handleOpen = () => setOpen((cur) => !cur);

  const [documentIndex, setDocumentIndex] = useState(0);

  const { documents } = useDetailProjectMaterialsStore().material;

  const validateSchema = yup.object({}) as yup.ObjectSchema<ProjectDocumentParams>;

  const methods = useForm<ProjectDocumentParams>({
    defaultValues: { name: '', url: '' },
    resolver: yupResolver(validateSchema)
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset({ name: documents[documentIndex].name, url: documents[documentIndex].url });
  }, [documentIndex, documents, reset]);

  const Form = () => {
    const { editDocument } = useDetailProjectMaterialsStore();

    const handleAddProject = async (project: ProjectDocumentParams) => {
      editDocument(project);
      handleOpen();
      reset();
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAddProject)} autoComplete='off'>
          <DialogBody className='border-0 flex flex-col gap-4' divider>
            <DocumentNameInput control={control} name='name' />
            <DocumentDescriptionInput control={control} name='url' />
          </DialogBody>
          <DialogFooter className='pt-4 py-0 pb-4'>
            <Button className='normal-case bg-teal-500 p-2 w-full' type='submit'>
              <span className='text-sm font-semibold'>Lưu thay đổi</span>
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    );
  };

  return {
    openEditDocumentBox: (index: number) => {
      setDocumentIndex(index);
      handleOpen();
    },
    EditDocumentBox: () => (
      <Dialog
        className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
        open={open}
        size={screenSize === ScreenSize.MOBILE ? 'xxl' : 'sm'}
        handler={handleOpen}
      >
        <DialogHeader className='pt-4 pb-0 flex justify-between'>
          <div className=''>
            <Typography className='mr-10 text-teal-500 font-bold border-b-2 border-teal-500 text-lg'>
              Chỉnh sửa tài liệu
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
