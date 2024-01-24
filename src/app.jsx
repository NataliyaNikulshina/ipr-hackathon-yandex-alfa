import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin/signin";
import Popup from "./components/popup/popup";
import HomePage from "./pages/homePage/homePage";
import NotFound from "./pages/not-found/not-found";
import MyIpr from "./pages/myIpr/myIpr";
import IprEmployee from "./pages/iprEmployee/iprEmployee";
import MyTasks from "./pages/myTasks/myTasks";

// функция управления popup
import HandlePopup from './ui/handlePopup/handlePopup';

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";
import dartsTask from "./images/darts-task.png";

// Ссылки на проверочные константы (заглушки)
import { arrTodayTasks, arrThisWekTasks } from './ui/verificationConstants/verificationConstants.js'


export const routesUrl = {
  homePage: "/",
  myIPR: "/myipr",
  myTasks: "/myipr/my-tasks",
  signin: "/signin",
  iprEmployee: "/ipr-employee",
  notFound: "*",
};

const App = () => {

const handlePopup = HandlePopup();

  return (
    <>
      <Routes>
        <Route path={routesUrl.signin} element={<Signin />} />
        <Route path={routesUrl.homePage} element={<HomePage />} />
        <Route path={routesUrl.iprEmployee} element={<IprEmployee />} />
        <Route path={routesUrl.myTasks} element={<MyTasks />} />
        <Route path={routesUrl.myIPR} element={<MyIpr />} />
        <Route path={routesUrl.notFound} element={<NotFound />} />
      </Routes>
      <button
              type="button"
              onClick={() => {
                const popupAssignment = 'info';
                const text = 'Комментарий отправлен сотруднику!';
                handlePopup.open({ popupAssignment, newPopupText: text, newPopupImg: darts })
              }}
            >
              Открыть popup info
            </button>

            <button
              type="button"
              onClick={() => {
                const popupAssignment = 'error';
                const text = 'Что-то пошло не так, проверьте подключение к интернету';
                handlePopup.open({ popupAssignment, newPopupText: text, newPopupImg: telephoneOperator })
              }}
            >
              Открыть popup error
            </button>

            <button
              type="button"
              onClick={() => {
                const popupAssignment = 'task';
                handlePopup.open({ popupAssignment, newPopupImg: dartsTask, arrTodayTasks, arrThisWekTasks })
              }}
            >
              Открыть popup task
            </button>
            <Popup isOpen='isInfoPopupOpen' handlePopup={handlePopup} />
            <Popup isOpen='isErrorPopupOpen' handlePopup={handlePopup} />
            <Popup isOpen='isTaskTrackingLogPopupOpen' handlePopup={handlePopup} />
    </>
  );
};

export default App;
