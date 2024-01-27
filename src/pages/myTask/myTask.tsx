import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTask.module.scss";
import Link from "../../ui/links/link";
import Unpacker from "../../ui/unpacker/unpacker";
import Button from "../../ui/buttons/button/button";
// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

import { isContainRoute } from "../../utils/breadcrumbs";

const MyTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/myipr", { replace: true });
  };

  function onClick() {
    alert("Переход к определенному списку задач");
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <span className={styles.header}>
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
          <h1 className={styles.title}>
            Тест на знание корпоративной культуры
          </h1>
        </span>
        <div className={styles.wrapper}>
        <div className={styles.disabled}></div>
            <div className={styles.listIpr}>
              {mockDataIpr?.length
                ? mockDataIpr.map((el) => (
                    <Unpacker key={el.id}>
                      <Button
                        color="ipr"
                        width="244"
                        heigth="48"
                        onClick={onClick}
                        disabled={el.id === 1 ? true : false}
                      >
                        {el.title}
                      </Button>
                    </Unpacker>
                  ))
                : "ИПР не существует"}
            </div>
          <p className={styles.text}>Описание задачи</p>
        </div>
        <div className={styles.wrapper__button}>
          <Button color="red" width="281" heigth="56" onClick={onClick}>
            Закрыть задачу
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={onClick}>
            Отмена
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MyTask;
