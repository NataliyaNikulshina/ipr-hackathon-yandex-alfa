import { FC } from "react";
import Button from "../../ui/buttons/button";
import LogoIcon from "../../ui/icons/logo";
import Input from "../../ui/inputs/input";

import stylesSignin from "./signin.module.scss";

function handleClick() {
  alert("Вы вошли");
}

const Signin: FC = (): JSX.Element => {
  return (
    <section className={stylesSignin.signinPage}>
      <div className={stylesSignin.signinBackgroundImage} />
      <div className={stylesSignin.wrapperImage}>
        <LogoIcon />
      </div>
      <form className={stylesSignin.inputsForm}>
        <Input
          type="text"
          onChange={() => console.log("ok")}
          placeholder="Email"
          minLength={2}
          maxLength={40}
          required
        />
        <Input
          type="password"
          onChange={() => console.log("ok")}
          placeholder="Пароль"
          minLength={2}
          required
        />
        <Input
          type="password"
          onChange={() => console.log("ok")}
          placeholder="Пароль"
          minLength={2}
          required
          disabled
        />
        <Button
          buttonHtmlType="submit"
          onClick={handleClick}
          color="red"
          width="304"
          heigth="56"
        >
          Войти
        </Button>
      </form>
    </section>
  );
};

export default Signin;
