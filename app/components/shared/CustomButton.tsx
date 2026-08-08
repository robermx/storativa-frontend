import { FC, MouseEvent } from 'react';

import { CustomButtonProps } from '@/interfaces/button.interface';
import { useMenuStore } from '@/store/menuStore';

const CustomButton: FC<CustomButtonProps> = ({
  bgColor,
  textColor,
  activeColor = 'bg-primary',
  buttonType = 'button',
  displayText = null,
  isDisabled = false,
  onClick = null,
  Icon,
  size = 'sm',
  widthAuto = false,
  noPadding = false,
  truncateText = false,
  active = false,
  heavy = false
}) => {
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (menuExpanded) closeMenuExpand();
    if (onClick) onClick(event);
  };

  return (
    <button
      type={buttonType}
      className={`${widthAuto ? 'w-auto' : 'w-full'} min-w-0 rounded-md transition-all cursor-pointer
        ${active ? activeColor : bgColor}
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
      <div
        className={`flex min-w-0 ${truncateText ? 'justify-start' : 'justify-center'} items-center gap-2 ${noPadding ? 'p-0' : heavy ? 'py-5': 'py-2.25'}`}
      >
        {displayText && (
          <span
            className={`min-w-0 text-${size} font-semibold ${truncateText ? 'truncate' : ''}`}
          >
            {displayText}
          </span>
        )}
        {Icon && (
          <Icon
            className="shrink-0"
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
