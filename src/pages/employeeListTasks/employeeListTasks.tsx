import { FC, useEffect } from "react";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import styles from "./employeeListTasks.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import ListTask from "../../components/listTask/listTask";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";
import { isContainRoute } from "../../utils/breadcrumbs";

const EmployeeListTasks: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const param = useParams();
  const dispatch = useAppDispatch();
  const { ipr } = useAppSelector(selectIpr);
  let iprEmployee = ipr.find(elem => elem.id === Number(param.idIpr));

  useEffect(() => {
    dispatch(fetchIpr(Number(param!.id)));
  }, []);

  useEffect(() => {
    if (pathname.endsWith(`list-tasks/${param!.idIpr}`) && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задачи ИПР" }],
        replace: true
      });
    }
  }, [pathname, url, state]);

  function createTask(e: any) {
    e.preventDefault();
    navigate("create-task", { state: state });
  }

  function editIpr(e: any) {
    e.preventDefault();
    navigate("edit-ipr", { state: state });
  };

  function statusIpr(e: any) {
    e.preventDefault();
    navigate("status-ipr", { state: state });
  };

  return (
    <>
      {(pathname.endsWith(`list-tasks/${param!.idIpr}`)) && iprEmployee && 
        <>
          <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
            {iprEmployee.title}
          </h1>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            {ipr && <ListTask tasks={iprEmployee.tasks} isBoss={true} />}
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="281" heigth="56" onClick={createTask}>
              Создать задачу
            </Button>
            <div className={styles.button}>
            <Button color="grey" width="281" heigth="56" onClick={editIpr}>
              Редактировать ИПР
            </Button>
            <Button color="grey" width="281" heigth="56" onClick={statusIpr}>
              Статус ИПР
            </Button>
          </div>
          </div>
        </>
      }
      <Outlet />
    </>
  );
};

export default EmployeeListTasks;
