import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./taskCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";

import { isContainRoute } from "../../utils/breadcrumbs";

export interface ITaskCreateOrEdit {
  role: string;
  heading?: string;
  submitButtonText?: string;
  resetButtonText?: string;
  task: object;
}

const TaskCreateOrEdit: FC<ITaskCreateOrEdit> = ({ role, heading, submitButtonText, resetButtonText, task }): JSX.Element => {
  const [skills, setSkills] = useState("hard");
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

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

  function handleChange(e: any) {
    console.log(e.target.value);
  }
  function handleSkillsChange(e: any) {
    setSkills(e.target.value);
  }

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        {heading || 'Задача создание или редактирование'}
      </h2>
      <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
        <section className={styles.listTask}>
          <div className={styles.nameTask}>
            <Input onChange={handleChange} />
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
          />
          <div className={styles.dateTaskWrapp}>
            <div className={styles.dateTask}>
              <p className={styles.autorTask}>Дата создания задачи</p>
              <InputCalendar icon={true} />
            </div>
            <div className={styles.dateTask}>
              <p className={styles.autorTask}>Дата закрытия задачи</p>
              <InputCalendar icon={true} />
            </div>
          </div>
        </section>
      </div>
      <div className={`${styles.wrapper__button} ${gridAreasLayout.wrapper_buttons}`}>
        <Button color="red" width="281" heigth="56" onClick={onClick}>
          {submitButtonText || 'submit'}
        </Button>
        <Button color="grey" width="281" heigth="56" onClick={onClick}>
          {resetButtonText || 'reset'}
        </Button>
      </div>
    </>
  );
};

export default TaskCreateOrEdit;