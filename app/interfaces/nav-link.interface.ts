import { SvgProps } from '@/assets/interfaces/svg.interface';
import { LucideProps } from 'lucide-react';
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

export enum variantType {
  simple = 'simple',
  contained = 'contained',
  outlined = 'outlined',
}

export interface CustomLinkProps {
  isMainMenu?: boolean;
  path?: string;
  displayName?: string;
  variant?: variantType.simple | variantType.contained | variantType.outlined;
  Icon?:
    | ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >
    | FC<SvgProps>
    | null;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  withPipe?: boolean;
}
