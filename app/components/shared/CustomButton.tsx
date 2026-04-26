import { FC } from "react";

import { CustomButtonProps } from "@/interfaces/button.interface";
import { bgClasses, textClasses } from "@/constants/shared/classes.contants";

const CustomButton: FC<CustomButtonProps> = ({
  buttonType = "button",
  bgColor,
  displayText,
  textColor,
  onClick = () => {},
}) => {


  return (
    <button
      type={buttonType}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs transition-all active:scale-95 ${bgClasses[bgColor]} ${textClasses[textColor]}`}
      onClick={onClick}
    >
      {displayText}
    </button>
  );
};

export default CustomButton;
