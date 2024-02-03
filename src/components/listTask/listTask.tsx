import { FC, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Unpacker from "../../ui/unpacker/unpacker";

import styleTask from "./listTask.module.scss";
import Task  from "../task/task";
import { ITask } from "../../api/ipr";


export interface IListTask {
  tasks?: ITask[];
  isBoss: boolean;
}

const ListTask: FC<IListTask> = ({ tasks, isBoss }) => {
  const location = useLocation();
  const navigate = useNavigate(); // функция принудительного перехода.
  const url = window.location.href;
  const param = useParams();

  const onClickMyTasks = () => {
    // navigate("/myipr/my-task", { state: [{ path: "/myipr", url: "/myipr", title: "Мои ИПР" }] });
    navigate("my-task", { state: [{ path: "/myipr", url: "/myipr", title: "Мои ИПР" }] });
  };

  return (
    <div className={styleTask.container}>
      <ul className={styleTask.list}>
        {tasks?.length
          ? tasks.map((el, index) => (
            <Unpacker key={el.id}>
              <Task name={el.name} checkbox={el.checkbox} status={el.status} isBoss={isBoss} onClick={isBoss ? (() => navigate(`/employee-ipr/${param.id}/list-tasks/${param.idIpr}/task/${index}`, { state: location.state })) : onClickMyTasks}/>
            </Unpacker>
          ))
          : <li className={styleTask.title__empty}>Задач не существует</li>
        }
        {/* <li className={styleTask.item}>
          <input type="checkbox">{tasks.checkbox}</input>
          <Button color="transparent" width="456" heigth="20" onClick={onClick}>
            {tasks.title}
          </Button>
        </li> */}
      </ul>
    </div>
  );
};

export default ListTask;
