export interface CustomInputProps {
  inputType: string;
  inputName: string;
  placeholder: string;
  isRequired?: boolean
}

export enum InputEnumType {
  Password = "password",
  Email = "email",
  UserName = "userName"
}