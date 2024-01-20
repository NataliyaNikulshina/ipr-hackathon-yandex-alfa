import React, { FC } from "react";

import stylesButton from "./button.module.scss";

export interface IButton {
  width: string;
  heigth: string;
  color?: "red" | "black" | "grey" | "white";
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
  onClick,
  disabled,
  children,
}) => {
  let stylesAll = `${stylesButton.button}`;
  switch (color) {
    case "red":
      // eslint-disable-next-line no-useless-concat
      stylesAll += " " + `${stylesButton.red}`;
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
  }

  return (
    <button
      className={stylesAll}
      style={{ width: width + "px", height: heigth + "px" }}
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
