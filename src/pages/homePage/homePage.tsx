import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";
import dartsTask from "./images/darts-task.png";
//import  { handlePopup }  from "../../app";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const HomePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  let initialBreadcrumb = [];


  const onClickEmployee = () => {
    initialBreadcrumb = [{ path: "/", url: "/", title: "Моя команда" }];
    navigate("/ipr-employee", { state: initialBreadcrumb });
  };

  return (
    <section className={stylesProfile.page}>
          <Button
            color="white"
            width="304"
            heigth="48"
            onClick={onClickEmployee}
          >
            Будущая таблица сотрудников
          </Button>
          <Statistics />
    </section>
  );
};

export default HomePage;
