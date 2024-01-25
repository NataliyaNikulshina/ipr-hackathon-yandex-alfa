import { FC } from "react";

export interface ICompleteIcon {
  color?: string;
  width?: number;
  height?: number;
}

const CompleteIcon: FC<ICompleteIcon> = ({
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
    <g clip-path="url(#clip0_115_2355)">
      <path
        d="M11.1161 16.8839C11.6043 17.372 12.3957 17.372 12.8839 16.8839L20.8388 8.92893C21.327 8.44078 21.327 7.64932 20.8388 7.16117C20.3507 6.67301 19.5592 6.67301 19.0711 7.16117L12 14.2322L4.92893 7.16117C4.44078 6.67301 3.64932 6.67301 3.16117 7.16117C2.67301 7.64932 2.67301 8.44078 3.16117 8.92893L11.1161 16.8839ZM10.75 15V16H13.25V15H10.75Z"
        fill={color || "#008837"}
      />
    </g>
    <defs>
      <clipPath id="clip0_115_2355">
        <rect width={width} height={height} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CompleteIcon;
