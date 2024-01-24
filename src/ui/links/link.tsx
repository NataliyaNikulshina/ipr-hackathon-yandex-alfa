import React, { FC } from "react";
import ArrowIcon from "../icons/arrow";
import stylesILink from "./link.module.scss";

export interface ILink {
  size?: string;
  weight?: string;
  color?: "black" | "blue" | "grey";
  underline?: boolean;
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
}

const Link: FC<ILink> = ({
  children,
  href,
  size = "18",
  weight = "400",
  color = "blue",
  underline = true,
  arrow = false,
}) => {
  const styleColor = color === "blue" ? stylesILink.blue : color === "black" ? stylesILink.black : stylesILink.grey;
  const styleAll = !underline
    ? styleColor + " " + stylesILink.underline
    : styleColor;
  const colorLink = color === "blue" ? '#2A77EF' : color === "black" ? '#0E0E0E' : '#6A6B74';

  return (
    <div className={stylesILink.wrapper}>
      {arrow && <ArrowIcon color={colorLink}/>}
      <a
        href={href}
        className={styleAll}
        style={{ fontSize: `${size}px`, fontWeight: weight }}
      >
        {children}
      </a>
    </div>
  );
};

export default Link;
