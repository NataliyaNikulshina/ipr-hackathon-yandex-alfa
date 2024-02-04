import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./statusIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";
import { isContainRoute } from "../../utils/breadcrumbs";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";
import Rating from "../../components/rating/rating";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const StatusIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (pathname === "/employee-ipr/list-tasks/status-ipr" && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Статус выполнения ИПР" },
        ],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick() {
    console.log("ИПР выполнена");
    setDisabled(!disabled);
  }

  // Тригер закрытия задачи и переключения на поле оценки.
  const [isClosingTask, setIsClosingTask] = useState(false);

  // произведена оценка или нет.
  // !!! для того, что бы пользователь не переголосовыва после перезагрузки
  //  или перезахода стоит запрашивать с бэка состояние переменной голосования,
  //  было оно уже или нет. !!!
  const [isAssessment, setIsAssessment] = useState(false);
  // Оценка возвращаеться в формате числа.
  const [isActualRating, setIsActualRating] = useState(0);

  // преключаемся на поле оценки.
  const hanleClickClosingTask = () => {
    // Переключаемся на поле оценки.
    setIsClosingTask(true);
    // Говорим что ИПР ещё не оценивалсяю
    setIsAssessment(false);
    // Сбрасываем уровень рейтинга
    setIsActualRating(0);
  };

  const estimate = () => {
    // Проверяем случилось ли оценивание.
    if (isActualRating) {
      // Тут нужно кудато послать наш рейтинг, видимо на бэк. 
      // И если ответ с бэка положительный сказать спасибо за голосование.
      setIsAssessment(true);
      // А лучше вернуться назад.
      setIsClosingTask(false);
      // а ести отрицатеольный вызвать попап с ерором.
    }
  }

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>Повышение уровня квалификации</h2>
      {!isClosingTask ?
        <>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <section className={styles.wrapper_ipr}>
              <p className={styles.subtitle}>Статус выполнения ИПР</p>
              <ProgressBar percentage={80} />
              <p className={styles.subtitle}>ИПР выполнен в срок</p>
              <DeadlineBlock deadline={"2024-02-05T12:00:00.000Z"} />
            </section>
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            <Button color="red" width="281" heigth="56" onClick={onClick}>
              Закрыть ИПР
            </Button>
            <Button color="grey" width="281" heigth="56" onClick={hanleClickClosingTask} disabled={disabled}>
              Оценить исполнение ИПР
            </Button>
          </div>
        </>
        :
        <>
          <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
            <div className={styles.rating__box}>
              <Rating
                titleOpening='Оцените пожалуйста организацию и прохождение ИПР.'
                titleСlosing='Спасибо за оценку.'
                isAssessment={isAssessment}
                actualRating={setIsActualRating}
              />
            </div>
          </div>
          <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
            {!isAssessment &&
              <Button color="red" width="522" heigth="56" onClick={estimate} disabled={!isActualRating ? true : false}>
                Оценить качество ИПР
              </Button>
            }
          </div>
        </>
      }

    </>
  );
};

export default StatusIpr;
