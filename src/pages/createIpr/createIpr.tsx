import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./createIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import Textarea from "../../ui/textarea/textarea";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import { routesUrl } from "../../app";

import { isContainRoute } from "../../utils/breadcrumbs";

const CreateIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (pathname==="/employee-ipr/create-ipr" && state && !isContainRoute(state, url)) {
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
    navigate(-1);
  }
  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/employee-ipr", { replace: true, state: state.slice(0, 2) });
  };
  function handleChange(e: any) {
    console.log(e.target.value);
  }
  return (
        <>
          <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
          Создание нового ИПР
          </h2>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
          <section className={styles.listIpr}>
            <p className={styles.autorIpr}>
              Автор ИПР: Антонова Екатерина Владимировна
            </p>
            <div className={styles.nameIpr}>
              <Input onChange={handleChange} />
            </div>
            {/* <Textarea
              width="522px"
              height="164px"
              placeholder="Введите описание ИПР"
            /> */}
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
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
          <Button color="red" width="281" heigth="56" onClick={onClick}>
            Создать ИПР
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={onClick}>
            Отмена
          </Button>
        </div>
        </>
  );
};

export default CreateIpr;
