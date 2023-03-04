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
        <g>
          <path
            fill={color}
            d="M18.158,14.176c0.71,0.596,10.021-2.076,9.935-2.782c-0.085-0.707-1.209-1.852-2.604-2.991c0,0,6.53-4.619,6.464-5.068
			c-0.066-0.448-3.771-3.137-4.145-3.124c-0.373,0.013-4.651,6.453-4.651,6.453c-1.642-1.125-3.112-1.949-3.353-1.854
			C19.236,5.036,17.447,13.579,18.158,14.176z"
          />
          <path
            fill={color}
            d="M28.875,31.083C29.141,31.147,32,27.319,32,26.938c0-0.379-6.455-4.651-6.455-4.651c1.126-1.642,1.95-3.112,1.854-3.353
			c-0.227-0.568-8.77-2.357-9.366-1.646c-0.595,0.71,2.077,10.021,2.782,9.936c0.709-0.086,1.852-1.209,2.992-2.604
			C23.807,24.619,28.609,31.019,28.875,31.083z"
          />
          <path
            fill={color}
            d="M13.841,13.968c0.711-0.598-1.077-9.141-1.646-9.367c-0.24-0.095-1.713,0.729-3.353,1.854C8.843,6.455,4.661,0,4.19,0
			S0.047,2.659,0.047,3.125c0,0.465,6.463,5.068,6.463,5.068c-1.395,1.141-2.518,2.284-2.603,2.991
			C3.821,11.892,13.131,14.563,13.841,13.968z"
          />
          <path
            fill={color}
            d="M13.967,17.289c-0.597-0.71-9.141,1.078-9.367,1.646c-0.095,0.239,0.729,1.713,1.854,3.354c0,0-6.48,4.164-6.454,4.65
			c0.026,0.487,2.77,4.141,3.124,4.146c0.355,0.005,5.069-6.465,5.069-6.465c1.14,1.396,2.284,2.521,2.991,2.604
			C11.891,27.31,14.562,17.999,13.967,17.289z"
          />
        </g>
      </g>
    </svg>
  );
}
