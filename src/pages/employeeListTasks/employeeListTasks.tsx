import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./employeeListTasks.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import ListTask from "../../components/listTask/listTask";

import { isContainRoute, removeRemainingCrumbs } from "../../utils/breadcrumbs";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

// замоканный is_Boss
const isBoss = true;

const EmployeeListTasks: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задачи ИПР" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  function createTask(e: any) {
    e.preventDefault();
    navigate("create-task");
  }

  function editIpr(e: any) {
    e.preventDefault();
    navigate("edit-ipr");
  };

  function statusIpr(e: any) {
    e.preventDefault();
    navigate("status-ipr");
  };
  

  return (
    <>
      {pathname === '/employee-ipr/list-tasks' &&
        <>
          <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
            Название ИПР
          </h1>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <ListTask tasks={mockDataTask} isBoss={isBoss} />
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="554" heigth="56" onClick={createTask}>
              Создать задачу
            </Button>
            <Button color="red" width="554" heigth="56" onClick={editIpr}>
              Редактировать ИПР
            </Button>
            <Button color="red" width="554" heigth="56" onClick={statusIpr}>
              Статус ИПР
            </Button>
          </div>
        </>
      }
      <Outlet />
    </>

    // <section className={styles.page}>
    //   <div className={styles.container}>
    //     <span className={styles.link}>
    //       <Link
    //         href={"/myipr"}
    //         onClick={routeTo}
    //         color="black"
    //         size="16"
    //         weight="700"
    //         underline={false}
    //         arrow
    //       >
    //         Назад
    //       </Link>
    //     </span>
    //     <div className={styles.wrapper}>
    //       <Card
    //         size="small"
    //         // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
    //         name="Соколов Михаил Алексеевич"
    //         appointment="Финансовый аналитик"
    //       />
    //       <ListTask tasks={mockDataTask} isBoss={isBoss} />
    //     </div>
    //     <div className={styles.wrapper__button}>
    //       <Button color="red" width="554" heigth="56" onClick={onClick}>
    //         Создать задачу
    //       </Button>
    //     </div>
    //   </div>
    // </section>
  );
};

export default EmployeeListTasks;
