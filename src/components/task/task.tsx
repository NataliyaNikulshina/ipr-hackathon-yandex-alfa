import { FC, useState } from "react";
import Button from "../../ui/buttons/button/button";
import Checkbox from "../../ui/checkbox/checkbox";
import NotCompletedIcon from "../../ui/icons/statusTask/notCompleted";
import InProgressIcon from "../../ui/icons/statusTask/inProgress";
import CompleteIcon from "../../ui/icons/statusTask/complete";
import CanselIcon from "../../ui/icons/statusTask/cansel";
import TrailIcon from "../../ui/icons/statusTask/trail";
import { ITask } from "../../api/ipr";

import styleTask from "./task.module.scss";

const Task: FC<ITask> = ({
  handleChangeCheked,
  id,
  name,
  checkbox,
  status,
  isBoss,
  onClick,
}) => {
  const [crm, setCrm] = useState(checkbox);

  const onCrmChange = () => {
    setCrm(!crm);
    if (handleChangeCheked) {
      handleChangeCheked(!crm, id);
    }
  };

  return (
    <li className={styleTask.item}>
      {!isBoss && (
        <Checkbox
          checked={crm!}
          onChange={onCrmChange}
          name="crm"
          value={name}
          disabled={status === "complete"}
        />
      )}
      <Button color="transparent" width="456" heigth="35" onClick={onClick}>
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
