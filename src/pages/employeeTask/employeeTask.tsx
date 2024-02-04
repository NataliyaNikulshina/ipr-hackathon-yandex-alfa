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
import { deleteTaskApi } from "../../api/ipr";
import { isContainRoute } from "../../utils/breadcrumbs";

const EmployeeTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const url = window.location.href;
  const dispatch = useAppDispatch();
  const { ipr } = useAppSelector(selectIpr);
  let iprEmployee = ipr.find(elem => elem.id === Number(param.idIpr));
  let task = null;

  useEffect(() => {
    dispatch(fetchIpr(Number(param!.id)));
  }, []);

  if (iprEmployee) task = iprEmployee.tasks.find(elem => elem.id === Number(param.idTask));

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
    deleteTaskApi(Number(param.idTask))
    .then (()=>{
      dispatch(fetchIpr(Number(param!.id)));
      navigate(-1);
    });
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
            <DeadlineBlock deadline={task.end_date} status={task.status}/>
          </div>

          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="281" heigth="56" onClick={handleRouteStatusIpr}>
              Удалить задачу
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
