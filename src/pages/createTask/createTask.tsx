import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./createTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";

const CreateTask: FC = (): JSX.Element => {
  const [skills, setSkills] = useState("hard");
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
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

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/employee-ipr/create-ipr", {
      replace: true,
      state: state.slice(0, 3),
    });
  };
  function handleChange(e: any) {
    console.log(e.target.value);
  }
  function handleSkillsChange(e: any) {
    setSkills(e.target.value);
  }

  return (
<>
          <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
          Создание новой задачи
          </h2>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
          <section className={styles.listIpr}>
             <div className={styles.nameIpr}>
               <Input onChange={handleChange} />
               <div className={styles.skillsIpr}>
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
            <div className={styles.dateIprWrapp}>
              <div className={styles.dateIpr}>
                <p className={styles.autorIpr}>Дата создания задачи</p>
                <InputCalendar icon={true} />
              </div>
              <div className={styles.dateIpr}>
                <p className={styles.autorIpr}>Дата закрытия задачи</p>
                <InputCalendar icon={true} />
              </div>
            </div>
          </section>
          </div>
          <div className={`${styles.wrapper__button} ${gridAreasLayout.wrapper_buttons}`}>
          <Button color="red" width="281" heigth="56" onClick={onClick}>
            Добавить задачу
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={onClick}>
            Отмена
          </Button>
        </div>
        </>
  );
};

export default CreateTask;
