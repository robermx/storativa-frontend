import { type ButtonHTMLAttributes } from 'react';

import { type ActionPresentationProps } from '@/components/shared/action/action.types';

export type CustomButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className'
> &
  ActionPresentationProps & {
    selected?: boolean;
  };
