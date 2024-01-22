import React, { FC } from "react";

export interface ICloseIcon {
  color?: string;
  width?: number;
  height?: number;
}

const CloseIcon: FC<ICloseIcon> = ({ color, width = 16, height = 16 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.48511 13.5149L13.5149 2.48513"
      stroke={color || "black"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5149 13.5149L2.48513 2.48513"
      stroke={color || "black"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
