import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTask.module.scss";
import Link from "../../ui/links/link";
// import Unpacker from "../../ui/unpacker/unpacker";
import Button from "../../ui/buttons/button/button";
import Textarea from "../../ui/textarea/textarea";
import DeadlineBlock from "../../components/DeadlineBlock/DeadlineBlock";

import Rating from "../../components/rating/rating"



import ListIpr from "../../components/listIpr/listIpr";
// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";

import { isContainRoute } from "../../utils/breadcrumbs";

const MyTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Задача" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate("/myipr", { replace: true });
  };

  function onClick() {
    alert("Переход к определенному списку задач");
  }

  // Тригер закрытия задачи и переключения на поле оценки.
  const [isClosingTask, setIsClosingTask] = useState(false);

  // преключаемся на поле оценки.
  const hanleClickClosingTask = () => {
    setIsClosingTask(true);
  };

  // произведена оценка или нет.
  // !!! для того, что бы пользователь не переголосовыва после перезагрузки
  //  или перезахода стоит запрашивать с бэка состояние переменной голосования,
  //  было оно уже или нет. !!!
  const [isAssessment, setIsAssessment] = useState(false);
  // Оценка возвращаеться в формате числа.
  const [isActualRating, setIsActualRating] = useState(0);

  const estimate = () => {
    // Проверяем случилось ли оценивание.
    if (isActualRating) {
      // Тут нужно кудато послать наш рейтинг, видимо на бэк. 
      alert(isActualRating);
      // И если ответ с бэка положительный сказать спасибо за голосование.
      setIsAssessment(true);
      // а ести отрицатеольный вызвать попап с ерором.
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <span className={styles.header}>
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
          <h1 className={styles.title}>
            Тест на знание корпоративной культуры
          </h1>
        </span>
        <div className={styles.wrapper}>

          {/* Моя инициатива - Павел */}
          {/* <div className={styles.listIpr}>
            <div className={styles.disabled}></div>
            {mockDataIpr &&
              mockDataIpr.map(
                (el) =>
                  el.id === 3 && (
                    <Unpacker key={el.id}>
                      <Button
                        color="ipr"
                        width="244"
                        heigth="48"
                        onClick={onClick}
                        disabled={true}
                      >
                        {el.title}
                      </Button>
                    </Unpacker>
                  )
              )}
            {mockDataIpr &&
              mockDataIpr.map(
                (el) =>
                  el.id !== 3 && (
                    <Unpacker key={el.id}>
                      <Button
                        color="ipr"
                        width="244"
                        heigth="48"
                        onClick={onClick}
                        disabled={false}
                      >
                        {el.title}
                      </Button>
                    </Unpacker>
                  )
              )}
          </div> */}

          {/* Моя инициатива - Павел */}
          <ListIpr size='small' iprList={mockDataIpr} titleEmpty='ИПР пока нет.' disabled={true} />

          {!isClosingTask ?
            <div className={styles.wrapper__task}>
              <p className={styles.text}>Описание задачи</p>
              <Textarea
                height="102px"
                value="Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. Необходимо изучить материалы, которые присланы на почту в понедельник. Затем пройти тест. После дать оценку своим знаниям по вашему мнению."
                disabled
              />
              <DeadlineBlock deadline={'2024-01-30'} />
            </div>
            :
            <div className={styles.rating__box}>
              <Rating
                titleOpening='Оцените, пожалуйста, организацию и прохождение ИПР.'
                titleСlosing='Спасибо за оценку.'
                isAssessment={isAssessment}
                actualRating={setIsActualRating}
              />
            </div>
          }
        </div>
        <div className={styles.wrapper__button}>
          {!isClosingTask
            ?
            <>
              <Button color="red" width="281" heigth="56" onClick={hanleClickClosingTask}>
                Закрыть задачу
              </Button>
              <Button color="grey" width="281" heigth="56" onClick={onClick}>
                Отмена
              </Button>
            </>
            : !isAssessment
              ?
              <Button color="red" width="522" heigth="56" onClick={estimate} disabled={!isActualRating ? true : false}>
                Оценить ИПР
              </Button>
              :
              <></>
          }
        </div>
      </div>
    </section>
  );
};

export default MyTask;
