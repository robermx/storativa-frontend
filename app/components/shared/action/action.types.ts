import { type ReactNode } from 'react';

export type ActionVariant =
  'primary' | 'outline' | 'soft' | 'ghost' | 'danger' | 'text';

export type ActionSize = 'sm' | 'md' | 'lg' | 'xl';
export type ActionWidth = 'auto' | 'full';
export type IconPosition = 'start' | 'end';

export interface ActionPresentationProps {
  children?: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  width?: ActionWidth;
  icon?: ReactNode;
  iconSize?: ActionSize | 'none';
  iconPosition?: IconPosition;
  truncate?: boolean;
  className?: string;
}
