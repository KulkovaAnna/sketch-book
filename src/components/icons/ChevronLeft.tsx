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
          d="M16.934,0c0.964,0,3.621,2.979,3.621,3.971c0,0.993-13.664,10.627-13.664,11.328c0,0.7,13.664,10.891,13.664,11.797
		C20.555,28,16.117,32,15.299,32S0,16.205,0,15.183S15.971,0,16.934,0z"
        />
      </g>
    </svg>
  );
}
