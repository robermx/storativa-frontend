import { FC } from 'react';

import ActionContent from '@/components/shared/action/ActionContent';
import {
  buttonDisabledClassName,
  getActionClassName,
} from '@/components/shared/action/action.styles';
import { CustomButtonProps } from '@/interfaces/button.interface';

const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  width = 'full',
  icon,
  iconSize = size,
  iconPosition = 'end',
  truncate = false,
  className,
  selected,
  type = 'button',
  disabled,
  ...buttonProps
}) => {
  const disabledClassName =
    variant === 'text'
      ? 'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-300 disabled:shadow-none disabled:hover:opacity-100 dark:disabled:bg-transparent dark:disabled:text-gray-600'
      : buttonDisabledClassName;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={`${getActionClassName({ variant, size, width, className, selected })} ${disabledClassName} ${disabled ? '' : 'active:scale-98'}`}
    >
      <ActionContent
        className={`${width === 'full' ? 'w-full' : ''} ${truncate ? 'justify-start' : 'justify-center'}`}
        icon={icon}
        iconSize={iconSize}
        iconPosition={iconPosition}
        size={size}
        truncate={truncate}
      >
        {children}
      </ActionContent>
    </button>
  );
};

export default CustomButton;
