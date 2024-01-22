import { FC, useState, useEffect } from "react";
import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import LogoIcon from "../../ui/icons/logo";
import Input from "../../ui/inputs/input/input";
import useForm from "../../utils/use-form";

import stylesSignin from "./signin.module.scss";

function handleClick() {
  alert("Вы вошли");
}

const Signin: FC = (): JSX.Element => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { values, handleChange } = useForm({
    email: { value: "", valueValid: false },
    password: { value: "", valueValid: false },
  });

  useEffect(() => {
    (values.email.valueValid && values.password.valueValid) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [values]);

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
          onClick={handleClick}
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
