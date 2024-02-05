import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Unpacker from "../../ui/unpacker/unpacker";

import styleTask from "./listTask.module.scss";
import Task from "../task/task";
import { ITask } from "../../api/ipr";


export interface IListTask {
  tasks?: ITask[];
  isBoss: boolean;
  isSelectedIprId?: number;
  handleChangeCheked?: ((chek: boolean, id: number) => void);
}

const ListTask: FC<IListTask> = ({handleChangeCheked, tasks, isBoss, isSelectedIprId = -1 }) => {
  const location = useLocation();
  const navigate = useNavigate(); // функция принудительного перехода.
  const url = window.location.href;
  const param = useParams();



  return (
    <div className={styleTask.container}>
      <ul className={styleTask.list}>
        {tasks?.length
          ? tasks.map((el) => (
            <Unpacker key={el.id}>
              <Task handleChangeCheked={handleChangeCheked} id={el.id} name={el.name} checkbox={el.status === 'complete'} status={el.status} isBoss={isBoss}
                onClick={isBoss ?
                  (() => navigate(`/employee-ipr/${param.id}/list-tasks/${param.idIpr}/task/${el.id}`, { state: location.state }))
                  : (() => navigate(`/myiprs/myipr/${param!.idMyIpr}/my-task/${el.id}`, { state: [{ path: `/myiprs/myipr/${param!.idMyIpr}`, url: url, title: "Мои ИПР" }] }))} />
            </Unpacker>
          ))
          : <li className={styleTask.title__empty}> {isSelectedIprId < 0 ? 'Задач не существует' : 'Выберите ИПР'}</li>
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
