import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesMyIpr from "./myIpr.module.scss";
import Link from "../../ui/links/link";
import { isContainRoute } from "../../utils/breadcrumbs";

import ListTask from "../../components/listTask/listTask";
import Button from "../../ui/buttons/button/button";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";
import ListIpr from "../../components/listIpr/listIpr";

// замоканный is_Boss
const isBoss = false;

const MyIpr: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Мои ИПР" }], replace: true });
      }
    },
    [pathname, url, state]
  );

  function onClick() {
    alert("Переход к определенному списку задач");
  }

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };


  return (
    <section className={stylesMyIpr.page}>
      <div className={stylesMyIpr.container}>
        <span className={stylesMyIpr.link}>
          <Link
            href={"/myipr"}
            onClick={routeTo}
            color="black"
            size="16"
            weight="700"
            underline={false}
            arrow
          >
            Назад
          </Link>
        </span>
        <div className={stylesMyIpr.wrapper}>
          <ListIpr size='small'/>
          <ListTask tasks={mockDataTask} isBoss={isBoss} />
        </div>
        <div className={stylesMyIpr.wrapper__button}>
          <Button color="red" width="281" heigth="56" onClick={onClick}>
            Закрыть задачу
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={onClick}>
            Отмена
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MyIpr;
