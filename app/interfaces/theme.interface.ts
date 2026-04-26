import { Dispatch } from "react";

export interface ThemeProps {
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}