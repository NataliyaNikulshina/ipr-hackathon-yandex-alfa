import { FC, useState, useEffect, FormEvent, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet, useParams } from 'react-router';
import styles from "./employeeIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";

import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";
import ListIpr from "../../components/listIpr/listIpr";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";
import { fetchEmployee } from "../../services/slice/employeeSlice";
import { selectEmployee } from "../../services/slice/employeeSlice";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";


const EmployeeIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const { employee, isLoading } = useAppSelector(selectEmployee);
  const { ipr } = useAppSelector(selectIpr);
  const param = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployee(Number(param!.id)));
  }, []);

  useEffect(() => {
    employee && dispatch(fetchIpr(Number(param!.id)));
  }, [employee]);

  useEffect(
    () => {
      if (pathname===`/employee-ipr/${param!.id}` && state && !isContainRoute(state, url)) {
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
         {employee && !isLoading && (<Card
            size="small"
            avatar={employee.userpic}
            name={`${employee.last_name} ${employee.first_name} ${employee.patronymic}`}
            appointment={employee.position}
          />)}
        </div>
        {pathname === `/employee-ipr/${param!.id}` && employee && !isLoading &&
          <>
            <div className={gridAreasLayout.wrapper_work_info}>
              {ipr &&(
                 <ListIpr size='big' isBoss={true} iprList={ipr} titleEmpty='ИПР пока нет.' />
              )}
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
