import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./myTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";
import { selectUser } from "../../services/slice/userSlice";

import { isContainRoute } from "../../utils/breadcrumbs";



const MyTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const param = useParams();
  const dispatch = useAppDispatch();
  const { ipr } = useAppSelector(selectIpr);
  const { user } = useAppSelector(selectUser);
  let task = null;

  useEffect(() => {
    if (pathname === `/myipr/${param!.idMyIpr}/my-task/${param!.idMyTask}` && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  useEffect(() => {
    user && dispatch(fetchIpr(user?.id));
  }, [user]);

  // if (ipr?.length) task = ipr![Number(param!.idMyIpr)].tasks[Number(param!.idMyTask)];
  if (ipr?.length) {
    let actualIpr = ipr.find(elem => elem.id === Number(param!.idMyIpr)) || { tasks: [] };
    let actualTasksList = actualIpr.tasks;
    task = actualTasksList.find(elem => elem.id === Number(param!.idMyTask))
  }


  // ipr.find(elem => elem.id === Number(param!.idMyIpr))

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      {task && (
        <>
          <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
            {task.name}
          </h1>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <div className={styles.wrapper__task}>
              <p className={styles.text}>Описание задачи</p>
              <Textarea
                height="102px"
                value={task.description}
                disabled
              />
              <DeadlineBlock deadline={task.end_date} />
            </div>
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="522" heigth="56" onClick={routeTo}>
              Закрыть задачу
            </Button>
          </div>
        </>)}
    </>
  );
};

export default MyTask;
