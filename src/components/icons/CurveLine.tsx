import IconProps from './types';

interface Props extends IconProps {
  width?: number;
}

export default function Icon({ color = '#000000', width = 2, ...rest }: Props) {
  return (
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width * 4}
        d="M24,92.8S56,48,104,48c104,0,96,160,0,160-64,0-64-96,32-96,64,0,104,48,104,48"
      />
    </svg>
  );
}
