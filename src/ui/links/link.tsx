import { BinaryToTextEncoding } from "crypto";
import React, { FC } from "react";

import stylesILink from "./link.module.scss";

export interface ILink {
  size?: string;
  weight?: string;
  color?: "black" | "blue";
  underline?: boolean;
  href: string;
  children: React.ReactNode;
}

const Link: FC<ILink> = ({
    children, href, size = '18', weight = '400', color='blue', underline=true
}) => {

  const styleColor = color==='blue' ? stylesILink.blue : stylesILink.black;
  const styleAll = !underline ? styleColor + " " + stylesILink.underline : styleColor;
  
  return (
    <a
    href={href}
    className={styleAll}
    style={{ fontSize: `${size}px`, fontWeight: weight }}
    >
      {children}
    </a>
  );
};

export default Link;
