import TagSelect, { ControlProps, GroupBase, MultiValue, components } from 'react-select';
import { FloatingLabel } from './Label.style';
import { Typography } from '@material-tailwind/react';

export const MultipleSelect: Component<{
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  defaultValues?: { label: string; value: string }[];
  error?: boolean;
  require?: boolean;
  handleOnchange: (value: MultiValue<{ label: string; value: string }>) => void;
}> = ({ name, label, options, defaultValues, error, require, handleOnchange }) => {
  //FIXME: Error change when pass props

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
          {label} {require && <span className='text-red-500'>*</span>}
        </FloatingLabel>
      </div>
    );
  };

  return (
    <div>
      <TagSelect
        id={name}
        options={options}
        isMulti={true}
        noOptionsMessage={() => 'Không có lựa chọn'}
        value={defaultValues}
        onChange={(option) => {
          handleOnchange(option);
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
          input: () => 'peer/i',
          multiValue: () => 'rounded-full'
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
