import React, { FC } from "react";

import stylesILink from "./link.module.scss";

export interface ILink {
  size?: string;
  color?: "black" | "blue";
  href?: string;
  children?: React.ReactNode;
}

const Link: FC<ILink> = ({
    children, href, size = 18, color='blue'
}) => {
  
  return (
    <a
    href={href}
    className={color==='blue' ? stylesILink.blue : stylesILink.black}
    style={{ fontSize: size + "ph" }}
    >
      {children}
    </a>
  );
};

export default Link;
