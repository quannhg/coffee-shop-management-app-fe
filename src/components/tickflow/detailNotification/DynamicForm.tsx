import { useForm, FormProvider } from 'react-hook-form';
import { useFormData, useNotificationDetailStore } from '@states';
import { FormFieldElements, RecipientsSelect } from '@components/tickflow';
import { NUMBER_OF_STEP_SENDING_NOTIFICATION, ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { Button, Progress, Typography } from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export function DynamicForm() {
  const { screenSize } = useScreenSize();
  const { sendingStep, setSendingStep, setEditorReadOnly } = useNotificationDetailStore();

  const { templateId, fields, haveError, validateFields, updateFields, getMarkdown } =
    useFormData();

  const methods = useForm<FormFields>();
  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    const calculateDefaultValues = () => {
      const defaultValues = fields.reduce((acc, field) => {
        acc[field.name.toString()] = field.data;
        return acc;
      }, {} as FormFields);
      reset(defaultValues);
    };
    calculateDefaultValues();
  }, [fields, reset]);

  const GenerateForm = () => {
    return fields.map((field, index) => {
      const { formType, placeholder: label, name, error, required } = field;
      if (formType in FormFieldElements) {
        const Element = FormFieldElements[formType];
        return (
          <Element
            key={index}
            name={name}
            label={label}
            control={control}
            error={error}
            required={required}
          />
        );
      }
    });
  };

  const handleData = async (data: FormFields) => {
    updateFields(data);
    await validateFields();
    if (haveError) {
      return;
    }
    await getMarkdown(templateId);
    setSendingStep(2);
    setEditorReadOnly(false);
  };

  return (
    <form className='flex flex-col h-full pt-3 px-3' onSubmit={handleSubmit(handleData)}>
      <div className='flex flex-col gap-4'>
        <FormProvider {...methods}>
          {GenerateForm()}{' '}
          <RecipientsSelect
            name={'recipients'}
            label={'Nền tảng gửi'}
            control={control}
            required={'true'}
          />
        </FormProvider>
      </div>

      <div className='flex items-center justify-between pt-3 mb-2 mx-2'>
        <Button
          tabIndex={-1}
          variant='text'
          color='teal'
          className='flex items-center rounded-full bg-teal-50 hover:bg-teal-100'
          type='submit'
        >
          {screenSize <= ScreenSize.MD ? (
            <>
              <span className='normal-case text-sm'>Tiếp theo</span>
              <ChevronRightIcon strokeWidth={3} className='w-4 h-4' />
            </>
          ) : (
            <span className='normal-case text-sm'>Cập nhật</span>
          )}
        </Button>
        {screenSize <= ScreenSize.MD && (
          <div className='flex flex-col items-end'>
            <Typography variant='small' color='gray' className='font-semibold sm:text-2xl'>
              {sendingStep} of {NUMBER_OF_STEP_SENDING_NOTIFICATION}
            </Typography>
            <Progress
              size='sm'
              value={(sendingStep / NUMBER_OF_STEP_SENDING_NOTIFICATION) * 100}
              className='w-20'
            />
          </div>
        )}
      </div>
    </form>
  );
}
