import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../ui/buttons/button/button";
import Checkbox from "../../ui/checkbox/checkbox";
import NotCompletedIcon from "../../ui/icons/statusTask/notCompleted";
import InProgressIcon from "../../ui/icons/statusTask/inProgress";
import CompleteIcon from "../../ui/icons/statusTask/complete";
import CanselIcon from "../../ui/icons/statusTask/cansel";
import TrailIcon from "../../ui/icons/statusTask/trail";
import EditIcon from "../../ui/icons/edit";
import { ITask } from "../../api/ipr";

import styleTask from "./task.module.scss";


const Task: FC<ITask> = ({ name, checkbox, status, isBoss, onClick }) => {
  const [crm, setCrm] = useState(checkbox);

  const location = useLocation();
  const navigate = useNavigate(); // функция принудительного перехода.
  const url = window.location.href;

  const onCrmChange = () => {
    setCrm(!crm);
  };

  return (
    <li className={styleTask.item}>
      {!isBoss && <Checkbox checked={crm!} onChange={onCrmChange} name="crm" value={name} />}
      <Button
        color="transparent"
        width="456"
        heigth="35"
        onClick={onClick}
      >
        {name}
      </Button>
      <div className={styleTask.status}>
        {status === "not_complete" && <NotCompletedIcon />}
        {status === "in_progress" && <InProgressIcon />}
        {status === "complete" && <CompleteIcon />}
        {status === "cansel" && <CanselIcon />}
        {status === "trail" && <TrailIcon />}
      </div>
      <span className={styleTask.tool}>
        {(status === "not_complete" && "Задача не выполнена") ||
          (status === "in_progress" && "Задача в работе") ||
          (status === "complete" && "Задача выполнена") ||
          (status === "cansel" && "Задача отменена") ||
          (status === "trail" && "Задача отстает")}
      </span>
    </li>
  );
};

export default Task;
