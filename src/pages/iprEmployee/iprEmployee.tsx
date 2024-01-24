import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./iprEmployee.module.scss";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const IprEmployee: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  const onClickIPR = () => {
    navigate("/myipr");
  };

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
      <Navigation />
      <Card
        size="small"
        // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
        name="Соколов Михаил 
        Алексеевич"
        appointment="Финансовый аналитик"
      />
      <Button color="white" width="304" heigth="48" >
        Мои достижения
      </Button>
      <Button color="white" width="304" heigth="48" disabled>
        Моя команда
      </Button>
      <Button color="white" width="304" heigth="48" onClick={onClickIPR}>
        Мои ИПР
      </Button>
      <Footer footerLinkList={footerLinkList} />
    </section>
  );
};

export default IprEmployee;
