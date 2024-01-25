import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./myIpr.module.scss";

import Button from "../../ui/buttons/button/button";


const MyIpr: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  let initialBreadcrumb = [];

  const onClickMyTasks = () => {
  initialBreadcrumb = [{ path: location.pathname, url, title: "Мои ИПР" }];
  navigate("/myipr/my-tasks", {state: initialBreadcrumb});
  }

  return (
    <section className={stylesProfile.page}>
      <Button color="white" width="304" heigth="48" onClick={onClickMyTasks}>
        Мои будущие задачи
      </Button>
    </section>
  );
};

export default MyIpr;