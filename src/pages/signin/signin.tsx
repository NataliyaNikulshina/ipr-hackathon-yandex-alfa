import { FC, useState, ChangeEvent } from "react";
import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button";
import LogoIcon from "../../ui/icons/logo";
import Input from "../../ui/inputs/input";

import stylesSignin from "./signin.module.scss";

function handleClick() {
  alert("Вы вошли");
}

function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: { value, valueValid: event.target.validity.valid },
    });
  };
  return {
    values,
    handleChange,
    setValues,
  };
}

const Signin: FC = (): JSX.Element => {
  const { values, handleChange, setValues } = useForm({
    email: { value: "", valueValid: false },
    password: { value: "", valueValid: false },
  });

  return (
    <section className={stylesSignin.signinPage}>
      <div className={stylesSignin.signinBackgroundImage} />
      <div className={stylesSignin.wrapperImage}>
        <LogoIcon />
      </div>
      <form className={stylesSignin.inputsForm}>
        <Input
          type="text"
          onChange={handleChange}
          value={values.email.value}
          name="email"
          placeholder="Email"
          minLength={2}
          maxLength={30}
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
        {/* <Input
          type="password"
          onChange={() => console.log("ok")}
          placeholder="Пароль"
          minLength={2}
          required
          disabled
        /> */}
        <Button
          buttonHtmlType="submit"
          onClick={handleClick}
          color="red"
          width="304"
          heigth="56"
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
