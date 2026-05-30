import { type LucideProps } from 'lucide-react';
import {
  ForwardRefExoticComponent,
  RefAttributes,
  type MouseEventHandler,
} from 'react';

export type CustomButtonProps = {
  bgColor: string;
  textColor: string;
  buttonType?: 'reset' | 'submit' | 'button' | undefined;
  isDisabled?: boolean;
  displayText?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};
