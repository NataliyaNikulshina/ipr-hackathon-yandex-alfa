import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/signin/signin";
import Popup from "./components/popup/popup";
import HomePage from "./pages/homePage/homePage";
import NotFound from "./pages/not-found/not-found";
import MyIpr from "./pages/myIpr/myIpr";
import IprEmployee from "./pages/iprEmployee/iprEmployee";
import MyTask from "./pages/myTask/myTask";
import Layout from "./components/layout/layout";

// функция управления popup
import HandlePopup from './utils/handlePopup/handlePopup';

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";


export const routesUrl = {
  homePage: "/",
  myIPR: "/myipr",
  myTask: "/myipr/my-task",
  signin: "/signin",
  iprEmployee: "/ipr-employee",
  notFound: "*",
};

const App = () => {
const path = useLocation().pathname;
const handlePopup = HandlePopup();

  return (
    <>
      <Routes>
        <Route path={routesUrl.signin} element={<Signin />} />
        <Route path={routesUrl.homePage} element={ <Layout /> }>
          <Route path={routesUrl.homePage} element={<HomePage />} />
          <Route path={routesUrl.iprEmployee} element={<IprEmployee />} />
          <Route path={routesUrl.myTask} element={<MyTask />} />
          <Route path={routesUrl.myIPR} element={<MyIpr />} />
        </Route>
        <Route path={routesUrl.notFound} element={<NotFound />} />
      </Routes>
      {/* <button
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
            </button> */}
            <Popup isOpen='isInfoPopupOpen' handlePopup={handlePopup} />
            <Popup isOpen='isErrorPopupOpen' handlePopup={handlePopup} />
    </>
  );
};

export default App;
