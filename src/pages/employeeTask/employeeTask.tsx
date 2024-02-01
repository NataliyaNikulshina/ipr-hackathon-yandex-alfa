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
     





    // {/* <section className={styles.page}>
    //   <div className={styles.container}>
    //     <div className={styles.head}>
    //       <span className={styles.header}>
    //         <Link
    //           href={"/myipr"}
    //           onClick={routeTo}
    //           color="black"
    //           size="16"
    //           weight="700"
    //           underline={false}
    //           arrow
    //         >
    //           Назад
    //         </Link>
    //       </span>
    //       <h2 className={styles.title}>
    //         Тест на знание корпоративной культуры
    //       </h2>
    //     </div>
    //     <div className={styles.wrapper}>
    //       <Card
    //         size="small"
    //         // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
    //         name="Соколов Михаил 
    //     Алексеевич"
    //         appointment="Финансовый аналитик"
    //       />

    //       <div className={styles.wrapper__task}> */}

            

    //     </div>
    //     <div className={styles.wrapper__button}>
    //       <Button
    //         color="red"
    //         width="281"
    //         heigth="56"
    //         onClick={handleRouteStatusIpr}
    //       >
    //         Закрыть задачу
    //       </Button>
    //       <Button color="grey" width="281" heigth="56" onClick={onClick}>
    //         Повторить задачу
    //       </Button>
    //     </div>
    //   </div>
    // </section>
  );
};

export default EmployeeTask;
