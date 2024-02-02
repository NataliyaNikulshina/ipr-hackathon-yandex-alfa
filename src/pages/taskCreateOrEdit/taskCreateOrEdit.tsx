import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./taskCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useForm from "../../utils/use-form";

import { isContainRoute } from "../../utils/breadcrumbs";

export interface ITaskCreateOrEdit {
  role: string;
  task: object;
}

const TaskCreateOrEdit: FC<ITaskCreateOrEdit> = ({ role, task }): JSX.Element => {
  const [skills, setSkills] = useState("hard");
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const { values, handleChange, setValues } = useForm({
    name: { value: "", valueValid: false },
    description: { value: "", valueValid: false },
  });
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

  function onClick() {
    navigate(-1);
  }

  const clearInput = () => {
    setValues({
      name: { value: "", valueValid: false },
      description: { value: "", valueValid: false },
    });
    setStartDate(null);
    setEndDate(null);
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
  };

  function handleSkillsChange(e: any) {
    setSkills(e.target.value);
  }

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
      {role === "create" ? "Создание новой задачи" : "Редактирование задачи"}
      </h2>
      <form
        className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}
        onSubmit={handleSubmit}
      >
        <section className={styles.listTask}>
          <div className={styles.nameTask}>
            <Input onChange={handleChange} name="name" value={values.name.value} placeholder="Введите название"/>
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
      </form>
    </>
  );
};

export default TaskCreateOrEdit;