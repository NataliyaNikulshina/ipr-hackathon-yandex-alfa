import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./listIpr.module.scss";
import Unpacker from "../../ui/unpacker/unpacker";

import Button from "../../ui/buttons/button/button";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

export interface IListIpr {
  size?: "big" | "small";
  isBoss?: boolean;
}

const ListIpr: FC<IListIpr> = ({
  size = "big",
  isBoss = false,
}): JSX.Element => {
    const {state, pathname} = useLocation();
    const navigate = useNavigate();
    const url = window.location.href;

  function onClickBoss(e: any) {
    e.preventDefault();
    navigate("list-tasks",  { state: state, replace: true });
  }

  function onClick() {
    alert('Показать нужный список задач')
  }

  const styleAll =
    size === "big"
      ? styles.listIpr + " " + styles.listIpr__big
      : styles.listIpr + " " + styles.listIpr__small;

  const widthButton = size === "big" ? "560" : "244";

  return (
    <div className={styleAll}>
      {mockDataIpr?.length
        ? mockDataIpr.map((el) => (
            <Unpacker key={el.id}>
              <Button
                color="ipr"
                width={widthButton}
                heigth="48"
                onClick={isBoss? onClickBoss : onClick}
                position="left"
                disabled={isBoss ? false : el.id === 3 ? true : false}
              >
                {el.title}
              </Button>
            </Unpacker>
          ))
        : "ИПР не существует"}
    </div>
  );
};

export default ListIpr;
