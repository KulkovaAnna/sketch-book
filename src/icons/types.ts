import { HTMLAttributes } from 'react';

export default interface IconProps extends HTMLAttributes<SVGElement> {
  color?: string;
}

export type TIcon = (props: IconProps) => JSX.Element;
