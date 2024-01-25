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

import styleTask from "./task.module.scss";

export interface ITasks {
  id?: number;
  title: string;
  status: string;
  checkbox: boolean;
  isBoss?: boolean;
}

const Task: FC<ITasks> = ({ title, checkbox, status, isBoss}) => {
  const [crm, setCrm] = useState(checkbox);

  const location = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  let initialBreadcrumb = [];

  const onClickMyTasks = () => {
    initialBreadcrumb = [{ path: location.pathname, url, title: "Мои ИПР" }];
    navigate("/myipr/my-task", {state: initialBreadcrumb});
    }

  const onCrmChange = () => {
    setCrm(!crm);
  };

  return (
    <li className={styleTask.item}>
      <Checkbox
        checked={crm}
        onChange={onCrmChange}
        name="crm"
        value={title}
      />
      <Button color="transparent" width="456" heigth="20" onClick={onClickMyTasks}>
        {title}
      </Button>
      <div className={styleTask.status}>
      {status==="not_complete" && (<NotCompletedIcon />)}
      {status==="in_progress" && (<InProgressIcon />)}
      {status==="complete" && (<CompleteIcon />)}
      {status==="cansel" && (<CanselIcon />)}
      {status==="trail" && (<TrailIcon />)}
      </div>
      {isBoss && (<EditIcon />)}
    </li>
  );
};

export default Task;
