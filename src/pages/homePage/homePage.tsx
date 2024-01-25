import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import Button from "../../ui/buttons/button/button";

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
