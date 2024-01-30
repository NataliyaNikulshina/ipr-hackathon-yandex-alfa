import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./statusIpr.module.scss";

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";

import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";

const StatusIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Статус выполнения ИПР" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick() {
    alert("Оценка ИПР");
  }

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/employee-ipr/list-tasks", {
      replace: true,
      state: state.slice(0, 3),
    });
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
          />
          <p>Здесь будет статус выполнения ИПР</p>
        </div>
        <div className={styles.wrapper__button}>
        <Button color="red" width="522" heigth="56" onClick={onClick} disabled={false}>
                Оценить ИПР
              </Button>
        </div>
      </div>
    </section>
  );
};

export default StatusIpr;
