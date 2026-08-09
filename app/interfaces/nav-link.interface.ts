import { type NavLinkProps } from 'react-router';

import { type ActionPresentationProps } from '@/components/shared/action/action.types';

export type CustomLinkProps = Omit<
  NavLinkProps,
  'children' | 'className' | 'to'
> &
  ActionPresentationProps & {
    to: string;
    activeClassName?: string;
  };
