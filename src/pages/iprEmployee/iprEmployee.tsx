import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./iprEmployee.module.scss";

import Card from "../../components/card/card";
// import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";


const IprEmployee: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "ИПР Сотрудника" }], replace: true });
      }
    },
    [pathname, url, state]
  );


  return (
    <section className={styles.page}>
      <Card
        size="small"
        // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
        name="Соколов Михаил 
        Алексеевич"
        appointment="Финансовый аналитик"
      />
    </section>
  );
};

export default IprEmployee;
