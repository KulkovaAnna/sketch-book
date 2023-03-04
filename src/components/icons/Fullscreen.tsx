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
          d="M31.591,7.658c-0.837-1.004-11.717-1.171-12.219,0c-0.187,0.435,0.568,1.97,1.651,3.73l-7.016,5.079L8.852,8.186
		c1.698-1.273,3.014-2.457,3.014-2.9c0-1.171-9.373-6.025-10.378-5.188c-1.005,0.837-1.172,11.717,0,12.219
		c0.472,0.202,2.235-0.703,4.181-1.935l6.048,7.748l-5.278,3.82c-1.047-1.426-2.055-2.574-2.415-2.574
		c-0.892,0-4.584,7.131-3.947,7.896s8.914,0.892,9.296,0c0.167-0.39-0.661-1.942-1.723-3.569l5.681-3.506l3.957,5.069
		c-1.583,1.137-2.916,2.278-2.916,2.67c0,0.901,7.212,4.637,7.983,3.993c0.773-0.645,0.901-9.016,0-9.402
		c-0.387-0.166-1.909,0.641-3.522,1.686l-3.333-5.354l7.445-4.597c1.475,2.052,2.953,3.777,3.459,3.777
		C27.573,18.036,32.428,8.663,31.591,7.658z"
        />
      </g>
    </svg>
  );
}
