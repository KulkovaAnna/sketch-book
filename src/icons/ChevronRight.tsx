import IconProps from './types';

export default function Icon({ color = '#000000', ...rest }: IconProps) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      xmlSpace="preserve"
      {...rest}
    >
      <g id="Fondo_1_" display="none">
        <rect
          id="Fondo"
          x="-578.184"
          y="-955.522"
          display="inline"
          fill="#FB6E92"
          width="1000"
          height="2438.351"
        />
      </g>
      <g id="Icons">
        <path
          fill={color}
          d="M3.621,0C2.657,0,0,2.979,0,3.971c0,0.993,13.664,10.627,13.664,11.328C13.664,15.999,0,26.189,0,27.096
		C0,28.001,4.438,32,5.255,32c0.818,0,15.299-15.795,15.299-16.817S4.584,0,3.621,0z"
        />
      </g>
    </svg>
  );
}
