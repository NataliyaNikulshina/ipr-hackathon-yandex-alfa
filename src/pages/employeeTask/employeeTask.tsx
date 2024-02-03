import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import styles from "./employeeTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";
import { isContainRoute } from "../../utils/breadcrumbs";

const EmployeeTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const url = window.location.href;
  const dispatch = useAppDispatch();
  const { ipr } = useAppSelector(selectIpr);
  let task = null;

  useEffect(() => {
    dispatch(fetchIpr(Number(param!.id)));
  }, []);

  if (ipr?.length) task = ipr![Number(param!.idIpr)].tasks[Number(param!.idTask)];

  useEffect(() => {
    if (pathname === `/employee-ipr/${param.id}/list-tasks/${param.idIpr}/task/${param.idTask}` && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function handleRouteStatusIpr(e: any) {
    e.preventDefault();
    navigate(-1);
  }

  function editTask(e: any) {
    e.preventDefault();
    navigate("edit-task", { state: state });
  };

  return (
    <>
      {pathname === `/employee-ipr/${param.id}/list-tasks/${param.idIpr}/task/${param.idTask}` && task &&(
        <>
          <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
          {task.name}
          </h2>

          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
          <p className={styles.text}>Описание задачи</p>
            <Textarea
              height="142px"
              value={task.description}
              disabled
            />
            <DeadlineBlock deadline={task.end_date} />
          </div>

          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="281" heigth="56" onClick={handleRouteStatusIpr}>
              Закрыть задачу
            </Button>
            <Button color="red" width="281" heigth="56" onClick={editTask}>
              Редактировать задачу
            </Button>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
};

export default EmployeeTask;
