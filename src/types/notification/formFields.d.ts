type FormType =
  | 'text'
  | 'url'
  | 'search-members'
  | 'search-project-name'
  | 'time'
  | 'check-box'
  | 'none'
  | 'recipients-select';

type FormTemplate = {
  name: string;
  formType: FormType;
  data: FormField;
  placeholder: string;
  required?: string;
  error?: string;
}[];

type TemplateField = Component<{
  control: Control<FormFields>;
  name: keyof FormFields;
  label: string;
  type?: string;
  error?: string;
  required?: string;
}>;

type ElementType = {
  [key: string]: TemplateField;
};

type CheckBox = Record<string, string | Record<string, string>[]>;

type FormField =
  | string
  | CheckBox[]
  | Record<string, string | Record<string, string> | Record<string, string>[]>
  | Record<string, string | Record<string, string> | Record<string, string>[]>[];

type FormFields = Record<string, FormField>;
