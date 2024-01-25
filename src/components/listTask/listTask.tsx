import { FC, useState } from "react";
import Button from "../../ui/buttons/button/button";
import Unpacker from "../../ui/unpacker/unpacker";
import Checkbox from "../../ui/checkbox/checkbox";

import styleTask from "./listTask.module.scss";
import Task, { ITasks } from "../task/task";


export interface IListTask {
  tasks: ITasks[];
  isBoss: boolean;
}

const ListTask: FC<IListTask> = ({ tasks, isBoss }) => {

  return (
    <div className={styleTask.container}>
      <ul className={styleTask.list}>
        {tasks?.length
          ? tasks.map((el) => (
              <Unpacker key={el.id}>
                  <Task title={el.title} checkbox={el.checkbox} status={el.status} isBoss={isBoss} />
              </Unpacker>
            ))
          : ""}
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
