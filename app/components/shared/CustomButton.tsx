import { FC, MouseEvent } from 'react';

import { CustomButtonProps } from '@/interfaces/button.interface';
import { useMenuStore } from '@/store/menuStore';

const CustomButton: FC<CustomButtonProps> = ({
  bgColor,
  textColor,
  buttonType = 'button',
  displayText = null,
  isDisabled = false,
  onClick = null,
  Icon,
  size = 'sm',
}) => {
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);

  const handleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (menuExpanded) closeMenuExpand();
    if (onClick) onClick(event)
  };

  return (
    <button
      type={buttonType}
      className={`w-full rounded-md transition-all cursor-pointer
        ${bgColor} 
        ${textColor}
        disabled:bg-disabledL dark:disabled:bg-disabledD
        disabled:text-gray-300 dark:disabled:text-gray-600
        disabled:cursor-not-allowed 
        disabled:shadow-none
        disabled:hover:opacity-100
        ${isDisabled ? '' : 'active:scale-98'}
      `}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <div className="flex justify-center items-center p-2.25">
        {displayText && (
          <span className={`text-${size} font-semibold pl-3 pr-2`}>
            {displayText}
          </span>
        )}
        {Icon && (
          <Icon
            size={
              size === 'sm' ? 20 : size === 'md' ? 22 : size === 'lg' ? 24 : 28
            }
          />
        )}
      </div>
    </button>
  );
};

export default CustomButton;
