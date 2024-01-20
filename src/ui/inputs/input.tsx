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

  return (
    <div className={stylesInput.wrapper}>
      <input
        className={stylesInput.input}
        placeholder={placeholder}
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
      { type==='password' && (
        <button
          type="button"
          aria-label="show/hide password"
          onClick={handleShowPassword}
          className={`${stylesInput.password}`}
        >
          <EyeIcon show={showPassword} />
        </button>
      )}
    </div>
  );
};

export default Input;
