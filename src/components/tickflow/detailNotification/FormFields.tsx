import { MultipleSelect, SearchProject } from '@components/common';
import { Typography, Input, Checkbox } from '@material-tailwind/react';
import { useDiscordRecipientsStore, useMemberListStore } from '@states';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { MultiValue } from 'react-select';

export const TextInput: TemplateField = ({ control, name, label, error, required }) => {
  const { field } = useController<FormFields>({ control, name });

  const value = typeof field.value === 'string' ? field.value : '';

  const { setValue } = useFormContext();

  return (
    <div>
      <Input
        onChange={(event) => {
          setValue(field.name, event.target.value);
        }}
        value={value}
        error={error ? true : false}
        label={label}
        required={required === 'true'}
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const TimeInput: TemplateField = ({ control, name, label, error, required }) => {
  const { field } = useController<FormFields>({ control, name });

  const [defaultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    const value = moment(Number(field.value)).format('YYYY-MM-DDTHH:MM');
    setDefaultValue(value);
  }, [field.value, setDefaultValue]);

  const { setValue } = useFormContext();

  return (
    <div>
      <Input
        onChange={(event) => {
          const day = moment(event.target.value).unix().toString();
          setValue(field.name, day);
        }}
        defaultValue={defaultValue}
        error={error ? true : false}
        label={label}
        type='datetime-local'
        required={required === 'true'}
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const UrlInput: TemplateField = ({ control, name, label, error, required }) => {
  const { field } = useController<FormFields>({ control, name });

  const value = typeof field.value === 'string' ? field.value : '';

  const { setValue } = useFormContext();

  return (
    <div>
      <Input
        onChange={(event) => {
          setValue(field.name, event.target.value);
        }}
        value={value}
        error={error ? true : false}
        label={label}
        required={required === 'true'}
        type='url'
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const MemberSelect: TemplateField = ({ control, name, label, error, required }) => {
  const { field } = useController<FormFields>({ control, name });

  const { setValue } = useFormContext<FormFields>();

  const { memberList, getMemberList } = useMemberListStore();

  useEffect(() => {
    getMemberList();
  }, [getMemberList]);

  const defaultValue: { label: string; value: string }[] = [];
  Array.isArray(field.value)
    ? field.value.forEach((member) => {
        if (typeof member.name === 'string' && typeof member.id === 'string')
          defaultValue.push({ label: member.name, value: member.id });
      })
    : [];

  const handelOnchange = (option: MultiValue<{ label: string; value: string }>) => {
    const value = option.map((channel) => ({ id: channel.value, name: channel.label }));
    setValue(name, value);
  };

  return (
    <div>
      <MultipleSelect
        name={name}
        label={label}
        options={memberList.map((member) => ({ label: member.name, value: member.id }))}
        defaultValues={defaultValue}
        handleOnchange={handelOnchange}
        require={required === 'true'}
        error={error ? true : false}
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const ProjectSelect: TemplateField = ({ control, name, label, error, required }) => {
  const {
    field: { value }
  } = useController<FormFields>({ control, name });

  const { setValue } = useFormContext<FormFields>();

  const setProjectName = (value: Record<string, string>) => setValue(name, value);

  const getModifiedValue = (): Record<string, string> | undefined => {
    if (
      typeof value === 'object' &&
      'id' in value &&
      'name' in value &&
      typeof value.name === 'string' &&
      typeof value.id === 'string'
    ) {
      return { name: value.name, id: value.id };
    } else {
      return undefined;
    }
  };

  return (
    <div>
      <SearchProject
        label={label}
        error={error ? true : false}
        setObjectValue={setProjectName}
        value={getModifiedValue()}
        required={required === 'true'}
      />
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const CheckBoxField: TemplateField = ({ control, name, label, error, required }) => {
  const CheckBoxGroup: Component = () => {
    const { field } = useController<FormFields>({ control, name });
    const { setValue, watch } = useFormContext<FormFields>();

    const ExtendInput: Component<{ name: string; extendInputs: FormField }> = ({
      name,
      extendInputs
    }) => {
      const isSelected = useWatch<FormFields>({ name: `${name}.isSelected` });

      return (
        <>
          {Array.isArray(extendInputs) &&
            extendInputs.map((input, i) => {
              if (isSelected === 'true' || !(input.toggle === 'true'))
                if (typeof input.formType === 'string' && input.formType in FormFieldElements) {
                  const Element = FormFieldElements[input.formType];
                  return (
                    <Element
                      key={i}
                      control={control}
                      name={`${name}.extendedInput[${i}].data`}
                      label={input.placeholder.toString()}
                      required={input.required?.toString()}
                      error={input.error?.toString()}
                    />
                  );
                }
            })}
        </>
      );
    };

    return (
      <div className='min-w-full'>
        {Array.isArray(field.value) &&
          field.value.map((checkboxValue, i) => (
            <div key={i}>
              <Checkbox
                color='blue-gray'
                label={typeof checkboxValue.name === 'string' ? checkboxValue.name : ''}
                labelProps={{ className: 'text-sm font-medium' }}
                onChange={() => {
                  const currentValue = checkboxValue.isSelected;
                  if (currentValue === 'true') setValue(`${name}[${i}].isSelected`, 'false');
                  else if (currentValue === 'false') setValue(`${name}[${i}].isSelected`, 'true');
                }}
                defaultChecked={watch(`${name}.${i}.isSelected`) === 'true' ? true : false}
              />
              <ExtendInput name={`${name}[${i}]`} extendInputs={checkboxValue.extendedInput} />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <Typography className='bg-blue-gray-50 pl-3 py-2 text-sm font-semibold text-blue-gray-500'>
        {label} {required === 'true' && <span className='text-red-500'>*</span>}
      </Typography>

      <div className='flex justify-around'>
        <CheckBoxGroup />
      </div>
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const RecipientsSelect: TemplateField = ({ control, name, label, error, required }) => {
  const { reset, getValues } = useFormContext<FormFields>();

  const ChannelSelect: Component = () => {
    const {
      field: { value }
    } = useController<FormFields>({ control, name: `${name}.channelId` });

    const { channelList, getChannelList } = useDiscordRecipientsStore();
    useEffect(() => {
      getChannelList();
    }, [getChannelList]);

    const defaultValue: { label: string; value: string }[] = [];
    if (Array.isArray(value)) {
      value.map((channel) => {
        defaultValue.push({ label: channel.name.toString(), value: channel.id.toString() });
      });
    }

    const option = channelList.map((channel) => ({ label: channel.name, value: channel.id }));

    const handelOnchange = (option: MultiValue<{ label: string; value: string }>) => {
      const value = option.map((channel) => ({ id: channel.value, name: channel.label }));

      const fieldValues = getValues(name);
      if (typeof fieldValues === 'object' && fieldValues !== null) {
        reset({
          ...getValues(),
          [name]: {
            ...fieldValues,
            channelId: value
          }
        });
      } else {
        reset({
          ...getValues(),
          [name]: {
            channelId: value
          }
        });
      }
    };

    return (
      <MultipleSelect
        name='channelId'
        label='Chọn kênh'
        options={option}
        defaultValues={defaultValue.length > 0 ? defaultValue : undefined}
        handleOnchange={handelOnchange}
        require={required === 'true'}
      />
    );
  };

  const MemberSelect: Component = () => {
    const {
      field: { value }
    } = useController<FormFields>({ control, name: `${name}.otherAccount` });

    const { memberList, getMemberList } = useDiscordRecipientsStore();
    useEffect(() => {
      getMemberList();
    }, [getMemberList]);

    const defaultValue: { label: string; value: string }[] = [];
    if (Array.isArray(value)) {
      value.map((member) => {
        defaultValue.push({ label: member.name.toString(), value: member.id.toString() });
      });
    }

    const option = memberList.map((member) => ({ label: member.name, value: member.discordId }));

    const handleOnchange = (option: MultiValue<{ label: string; value: string }>) => {
      const value = option.map((member) => ({ id: member.value, name: member.label }));

      const fieldValues = getValues(name);
      if (typeof fieldValues === 'object' && fieldValues !== null) {
        reset({
          ...getValues(),
          [name]: {
            ...fieldValues,
            otherAccount: value
          }
        });
      } else {
        reset({
          ...getValues(),
          [name]: {
            otherAccount: value
          }
        });
      }
    };

    return (
      <MultipleSelect
        name='otherAccount'
        label='Chọn người nhận'
        options={option}
        defaultValues={defaultValue.length > 0 ? defaultValue : undefined}
        handleOnchange={handleOnchange}
        require={required === 'true'}
      />
    );
  };

  return (
    <div>
      <Typography className='bg-blue-gray-50 pl-3 py-2 text-sm font-semibold text-blue-gray-500'>
        {label} {required === 'true' && <span className='text-red-500'>*</span>}
      </Typography>
      <Typography
        className={
          ' px-3 mt-1.5 mb-1.5 text-sm font-semibold ' +
          (error ? ' text-red-500' : ' text-blue-gray-500')
        }
      >
        {'Discord '}
        {required === 'true' && <span className='text-red-500'>*</span>}
      </Typography>
      <div className='flex flex-col gap-3'>
        <ChannelSelect />
        <MemberSelect />
      </div>
      {error && (
        <Typography color='red' variant='small'>
          {error}{' '}
        </Typography>
      )}
    </div>
  );
};

export const FormFieldElements: ElementType = {
  text: TextInput,
  'unix-time': TimeInput,
  url: UrlInput,
  'search-members': MemberSelect,
  'search-project-name': ProjectSelect,
  'check-box': CheckBoxField,
  'recipients-select': RecipientsSelect
};
