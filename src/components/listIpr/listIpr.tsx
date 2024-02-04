import { FC, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  isSelectedIprId?: number;
}

const ListIpr: FC<IListIpr> = ({
  size = "big",
  isBoss = false,
  iprList = [],
  titleEmpty = 'Пока задач нет.',
  disabled = false,
  isSelectedIprId= 1,
}): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  // const param = useParams();

  // function onClickBoss(id:any) {
  //   console.log(id);
  //   navigate(`list-tasks/${1}` , { state: state });
  // }

  // function onClick() {
  //   alert('Показать нужный список задач')
  // }



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
          ? iprList.map((el, index) => (
            <Unpacker key={el.id}>
              <Button
                color="ipr"
                width={widthButton}
                heigth="48"
                onClick={isBoss 
                  ? () => navigate(`list-tasks/${el.id}`, { state: state }) 
                  : () => navigate(`/myipr/${el.id}`, { state: state }) }
                position="left"
                disabled={isBoss ? false : (el.id === isSelectedIprId ? true : false)}
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
