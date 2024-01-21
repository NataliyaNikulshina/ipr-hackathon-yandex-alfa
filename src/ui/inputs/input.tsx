import { FC, ChangeEvent, useState, useEffect } from "react";
import stylesInput from "./input.module.scss";
import EyeIcon from "../icons/eye";

interface IInput {
  //   isInvalid?: boolean;
  placeholder?: string;
  //   errorMessage?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  minLength?: number;
  maxLength?: number;
  type?: "text" | "password";
  required?: boolean;
  id?: string;
}

const Input: FC<IInput> = ({
  //   isInvalid,
  placeholder,
  value,
  onChange,
  disabled,
  name,
  minLength = 2,
  maxLength,
  type = "text",
  required,
  id,
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [typeValues, setTypeValues] = useState<string>("");

  useEffect(() => {
    setTypeValues(type);
  }, [type]);

  const handleShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
      setTypeValues("text");
    } else {
      setShowPassword(false);
      setTypeValues("password");
    }
  };

  const placeholder_active = stylesInput.placeholder + " " + stylesInput.placeholder_active;

  return (
    <div className={stylesInput.wrapper}>
      <label className={stylesInput.inputContainer}>
      <span className={ 
        disabled ? stylesInput.placeholder_disabled : (value ? placeholder_active : stylesInput.placeholder)
        }>{placeholder}</span>
      <input
        className={stylesInput.input}
        type={typeValues || type}
        value={value}
        onChange={onChange}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        id={id}
      />
      </label>
      { type==='password' && (
        <button
          type="button"
          aria-label="show/hide password"
          onClick={handleShowPassword}
          className={`${stylesInput.password}`}
        >
          <EyeIcon show={showPassword} color={disabled ? '#AAAAAD' : '#000'}/>
        </button>
      )}
    </div>
  );
};

export default Input;
