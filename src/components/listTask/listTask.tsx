import { FC, useState } from "react";
import Button from "../../ui/buttons/button/button";
import Unpacker from "../../ui/unpacker/unpacker";
import Checkbox from "../../ui/checkbox/checkbox";

import styleTask from "./listTask.module.scss";
import Task  from "../task/task";
import { ITask } from "../../api/ipr";


export interface IListTask {
  tasks?: ITask[];
  isBoss: boolean;
}

const ListTask: FC<IListTask> = ({ tasks, isBoss }) => {

  return (
    <div className={styleTask.container}>
      <ul className={styleTask.list}>
        {tasks?.length
          ? tasks.map((el) => (
            <Unpacker key={el.id}>
              <Task name={el.name} checkbox={el.checkbox} status={el.status} isBoss={isBoss} />
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
