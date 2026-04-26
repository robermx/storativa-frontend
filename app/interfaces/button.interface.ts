import { type MouseEventHandler } from "react";

export type CustomButtonProps = {
  buttonType: "reset" | "submit" | "button" | undefined;
  bgColor: "primary" | "secondary" | "accent" | "light" | "dark" | "lightness" | "darkness";
  displayText: string;
  textColor: "primary" | "secondary" | "accent" | "light" | "dark" | "lightness" | "darkness"
  onClick?: MouseEventHandler<HTMLButtonElement>
}