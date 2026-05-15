export interface CustomInputProps {
  inputType: string;
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface CustomTextAreaProps {
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export interface CustomSelectProps {
  inputName: string;
  placeholder: string;
  value?: number;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: number; name: string }[];
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
}

export interface IFormData {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface IAdaptedPeriod {
  name: string;
  from: string;
  to: string;
  place: string;
}

export interface ICharacter {
  type: number;
  name: string;
  personality: string;
  social: string;
  physical: string;
  psychological: string;
}

export interface ICreateFormData {
  title: string;
  centralIdea: string;
  adaptedPeriods: IAdaptedPeriod[];
  characters: ICharacter[];
  contextType: number;
  storySize: number;
  timeToComplete: string;
  initialBasedDate: string;
  tags: string[];
  content: string;
}
