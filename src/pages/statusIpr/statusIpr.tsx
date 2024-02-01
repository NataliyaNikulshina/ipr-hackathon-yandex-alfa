import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./statusIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import { isContainRoute } from "../../utils/breadcrumbs";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";
import Rating from "../../components/rating/rating";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const StatusIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname==="/employee-ipr/list-tasks/status-ipr" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Статус выполнения ИПР" },
        ],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick() {
    alert("Оценка ИПР");
  }

  return (
       <>
          <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>Повышения уровня квалификации</h2>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
          <section className={styles.listIpr}>
            <p className={styles.subtitle}>Статус выполнения ИПР</p>
            <ProgressBar percentage={80}/>
            <DeadlineBlock deadline={"2024-02-05T12:00:00.000Z"}/>
            <p>Оценить выполнение ИПР</p>
            <Rating />
          </section>
       </div>
        <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
          <Button
            color="red"
            width="522"
            heigth="56"
            onClick={onClick}
            disabled={false}
          >
            Оценить ИПР
          </Button>
        </div>
        </>

    // <section className={styles.page}>
    //   <div className={styles.container}>
    //     <div className={styles.head}>
    //       <span className={styles.link}>
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
    //       <h2 className={styles.title}>Повышения уровня квалификации</h2>
    //     </div>

    //     <div className={styles.wrapper}>
    //       <Card
    //         size="small"
    //         // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
    //         name="Соколов Михаил Алексеевич"
    //         appointment="Финансовый аналитик"
    //       />
    //       <section className={styles.listIpr}>
    //         <p className={styles.subtitle}>Статус выполнения ИПР</p>
    //         <ProgressBar percentage={80}/>
    //         <DeadlineBlock deadline={"2024-02-05T12:00:00.000Z"}/>
    //         <p>Оценить выполнение ИПР</p>
    //         <Rating />
    //       </section>
    //     </div>
    //     <div className={styles.wrapper__button}>
    //       <Button
    //         color="red"
    //         width="522"
    //         heigth="56"
    //         onClick={onClick}
    //         disabled={false}
    //       >
    //         Оценить ИПР
    //       </Button>
    //     </div>
    //   </div>
    // </section>
  );
};

export default StatusIpr;
