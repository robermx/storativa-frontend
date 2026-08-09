import { type ReactNode } from 'react';
import clsx from 'clsx';

import { type ActionSize, type IconPosition } from './action.types';

interface ActionContentProps {
  children?: ReactNode;
  icon?: ReactNode;
  iconSize: ActionSize | 'none';
  iconPosition: IconPosition;
  size: ActionSize;
  truncate: boolean;
  className?: string;
}

const textSizeClasses: Record<ActionSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-base',
  xl: 'text-lg',
};

const iconSizeClasses: Record<ActionSize, string> = {
  sm: '[&>svg]:size-5',
  md: '[&>svg]:size-[22px]',
  lg: '[&>svg]:size-6',
  xl: '[&>svg]:size-7',
};

const ActionContent = ({
  children,
  icon,
  iconSize,
  iconPosition,
  size,
  truncate,
  className,
}: ActionContentProps) => {
  const iconElement = icon && (
    <span
      aria-hidden="true"
      className={`shrink-0 ${iconSize === 'none' ? '' : iconSizeClasses[iconSize]}`}
    >
      {icon}
    </span>
  );

  return (
    <span className={clsx('flex min-w-0 items-center gap-2', className)}>
      {iconPosition === 'start' && iconElement}
      {children !== undefined && (
        <span
          className={clsx(
            'min-w-0',
            textSizeClasses[size],
            truncate && 'truncate',
          )}
        >
          {children}
        </span>
      )}
      {iconPosition === 'end' && iconElement}
    </span>
  );
};

export default ActionContent;
