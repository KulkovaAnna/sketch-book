import IconProps from './types';

export default function Icon({ color = '#000000', ...rest }: IconProps) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="29.389px"
      height="32px"
      viewBox="0 0 29.389 32"
      enableBackground="new 0 0 29.389 32"
      xmlSpace="preserve"
      {...rest}
    >
      <g id="Icons">
        <path
          fill={color}
          d="M31.799,18.71c0,0-1.448,5.944-6.624,9.685c-5.605,4.055-13.419,4.857-18.359,1.551C1.87,26.635-1.443,19.15,0.628,11.337
		C2.623,3.801,11.315,0,11.315,0s-6.617,11.315,0.979,20.359C19.042,28.395,31.799,18.71,31.799,18.71z"
        />
      </g>
    </svg>
  );
}
