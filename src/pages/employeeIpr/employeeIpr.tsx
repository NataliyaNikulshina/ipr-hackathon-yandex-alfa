import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from 'react-router';
import styles from "./employeeIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";

import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";
import ListIpr from "../../components/listIpr/listIpr";
import { routesUrl } from "../../app";

// export interface IIprEmployee {

// }

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

const EmployeeIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (pathname==="/employee-ipr" && state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "ИПР Сотрудника" }],
        replace: true});
      }
    },
    [pathname, url, state]
  );

  function createIpr(e: any) {
    e.preventDefault();
    navigate("create-ipr", { state: state });
  };

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className={styles.page}>
      <div className={`${styles.container} ${gridAreasLayout.container}`}>
        <span className={`${styles.link} ${gridAreasLayout.wrapper_link}`}>
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

        <div className={gridAreasLayout.wrapper_main_info}>
          <Card
            size="small"
            // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
            name="Соколов Михаил Алексеевич"
            appointment="Финансовый аналитик"
          />
        </div>
        {pathname === '/employee-ipr' &&
          <>
            <div className={gridAreasLayout.wrapper_work_info}>
              <ListIpr size='big' isBoss={true} iprList={mockDataIpr} titleEmpty='ИПР пока нет.' />
            </div>
            <div className={`${styles.container__button} ${gridAreasLayout.wrapper_buttons}`}>
              <Button color="red" width="554" heigth="56" onClick={createIpr}>
                Добавить ИПР
              </Button>
            </div>
          </>
        }
        <Outlet />
      </div>
    </section>
  );
};

export default EmployeeIpr;
