import { FC } from "react";

export interface INotCompletedIcon {
  color?: string;
  width?: number;
  height?: number;
}

const NotCompletedIcon: FC<INotCompletedIcon> = ({
  color,
  width = 24,
  height = 24,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_115_2350)">
      <path
        d="M11 9.77813L18.7781 2L21 4.22187L13.2219 12L21 19.7781L18.7766 22L10.9984 14.2219L3.22187 22L1 19.7766L8.77813 11.9984L1 4.2203L3.22187 2.00157L11 9.77813Z"
        fill={color || "#E12F2F"}
      />
    </g>
    <defs>
      <clipPath id="clip0_115_2350">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default NotCompletedIcon;
