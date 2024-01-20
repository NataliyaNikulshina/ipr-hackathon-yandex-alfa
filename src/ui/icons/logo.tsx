import React, { FC } from "react";

export interface ILogoIcon {
  color?: string;
  width?: number;
  height?: number;
}

const LogoIcon: FC<ILogoIcon> = ({ color, width = 53, height = 80 }) => (
  <svg
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
  </svg>
);

export default LogoIcon;
