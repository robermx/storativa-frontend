import { FC } from 'react';

import { CustomButtonProps } from '@/interfaces/button.interface';
import { bgClasses, textClasses } from '@/constants/shared/className.contants';

const CustomButton: FC<CustomButtonProps> = ({
  buttonType = 'button',
  bgColor,
  displayText,
  textColor,
  isDisabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      type={buttonType}
      className={`
        flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs transition-all cursor-pointer
        ${bgClasses[bgColor]} 
        ${textClasses[textColor]}
        disabled:bg-disabledL dark:disabled:bg-disabledD
        disabled:text-gray-200 dark:disabled:text-gray-500
        disabled:cursor-not-allowed 
        disabled:shadow-none
        disabled:hover:opacity-100
        ${!isDisabled ? 'active:scale-95' : ''}
      `}
      onClick={onClick}
      disabled={isDisabled}
    >
      {displayText}
    </button>
  );
};

export default CustomButton;
