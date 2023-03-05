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
          d="M0,17.027c0,0,5.284,6.066,11.059,14.973c0,0,8.807-12.232,20.941-20.942L25.541,0c0,0-8.857,10.588-14.776,21.333
		c0,0-4.894-6.165-8.221-9.101L0,17.027z"
        />
      </g>
    </svg>
  );
}
