import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./statusIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

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
    navigate(-1);
  };

  return (
       <>
       <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
         Название ИПР
       </h1>
       <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
         <p>Здесь будет статус ИПР</p>
       </div>
       <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
         <Button color="red" width="281" heigth="56" onClick={routeTo}>
           Закрыть ИПР
         </Button>
         <Button color="grey" width="281" heigth="56" onClick={onClick}>
           Оценить выполнение ИПР
         </Button>
       </div>
     </>
  );
};

export default StatusIpr;
