import { FC, ChangeEvent, useState, useEffect } from "react";
import stylesInput from "./input.module.scss";
import EyeIcon from "../../icons/eye";
import CloseIcon from "../../icons/close";

interface IInput {
  isInvalid?: boolean;
  placeholder?: string;
  errorMessage?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues?: () => void;
  disabled?: boolean;
  name?: string;
  minLength?: number;
  maxLength?: number;
  type?: "text" | "password";
  required?: boolean;
  id?: string;
  pattern?: string;
  size?: string;
  close?: boolean
}

const Input: FC<IInput> = ({
  isInvalid,
  errorMessage = 'Вы ввели неправильное значение',
  placeholder = 'Введите данные',
  value,
  onChange,
  setValues,
  disabled,
  name,
  minLength = 2,
  maxLength,
  type = "text",
  required,
  pattern,
  id,
  size = "small",
  close = true,
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [typeValues, setTypeValues] = useState<string>("");
  const [error, setError] = useState<{ error: boolean; textError: string }>({
    error: false,
    textError: '',
  });

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
  const input_error = stylesInput.input + " " + stylesInput.incorrect_input;
  const wrapperAll = (size==="small") ? stylesInput.wrapper + " " + stylesInput.wrapper__small
  : stylesInput.wrapper + " " + stylesInput.wrapper__big;

  const validate = (input: ChangeEvent<HTMLInputElement>) => {
    const validityState = input.currentTarget.validity;
    if (validityState.valueMissing) {
      setError({ error: true, textError: 'Это поле обязательно' });
    } else if (validityState.patternMismatch) {
      setError({ error: true, textError: errorMessage });
    } else if (validityState.tooLong) {
      setError({
        error: true,
        textError: `Максимум ${maxLength} символов`,
      });
    } else if (validityState.tooShort) {
      setError({
        error: true,
        textError: `Минимум ${minLength} символа`,
      });
    } else if (validityState.typeMismatch) {
      setError({
        error: true,
        textError: 'Неверный тип данных',
      });
    } else if (isInvalid) {
      setError({
        error: true,
        textError: errorMessage,
      });
    } else {
      setError({ error: false, textError: '' });
    }
    onChange(input);
  };

  return (
    <div className={wrapperAll}>
      <label className={stylesInput.inputContainer}>
      <span className={ 
        disabled ? stylesInput.placeholder_disabled : (value ? placeholder_active : stylesInput.placeholder)
        }>{placeholder}</span>
      <input
        className={(error.error || isInvalid) ? input_error : stylesInput.input}
        type={typeValues || type}
        value={value}
        onChange={validate}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        pattern={pattern}
        disabled={disabled}
        id={id}
      />
      {(error.error || isInvalid) && (
        <p className={stylesInput.incorrect_text}>
          {error.textError}
        </p>
      )}
      </label>
      { type==='password' && (
        <button
          type="button"
          aria-label="show/hide password"
          onClick={handleShowPassword}
          className={`${stylesInput.button}`}
        >
          <EyeIcon show={showPassword} color={disabled ? '#AAAAAD' : '#000'}/>
        </button>
      )}
      { type==='text' && value && (
        <button
          type="button"
          aria-label="clear input"
          onClick={setValues}
          className={`${stylesInput.button}`}
        >
          {close && <CloseIcon />}
        </button>
      )}
    </div>
  );
};

export default Input;
