import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./iprCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import { routesUrl } from "../../app";

import { isContainRoute } from "../../utils/breadcrumbs";

export interface IIprCreateOrEdit {
  role: string;
  heading?: string;
  submitButtonText?: string;
  resetButtonText?: string;
  ipr?: object;
}

const IprCreateOrEdit: FC<IIprCreateOrEdit> = ({ role, heading, submitButtonText, resetButtonText, ipr }): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname === "/employee-ipr/create-ipr" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Создание нового ИПР" },
        ],
        replace: true,
      });
    } else if (pathname === "/employee-ipr/list-tasks/edit-ipr" && state && !isContainRoute(state, url)) {
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

  function handleChange(e: any) {
    console.log(e.target.value);
  }

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        {heading || 'ИПР создание или редактирование'}
      </h2>
      <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
        <section className={styles.listIpr}>
          <p className={styles.autorIpr}>
            Автор ИПР: Антонова Екатерина Владимировна
          </p>
          <div className={styles.nameIpr}>
            <Input onChange={handleChange} placeholder='Введите название ИПР' />
          </div>
          <div className={styles.dateIprWrapp}>
            <div className={styles.dateIpr}>
              <p className={styles.autorIpr}>Дата создания ИПР</p>
              <InputCalendar icon={true} />
            </div>
            <div className={styles.dateIpr}>
              <p className={styles.autorIpr}>Дата закрытия ИПР</p>
              <InputCalendar icon={true} />
            </div>
          </div>
        </section>
      </div>
      <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
        <Button color="red" width="281" heigth="56" onClick={onClick}>
          {submitButtonText || 'submit'}
        </Button>
        <Button color="grey" width="281" heigth="56" onClick={onClick}>
          {resetButtonText || 'reset'}
        </Button>
      </div>
    </>
  );
};

export default IprCreateOrEdit;
