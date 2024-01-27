import React, { FC } from "react";

import stylesButton from "./button.module.scss";

export interface IButton {
  width?: string;
  heigth?: string;
  color?: "red" | "black" | "grey" | "white" | "nav_white" | "ipr" | "transparent";
  position?: "left" | "right" | "center";
  buttonHtmlType?: "button" | "submit" | "reset";
  onClick?: VoidFunction;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: FC<IButton> = ({
  width = "176",
  heigth = "72",
  color = "red",
  buttonHtmlType = "button",
  position= "center",
  onClick,
  disabled,
  children,
}) => {
  let stylesAll = `${stylesButton.button}`;
  if (position === "left") stylesAll = `${stylesButton.button} ${stylesButton.left}`;
  if (position === "right") stylesAll = `${stylesButton.button} ${stylesButton.right}`;

  switch (color) {
    case "red":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + ` ${stylesButton.red}`;
      break;
    case "black":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.black}`;
      break;
    case "grey":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.grey}`;
      break;
    case "white":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.white}`;
      break;
    case "nav_white":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.nav_white}`;
      break;
    case "ipr":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.ipr}`;
      break;
    case "transparent":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.transparent}`;
      break;
  }

  return (
    <button
      className={stylesAll}
      style={!(color==="ipr") ? { width: width + "px", height: heigth + "px" } : { width: width + "px", minHeight: heigth + "px !important" }}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={buttonHtmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
