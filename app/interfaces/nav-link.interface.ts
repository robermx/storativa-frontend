import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export enum variantType {
  simple = 'simple',
  contained = 'contained',
  outlined = 'outlined'
}

export interface CustomLinkProps {
  isMainMenu?: boolean;
  path?: string;
  displayName?: string;
  variant?: variantType.simple | variantType.contained | variantType.outlined;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  > | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withPipe?: boolean
}