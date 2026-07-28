import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export enum variantType {
  simple = 'simple',
  contained = 'contained',
}

export interface CustomLinkProps {
  isMainMenu?: boolean;
  path?: string;
  displayName?: string;
  variant?: variantType.simple | variantType.contained;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}