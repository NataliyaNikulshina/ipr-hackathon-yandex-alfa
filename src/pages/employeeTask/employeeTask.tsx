import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./employeeTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";

import { isContainRoute } from "../../utils/breadcrumbs";

const EmployeeTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname === '/employee-ipr/list-tasks/task' && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function handleRouteStatusIpr(e: any) {
    e.preventDefault();
    navigate(-1);
  }

  function editTask(e: any) {
    e.preventDefault();
    navigate("edit-task", { state: state });
  };

  return (
    <>
      {pathname === '/employee-ipr/list-tasks/task' && (
        <>
          <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
          Тест на знание корпоративной культуры
          </h2>

          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
          <p className={styles.text}>Описание задачи</p>
            <Textarea
              height="142px"
              value="Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. После дать оценку своим знаниям по вашему мнению."
              disabled
            />
            <DeadlineBlock deadline={'2024-02-31T16:41:29.065Z'} />
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
      )}
      <Outlet />
    </>
  );
};

export default EmployeeTask;
