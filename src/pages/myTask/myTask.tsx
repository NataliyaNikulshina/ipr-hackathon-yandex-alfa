import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";

import { isContainRoute } from "../../utils/breadcrumbs";



const MyTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname === "/myipr/my-task" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        Тест на знание корпоративной культуры
      </h1>
      <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <div className={styles.wrapper__task}>
              <p className={styles.text}>Описание задачи</p>
              <Textarea
                height="102px"
                value="Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. После дать оценку своим знаниям по вашему мнению."
                disabled
              />
              <DeadlineBlock deadline={'2024-02-05T12:00:00.000Z'} />
            </div>
      </div>
      <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="522" heigth="56" onClick={routeTo}>
              Закрыть задачу
            </Button>
      </div>
    </>
  );
};

export default MyTask;
