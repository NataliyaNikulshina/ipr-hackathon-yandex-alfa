import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./taskCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useForm from "../../utils/use-form";

import { isContainRoute } from "../../utils/breadcrumbs";
import { addTaskApi, editTaskApi, ITask } from "../../api/ipr";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";


export interface ITaskCreateOrEdit {
  role: string;
  task?: object;
}

const TaskCreateOrEdit: FC<ITaskCreateOrEdit> = ({ role }): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useAppDispatch();
  const url = window.location.href;
  let task: null | any = null;
  const { ipr } = useAppSelector(selectIpr);
  let iprEmployee = ipr.find(elem => elem.id === Number(param.idIpr));
  if (iprEmployee) task = iprEmployee!.tasks.find(elem => elem.id === Number(param.idTask));
  const { values, handleChange, setValues } = useForm({
    name: { value: task && task.name || "", valueValid: false },
    description: { value: task && task.description || "", valueValid: false },
  });
  const [skills, setSkills] = useState(task && task.skill ||"hard");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (pathname === "/employee-ipr/list-tasks/task/edit-task" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Редактирование задачи" },
        ],
        replace: true,
      });
    } else if (pathname === "/employee-ipr/list-tasks/create-task" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Создание новой задачи" },
        ],
        replace: true,
      });
    }
  }, [pathname, url, state]);
  useEffect(() => {
    // Проверяем, что task загружен и устанавливаем даты
    if (task) {
      setStartDate(new Date(task.start_date));
      setEndDate(new Date(task.end_date));
    }
  }, [task]);

  const clearInput = () => {
    setValues({
      name: { value: "", valueValid: false },
      description: { value: "" , valueValid: false },
    });
    setStartDate(iprEmployee && new Date(iprEmployee.start_date) || null);
    setEndDate(iprEmployee && new Date(iprEmployee.end_date) || null);
  }

  const handleDateChangeStart = (date: Date | null) => {
    setStartDate(date);
    console.log(date?.toLocaleDateString());
  };

  const handleDateChangeEnd = (date: Date | null) => {
    setEndDate(date);
    console.log(date?.toLocaleDateString());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    role === "create"
      ? (endDate && startDate &&
    addTaskApi({
        name: values.name.value,
        description: values.description.value,
        end_date: endDate!.toJSON().slice(0, 10),
        start_date: startDate!.toJSON().slice(0, 10),
        executor: Number(param.id),
        status: "in_progress",
        skill: skills,
        ipr: Number(param.idIpr)
      })
      .then((res) => {
        dispatch(fetchIpr(Number(param!.id)));
        navigate(-1);
      }))
    : (endDate && startDate &&
      editTaskApi({
          name: values.name.value,
          description: values.description.value,
          end_date: endDate!.toJSON().slice(0, 10),
          start_date: startDate!.toJSON().slice(0, 10),
          executor: Number(param.id),
          status: "in_progress",
          skill: skills,
          ipr: Number(param.idIpr)
        },
        Number(param.idTask))
        .then((res) => {
          dispatch(fetchIpr(Number(param!.id)));
          navigate(-1);
        }))
  };

  function handleSkillsChange(e: any) {
    setSkills(e.target.value);
  }

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
      {role === "create" ? "Создание новой задачи" : "Редактирование задачи"}
      </h2>
      <div
        className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}
      >
        <section className={styles.listTask}>
          <div className={styles.nameTask}>
            <Input onChange={handleChange} name="name" value={values.name.value} placeholder="Введите название" close={false}/>
            <div className={styles.skillsTask}>
              <Button
                name="skill"
                value="hard"
                color={skills === "hard" ? "darkGrey" : "white"}
                width="98"
                heigth="40"
                onClick={handleSkillsChange}
              >
                Hard skill
              </Button>
              <Button
                name="skill"
                value="soft"
                color={skills === "soft" ? "darkGrey" : "white"}
                width="98"
                heigth="40"
                onClick={handleSkillsChange}
              >
                Soft Skill
              </Button>
            </div>
          </div>
          <Textarea
            width="522px"
            height="202px"
            placeholder="Введите описание задачи"
            name="description"
            value={values.description.value}
            onChange={handleChange}
          />
          <div className={styles.dateTaskWrapp}>
            <div className={styles.labelTask}>
              <p className={styles.autorTask}>Дата создания задачи</p>
              <InputCalendar icon={true} name="dataCreator" value={startDate} onChange={handleDateChangeStart}/>
            </div>
            <div className={styles.labelTask}>
              <p className={styles.autorTask}>Дата закрытия задачи</p>
              <InputCalendar icon={true} name="dataCreator" value={endDate} onChange={handleDateChangeEnd}/>
            </div>
          </div>
        </section>
      <div className={`${styles.wrapper__button}`}>
        <Button color="red" width="281" heigth="56" onClick={handleSubmit}>
        {role === "create" ? "Добавить задачу" : "Редактировать задачу"}
        </Button>
        <Button color="grey" width="281" heigth="56" onClick={clearInput}>
        {role === "create" ? "Очистить" : "Отмена"}
        </Button>
      </div>
      </div>
    </>
  );
};

export default TaskCreateOrEdit;