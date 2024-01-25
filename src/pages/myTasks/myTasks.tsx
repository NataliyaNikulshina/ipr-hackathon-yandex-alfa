import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTasks.module.scss";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const MyTasks: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  const onClickTeam = () => {
    navigate("/");
  };

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Задачи" }], replace: true });
      }
    },
    [pathname, url, state]
  );


  return (
    <section className={styles.page}>
      <Navigation />
      <p>Мои Задачи</p>
      
      <Button color="white" width="304" heigth="48" >
        Мои достижения
      </Button>
      <Button color="white" width="304" heigth="48" onClick={onClickTeam}>
        Моя команда
      </Button>
      <Button color="white" width="304" heigth="48" disabled>
        Мои ИПР
      </Button>
      <Footer footerLinkList={footerLinkList} />
    </section>
  );
};

export default MyTasks;
