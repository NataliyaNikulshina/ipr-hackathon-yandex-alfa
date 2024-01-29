import { FC, useState, useEffect, FormEvent } from "react";
import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import LogoIcon from "../../ui/icons/logo";
import Input from "../../ui/inputs/input/input";
import useForm from "../../utils/use-form";
import { signinApi } from "../../api/auth";

import stylesSignin from "./signin.module.scss";

const Signin: FC = (): JSX.Element => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { values, handleChange, setValues } = useForm({
    email: { value: "", valueValid: false },
    password: { value: "", valueValid: false },
  });

  useEffect(() => {
    (values.email.valueValid && values.password.valueValid) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [values]);

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinApi({
        email: values.email.value,
        password: values.password.value,
      });
  };

  const clearInput = () => {
    setValues({
      email: { value: "", valueValid: false },
      password: { value: values.password.value , valueValid: values.password.valueValid },
    });
  }

  return (
    <section className={stylesSignin.signinPage}>
      <div className={stylesSignin.signinBackgroundImage} />
      <div className={stylesSignin.wrapperImage}>
        <LogoIcon />
      </div>
      <form className={stylesSignin.inputsForm} onSubmit={handleSignin}>
        <Input
          type="text"
          setValues={clearInput}
          onChange={handleChange}
          value={values.email.value}
          name="email"
          placeholder="Email"
          minLength={2}
          maxLength={30}
          pattern="^\S+@\S+\.\S+$"
          required
        />
        <Input
          type="password"
          onChange={handleChange}
          value={values.password.value}
          name="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={30}
          required
        />
        <Button
          buttonHtmlType="submit"
          color="red"
          width="304"
          heigth="56"
          disabled={buttonDisabled}
        >
          Войти
        </Button>
        <Link
        href={"#"}
        color='blue'
        size='18'
      >
        Забыли пароль?
      </Link>
      </form>
    </section>
  );
};

export default Signin;
