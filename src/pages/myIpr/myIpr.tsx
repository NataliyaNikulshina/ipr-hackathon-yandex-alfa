import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesMyIpr from "./myIpr.module.scss";
import Link from "../../ui/links/link";
import Unpacker from "../../ui/unpacker/unpacker";

import ListTask from "../../components/listTask/listTask";
import Button from "../../ui/buttons/button/button";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

// замоканный is_Boss
const isBoss = false;

const MyIpr: FC = (): JSX.Element => {
  const navigate = useNavigate();

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
          <div className={stylesMyIpr.listIpr}>
            {mockDataIpr?.length
              ? mockDataIpr.map((el) => (
                  <Unpacker key={el.id}>
                    <Button color="ipr" width="244" heigth="48" onClick={onClick} disabled={el.id===3 ? true : false }>
                      {el.title}
                    </Button>
                  </Unpacker>
                ))
              : "ИПР не существует"}
          </div>
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
