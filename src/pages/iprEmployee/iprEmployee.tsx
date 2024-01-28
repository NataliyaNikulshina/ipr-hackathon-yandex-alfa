import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./iprEmployee.module.scss";


import Link from "../../ui/links/link";
import Unpacker from "../../ui/unpacker/unpacker";
import Button from "../../ui/buttons/button/button";

// Моковые данные
import {
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

import Card from "../../components/card/card";
// import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

export interface IIprEmployee {
  handlePopup(editing: object): void;
}

const IprEmployee: FC<IIprEmployee> = ({ handlePopup }): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "ИПР Сотрудника" }], replace: true });
      }
    },
    [pathname, url, state]
  );

  function onClick() {
    alert("Переход к определенному списку задач");
  }

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  return (
    <section className={styles.page}>
            <div className={styles.container}>
        <span className={styles.link}>
          <Link
            href={"/myipr"}
            onClick={routeTo}
            color="black"
            size="16"
            weight="700"
            underline={false}
            arrow
          >
            Назад
          </Link>
        </span>
        <div className={styles.wrapper}>
        <Card
        size="small"
        // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
        name="Соколов Михаил 
        Алексеевич"
        appointment="Финансовый аналитик"
        handlePopup={handlePopup}
      />
          <div className={styles.listIpr}>
            {mockDataIpr?.length
              ? mockDataIpr.map((el) => (
                  <Unpacker key={el.id}>
                    <Button color="ipr" width="570" heigth="48" position="left" onClick={onClick} >
                      {el.title}
                    </Button>
                  </Unpacker>
                ))
              : "ИПР не существует"}
          </div>
        </div>
        <div className={styles.wrapper__button}>
          <Button color="red" width="554" heigth="56" onClick={onClick}>
            Добавить ИПР
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IprEmployee;
