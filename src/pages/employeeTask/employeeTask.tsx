import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./employeeTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";

import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";
import ListIpr from "../../components/listIpr/listIpr";

const EmployeeTask: FC = (): JSX.Element => {
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

  function onClick() {
    alert("Повторить задачу");
  }

  function handleRouteStatusIpr(e: any) {
    e.preventDefault();
    navigate(-1);
  }

  function editTask(e: any) {
    e.preventDefault();
    navigate("edit-task");
  };

  return (
    <>
      {pathname === '/employee-ipr/list-tasks/task' &&
        <>
          <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
            Название задачи
          </h1>

          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <p className={styles.text}>Описание задачи</p>
            <Textarea
              height="102px"
              value="Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. После дать оценку своим знаниям по вашему мнению."
              disabled
            />
            <DeadlineBlock deadline={'2024-01-30'} />
          </div>

          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="281" heigth="56" onClick={handleRouteStatusIpr}>
              Закрыть задачу
            </Button>
            <Button color="red" width="281" heigth="56" onClick={editTask}>
              Редактировать задачу
            </Button>
          </div>
        </>
      }
      <Outlet />
    </>
  );
};

export default EmployeeTask;
