import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./createIpr.module.scss";

import Link from "../../ui/links/link";
import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";

import Card from "../../components/card/card";

import { isContainRoute } from "../../utils/breadcrumbs";

const CreateIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const [skills, setSkills] = useState("hard");
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Создание нового ИПР" },
        ],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick(e: any) {
    e.preventDefault();
    navigate("create-task", { state: state, replace: true });
  }

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/employee-ipr", { replace: true, state: state.slice(0, 2) });
  };
  function handleChange(e: any) {
    console.log(e.target.value);
  }
  function handleSkillsChange(e: any) {
    setSkills(e.target.value);
  }
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.link}>
            <Link
              href={"/myipr"}
              onClick={routeTo}
              color="black"
              size="16"
              weight="700"
              underline={false}
              arrow
            >
              Назад
            </Link>
          </span>
          <h2 className={styles.title}>Создание нового ИПР</h2>
        </div>
        <div className={styles.wrapper}>
          <Card
            size="small"
            // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
            name="Соколов Михаил Алексеевич"
            appointment="Финансовый аналитик"
          />
          <section className={styles.listIpr}>
            <p className={styles.autorIpr}>
              Автор ИПР: Антонова Екатерина Владимировна
            </p>
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
              height="172px"
              placeholder="Введите описание ИПР"
            />
            <div className={styles.dateIprWrapp}>
              <div className={styles.dateIpr}>
                <p className={styles.autorIpr}>Дата создания ИПР</p>
                <InputCalendar icon={true} />
              </div>
              <div className={styles.dateIpr}>
                <p className={styles.autorIpr}>Дата закрытия ИПР</p>
                <InputCalendar icon={true} />
              </div>
            </div>
          </section>
        </div>
        <div className={styles.wrapper__button}>
          <Button color="red" width="281" heigth="56" onClick={onClick}>
            Добавить задачу
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={onClick}>
            Отмена
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateIpr;
