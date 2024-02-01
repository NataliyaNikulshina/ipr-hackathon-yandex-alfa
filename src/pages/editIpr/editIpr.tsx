import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./editIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import { routesUrl } from "../../app";

import { isContainRoute } from "../../utils/breadcrumbs";

const CreateIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname==="/employee-ipr/list-tasks/edit-ipr" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state,
        { path: pathname, url, title: "Редактирование ИПР" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  function onClick(e: any) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <>
      <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        здесь будет заголовок
      </h1>
      <div className={`${gridAreasLayout.wrapper_work_info}`}>
        <p>Здесь будет редактирование ИПР</p>
      </div>
      <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
        <Button color="red" width="281" heigth="56" onClick={onClick}>
          Изменить ИПР
        </Button>
        <Button color="grey" width="281" heigth="56" onClick={onClick}>
          Отмена
        </Button>
      </div>
    </>
  );
};

export default CreateIpr;
