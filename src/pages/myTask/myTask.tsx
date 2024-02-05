import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./myTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchmyIpr } from "../../services/slice/myIprSlice";
import { selectMyIpr } from "../../services/slice/myIprSlice";
import { selectUser } from "../../services/slice/userSlice";
import { editTaskStatusApi } from "../../api/ipr";
import { isContainRoute } from "../../utils/breadcrumbs";


export interface IMyTask {
  handlePopup(editing: object): void;
}

const MyTask: FC<IMyTask> = ({ handlePopup }): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const param = useParams();
  const dispatch = useAppDispatch();
  const { myIpr } = useAppSelector(selectMyIpr);
  const { user } = useAppSelector(selectUser);
  let task: null | any = null;

  useEffect(() => {
    if (pathname === `/myiprs/myipr/${param!.idMyIpr}/my-task/${param!.idMyTask}` && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  useEffect(() => {
    user && dispatch(fetchmyIpr(user?.id));
  }, [user]);

  if (myIpr?.length) {
    let actualIpr = myIpr.find(elem => elem.id === Number(param!.idMyIpr)) || { tasks: [] };
    let actualTasksList = actualIpr.tasks;
    task = actualTasksList.find(elem => elem.id === Number(param!.idMyTask))
  }


  // ipr.find(elem => elem.id === Number(param!.idMyIpr))

  // const routeTo = (e: any) => {
  //   e.preventDefault();
  //   editTaskApi({
  //     name: task.name,
  //     description: task.description,
  //     end_date: task.end_date,
  //     start_date: task.start_date,
  //     executor: Number(user!.id),
  //     status: "complete",
  //     skill: task.skill,
  //     ipr: Number(param.idMyIpr)
  //   },
  //   Number(param.idMyTask))
  //   .then((res) => {
  //     dispatch(fetchIpr(Number(user!.id)));
  //     navigate(-1);
  //   })
  // };

  const handleEditTaskStatus = (e: any) => {
    e.preventDefault();
    editTaskStatusApi({
      status: "complete",
    },
      Number(param.idMyTask))
      .then((res) => {
        dispatch(fetchmyIpr(Number(user!.id)));
        navigate(-1);
      })
      .catch((res) => {
        const popupAssignment = "error";
        const text = "При изменении статуса задачи что то пошло не так"
        handlePopup && handlePopup({ popupAssignment, newPopupText: text });
      })
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
              <DeadlineBlock deadline={task.end_date} status={task.status} />
            </div>
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="522" heigth="56" onClick={handleEditTaskStatus}>
              Закрыть задачу
            </Button>
          </div>
        </>)}
    </>
  );
};

export default MyTask;
