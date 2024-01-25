import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./myIpr.module.scss";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";


// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const MyIpr: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  let initialBreadcrumb = [];

  const onClickTeam = () => {
    navigate("/");
  };

  const onClickMyTasks = () => {
  initialBreadcrumb = [{ path: location.pathname, url, title: "Мои ИПР" }];
  navigate("/myipr/my-tasks", {state: initialBreadcrumb});
  }


  return (
    <section className={stylesProfile.page}>
      <Navigation />
      <p>Мои ИПР</p>
      
      <Button color="white" width="304" heigth="48" >
        Мои достижения
      </Button>
      <Button color="white" width="304" heigth="48" onClick={onClickTeam}>
        Моя команда
      </Button>
      <Button color="white" width="304" heigth="48" disabled>
        Мои ИПР
      </Button>
      <Button color="white" width="304" heigth="48" onClick={onClickMyTasks}>
        Мои будущие задачи
      </Button>


      <Footer footerLinkList={footerLinkList} />
    </section>
  );
};

export default MyIpr;