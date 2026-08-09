import clsx from 'clsx';

import {
  type ActionSize,
  type ActionVariant,
  type ActionWidth,
} from './action.types';

const actionBaseClassName =
  'inline-flex min-w-0 items-center rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const actionPaddingClasses: Record<ActionSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-5 py-2.5',
  lg: 'px-5 py-5',
  xl: 'px-6 py-5',
};

const actionWidthClasses: Record<ActionWidth, string> = {
  auto: 'w-auto',
  full: 'w-full',
};

const actionVariantClasses: Record<ActionVariant, string> = {
  primary: 'bg-primary text-light hover:bg-primary/80',
  outline:
    'border border-dark/10 bg-light text-dark hover:border-primary/40 hover:text-primary dark:border-light/10 dark:bg-dark dark:text-light dark:hover:border-primary/40',
  soft: 'bg-primary/10 text-primary hover:bg-primary/20',
  ghost:
    'bg-transparent text-dark hover:bg-dark/10 dark:text-light dark:hover:bg-light/10',
  danger:
    'bg-red-600/20 text-red-600/60 hover:bg-red-600/70 hover:text-lightness',
  text: 'bg-transparent text-primary hover:text-primary/80',
};

const selectedClassName = 'border border-primary bg-primary text-light';

const textColorClassPattern =
  /^(?:(?:dark|hover|focus|active|disabled|group-hover):)*text-(?:inherit|current|transparent|black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|dark|light|darkness|lightness|primary|secondary|accent)(?:-\d{2,3})?(?:\/\d+)?$/;

const removeTextColorClasses = (classes: string) =>
  classes
    .split(' ')
    .filter((className) => !textColorClassPattern.test(className))
    .join(' ');

const hasTextColorOverride = (className?: string) =>
  className
    ?.split(/\s+/)
    .some((className) => textColorClassPattern.test(className)) ?? false;

export const buttonDisabledClassName =
  'disabled:cursor-not-allowed disabled:bg-disabledL disabled:text-gray-300 disabled:shadow-none disabled:hover:opacity-100 dark:disabled:bg-disabledD dark:disabled:text-gray-600';

interface ActionClassNameOptions {
  variant: ActionVariant;
  size: ActionSize;
  width: ActionWidth;
  className?: string;
  selected?: boolean;
  isActive?: boolean;
  isNavigation?: boolean;
}

export const getActionClassName = ({
  variant,
  size,
  width,
  className,
  selected = false,
  isActive = false,
  isNavigation = false,
}: ActionClassNameOptions) => {
  const isTextNavigation = variant === 'text' && isNavigation;
  const customTextColor = hasTextColorOverride(className);
  const stateClassName = selected
    ? selectedClassName
    : isTextNavigation
      ? isActive
        ? 'text-darkness dark:text-light'
        : 'text-gray-500 hover:text-darkness dark:text-light/70 dark:hover:text-light'
      : actionVariantClasses[variant];

  return clsx(
    actionBaseClassName,
    actionWidthClasses[width],
    variant !== 'text' && actionPaddingClasses[size],
    customTextColor ? removeTextColorClasses(stateClassName) : stateClassName,
    className,
  );
};
