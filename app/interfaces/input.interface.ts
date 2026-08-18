

export interface CustomInputProps {
  inputType: string;
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface CustomTextAreaProps {
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxChar?: number;
}

export interface CustomSelectProps {
  inputName: string;
  placeholder: string;
  value?: number | string | null;
  error?: string;
  onChange?: (value: number | string) => void;
  onBlur?: () => void;
  options: IOption[];
}

export interface CustomMultiSelectProps {
  inputName: string;
  label?: string;
  placeholder: string;
  value?: number[];
  error?: string;
  onChange?: (values: number[]) => void;
  onBlur?: () => void;
  options: IOption[];
}

export interface IOption {
  _id: string;
  value: number;
  name: string;
  avatar?: string;
}
export interface CustomCalendarInputProps {
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export interface TagsSelectProps {
  inputName: string;
  value?: string[];
  error?: string;
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  options: string[];
}

export enum InputEnumType {
  Password = 'password',
  Email = 'email',
  fullName = 'fullName',
  title = 'title',
  period = 'period',
  place = 'place',
  characterName = 'characterName',
  time = 'time',
  search = 'search',
  chapter = 'chapter',
}

export interface IFormData {
  fullName?: string;
  email?: string;
  password?: string;
}
