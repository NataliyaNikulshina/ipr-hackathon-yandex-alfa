import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./myIpr.module.scss";

import ListTask from "../../components/listTask/listTask";
import Button from "../../ui/buttons/button/button";

// Моковые данные
import { mockDataTask } from "../../ui/verificationConstants/verificationConstants";
// замоканный is_Boss
const isBoss = false;

const MyIpr: FC = (): JSX.Element => {
  function onClick() {
    alert("Переход к определенному списку задач");
  }

  return (
    <section className={stylesProfile.page}>
      <Button color="ipr" width="304" heigth="48" onClick={onClick}>
        Название ИПР
      </Button>
      <Button color="ipr" width="304" heigth="48" onClick={onClick}>
        Название ИПР
      </Button>
      <Button color="ipr" width="304" heigth="48" onClick={onClick}>
        Название ИПР
      </Button>
      <ListTask tasks={mockDataTask} isBoss={isBoss} />
    </section>
  );
};

export default MyIpr;
