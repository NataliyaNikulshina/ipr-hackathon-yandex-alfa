import React, { FC } from "react";

export interface IEyeIcon {
  show?: boolean;
  color?: string;
  width?: number;
  height?: number;
}

const EyeIcon: FC<IEyeIcon> = ({
  show = true,
  color,
  width = 16,
  height = 16,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="2.1579" stroke={color || "black"} />
    {!show && (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.97976 2.97978C3.17502 2.78452 3.4916 2.78452 3.68687 2.97978L13.0202 12.3131C13.2155 12.5084 13.2155 12.825 13.0202 13.0202C12.8249 13.2155 12.5084 13.2155 12.3131 13.0202L2.97976 3.68689C2.7845 3.49163 2.7845 3.17504 2.97976 2.97978Z"
        fill={color || "black"}
      />
    )}
    {!show && (
      <path
        d="M2.53351 2.50906L13.466 13.4416"
        stroke={color || "black"}
        stroke-linecap="round"
      />
    )}
    <path
      d="M13.7299 6.91116C14.329 7.53135 14.329 8.46864 13.7299 9.08883C12.4311 10.4334 10.3204 12.1221 8.00012 12.1221C5.67981 12.1221 3.56917 10.4334 2.27032 9.08883C1.67122 8.46864 1.67122 7.53135 2.27032 6.91116C3.56917 5.56658 5.67981 3.87785 8.00012 3.87785C10.3204 3.87785 12.4311 5.56658 13.7299 6.91116Z"
      stroke={color || "black"}
    />
  </svg>
);

export default EyeIcon;

{
  /* <svg
width={width}
height={height}
viewBox="0 0 53 80"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M0 69.06H52.58V80H0V69.06ZM15.64 43.24H36.38L39.88 54.24H51.38L35.86 8C34.36 3.56 32.62 0 26.68 0C20.74 0 18.92 3.5 17.36 8L1.12 54.22H11.9L15.64 43.24V43.24ZM26.16 12H26.42L33.4 34H18.8L26.16 12V12Z"
  fill={color || '#EF3124'}
/>
</svg> */
}
