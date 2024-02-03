import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./listIpr.module.scss";
import Unpacker from "../../ui/unpacker/unpacker";

import Button from "../../ui/buttons/button/button";

// import {
//   mockDataTask,
//   mockDataIpr,
// } from "../../ui/verificationConstants/verificationConstants";

export interface IListIpr {
  size?: "big" | "small";
  isBoss?: boolean;
  iprList?: {
    id: number;
    title: string;
  }[];
  titleEmpty?: string;
  disabled?: boolean;
}

const ListIpr: FC<IListIpr> = ({
  size = "big",
  isBoss = false,
  iprList = [],
  titleEmpty = 'Пока задач нет.',
  disabled = false,
}): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  function onClickBoss(e: any) {
    e.preventDefault();
    navigate("list-tasks", { state: state });
  }

  function onClick() {
    alert('Показать нужный список задач')
  }

  console.log(iprList);
  const styleAll =
    size === "big"
      ? styles.listIpr + " " + styles.listIpr__big
      : styles.listIpr + " " + styles.listIpr__small;

  const widthButton = size === "big" ? "550" : "240";

  return (
    <div className={styles.wrapper}>
      <div className={disabled ? styles.disabled : ''}></div>
      <div className={`${styleAll} ${disabled ? styles.disabled__scroll : ''}`}>
        {iprList?.length
          ? iprList.map((el) => (
            <Unpacker key={el.id}>
              <Button
                color="ipr"
                width={widthButton}
                heigth="48"
                onClick={isBoss ? onClickBoss : onClick}
                position="left"
                disabled={isBoss ? false : el.id === 3 ? true : false}
              >
                {el.title}
              </Button>
            </Unpacker>
          ))
          : <p className={styles.listIpr__title_empty}>{titleEmpty}</p>
        }
      </div>
    </div>
  );
};

export default ListIpr;
