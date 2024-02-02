import React, { ChangeEvent } from "react";
import "./textarea.scss";
//placeholder={'Введите описание задачи'} height={'172px'};

interface TextareaProps {
  placeholder?: string;
  width?: string;
  height?: string;
  value?: string;
  name?:string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  width,
  height,
  value,
  name,
  disabled,
  onChange,
}) => {

  return (
    <div className="wrapper">
      <span
        className={
          disabled
            ? "placeholder_disabled"
            : value
            ? "placeholder_active"
            : "placeholder"
        }
      >
        {placeholder}
      </span>
      <textarea
        className="textarea"
        value={value}
        name={name}
        onChange={onChange}
        style={{ height: height || "100px", width: width || "100%" }}
        disabled={disabled}
      />
    </div>
  );
};

export default Textarea;
