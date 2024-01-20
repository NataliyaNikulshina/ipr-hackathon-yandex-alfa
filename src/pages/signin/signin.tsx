import { FC } from "react";
import Button from "../../ui/buttons/button";

function handleClick() {
    alert('Вы вошли');
}

const Signin: FC = (): JSX.Element => {
  return <div>
    <Button onClick={handleClick} color='red' width='304' heigth='56' >Войти</Button>
  </div>;
};

export default Signin;
