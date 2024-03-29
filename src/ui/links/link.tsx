import React, { FC, MouseEvent } from "react";
import ArrowIcon from "../icons/arrow";
import stylesILink from "./link.module.scss";

export interface ILink {
  size?: string;
  weight?: string;
  color?: "black" | "blue" | "grey";
  underline?: boolean;
  href: string;
  onClick?: (e: MouseEvent) => void;
  children: React.ReactNode;
  arrow?: boolean;
  disabled?: boolean;
}

const Link: FC<ILink> = ({
  children,
  href,
  size = "18",
  weight = "400",
  color = "blue",
  underline = true,
  arrow = false,
  disabled = false,
  onClick
}) => {
  const styleColor =
    color === "blue"
      ? stylesILink.blue
      : color === "black"
      ? stylesILink.black
      : stylesILink.grey;
  const styleAll = !underline
    ? styleColor + " " + stylesILink.underline
    : styleColor;
  const colorLink =
    color === "blue" ? "#2A77EF" : color === "black" ? "#0E0E0E" : "#6A6B74";

  return (
      <a
        href={href}
        onClick={onClick}
        className={styleAll}
        style={
          disabled
            ? {
                pointerEvents: "none",
                fontSize: `${size}px`,
                fontWeight: weight,
              }
            : { fontSize: `${size}px`, fontWeight: weight }
        }
      >
        {arrow && <ArrowIcon color={colorLink} />}
        {children}
      </a>
  );
};

export default Link;
