import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import stylesMyIpr from "./myIpr.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";
import Link from "../../ui/links/link";
import { isContainRoute } from "../../utils/breadcrumbs";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchmyIpr } from "../../services/slice/myIprSlice";

import ListTask from "../../components/listTask/listTask";
import Button from "../../ui/buttons/button/button";
import Rating from "../../components/rating/rating";
import ListIpr from "../../components/listIpr/listIpr";
import { selectUser } from "../../services/slice/userSlice";
import { selectMyIpr } from "../../services/slice/myIprSlice";
import { ITask } from "../../api/ipr";

// Моковые данные
import {
  mockDataTask,
  mockDataIpr,
} from "../../ui/verificationConstants/verificationConstants";
import Loader from "../../components/loader/loader";

const MyIpr: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(selectUser);
  const { myIpr } = useAppSelector(selectMyIpr);
  const param = useParams();


  useEffect(() => {
    user && dispatch(fetchmyIpr(user.id));
  }, [user]);

  // вывод ИПР в консоль
  // console.log(user);
  // console.log(ipr);
  // console.log(param!.idMyIpr);

  useEffect(() => {
    if (pathname === `/myipr/${param!.idMyIpr}` && state && !isContainRoute(state, url)) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Мои ИПР" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick() {
    alert("Переход к определенному списку задач");
  }

  const routeTo = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

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
  const handleClickClosingTask = () => {
    // Закрываем ИПРы оверлеем.
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
      alert(isActualRating);
      // И если ответ с бэка положительный сказать спасибо за голосование.
      setIsAssessment(true);
      // А лучше вернуться назад.
      setIsClosingTask(false);
      // а ести отрицатеольный вызвать попап с ерором.
    }
  };

  // // Тригер следящий какой ИПР выбран.
  // const [isSelectedIprId, setIsSelectedIprId] = useState(-1);
  // // Актуальный массив задач.
 

  // const handleSelectedIprId = (id: number) => {
  //   setIsSelectedIprId(id);
  //   let actualIpr = ipr.find(elem => elem.id === id);
  //   let actualTasksList = actualIpr ? actualIpr.tasks : [];
  //   console.log(actualTasksList)
  //   if (Array.isArray(actualTasksList)) {
  //     setIsActualTasksList(actualTasksList);
  //   };
  // }

  const [isActualTasksList, setIsActualTasksList] = useState<ITask[]>([]);

  useEffect(()=>{
    // if (ipr.some(elem => elem.id === Number(param!.idMyIpr))){
    let actualIpr = myIpr.find(elem => elem.id === Number(param!.idMyIpr)) || {tasks: []};
    let actualTasksList = actualIpr.tasks;
    setIsActualTasksList(actualTasksList);
    // console.log(actualTasksList);
    // } else {
    //   navigate(`/notFound`, { replace: true }) // надо разобраться.
    // }

  }, [param!.idMyIpr, myIpr])

  return (
    <section>
      <div className={`${stylesMyIpr.container} ${gridAreasLayout.container}`}>
        <span className={`${stylesMyIpr.link} ${gridAreasLayout.wrapper_link}`}>
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
        <>


          {myIpr && myIpr.length !== 0 ? (
            <>
              <div className={gridAreasLayout.wrapper_main_info}>
                {myIpr && !isLoading && (
                  <ListIpr
                    size="small"
                    iprList={myIpr}
                    titleEmpty="ИПР пока нет."
                    disabled={
                      pathname !== `/myipr/${param!.idMyIpr}` || isClosingTask ? true : false
                    }
                    isSelectedIprId={Number(param!.idMyIpr)}
                  />
                )}
              </div>
              {pathname === `/myipr/${param!.idMyIpr}` && myIpr.length !== 0 && (
                <>
                  {!isClosingTask ? (
                    <>
                      <div className={gridAreasLayout.wrapper_work_info}>
                        {myIpr && myIpr.length !== 0 && (
                          <ListTask tasks={isActualTasksList} isBoss={false} isSelectedIprId={Number(param!.idMyIpr)} />
                        )}
                      </div>
                      <div
                        className={`${stylesMyIpr.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}
                      >
                        <Button
                          color="red"
                          width="281"
                          heigth="56"
                          onClick={onClick}
                        >
                          Закрыть выбранные задачи
                        </Button>
                        <Button
                          color="grey"
                          width="281"
                          heigth="56"
                          onClick={handleClickClosingTask}
                        >
                          Оценить ИПР
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`${stylesMyIpr.wrapper} ${gridAreasLayout.wrapper_work_info}`}
                      >
                        <div className={stylesMyIpr.rating__box}>
                          <Rating
                            titleOpening="Оцените пожалуйста организацию и прохождение ИПР."
                            titleСlosing="Спасибо за оценку."
                            isAssessment={isAssessment}
                            actualRating={setIsActualRating}
                          />
                        </div>
                      </div>
                      <div
                        className={`${stylesMyIpr.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}
                      >
                        {!isAssessment && (
                          <Button
                            color="red"
                            width="522"
                            heigth="56"
                            onClick={estimate}
                            disabled={!isActualRating ? true : false}
                          >
                            Оценить качество ИПР
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              <Outlet />
            </>
          ) : <p className={`${stylesMyIpr.container__title_empty} ${gridAreasLayout.wrapper_main_info}`} >ИПР пока нет</p>}
        </>
      </div>
    </section>
  );
};

export default MyIpr;
