export interface CustomInputProps {
  inputType: string;
  inputName: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export enum InputEnumType {
  Password = "password",
  Email = "email",
  UserName = "userName"
}

export interface IFormData {
  userName?: string;
  email?: string;
  password?: string
}