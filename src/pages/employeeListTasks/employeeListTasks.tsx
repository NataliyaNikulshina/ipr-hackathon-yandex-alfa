import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./employeeListTasks.module.scss";


import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import ListTask from "../../components/listTask/listTask";
import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";

// Моковые данные
import {
    mockDataTask,
    mockDataIpr,
  } from "../../ui/verificationConstants/verificationConstants";

// замоканный is_Boss
const isBoss = true;


const EmployeeListTasks: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Задачи ИПР" }], replace: true });
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
      />
          <ListTask tasks={mockDataTask} isBoss={isBoss} />
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

export default EmployeeListTasks;