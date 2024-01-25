import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTask.module.scss";

// import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

const MyTask: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Задача" }], replace: true });
      }
    },
    [pathname, url, state]
  );


  return (
    <section className={styles.page}>
      <p>Здесь будет моя задача</p>
    </section>
  );
};

export default MyTask;
