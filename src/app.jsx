import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin/signin";
import Popup from "./components/popup/popup";
import Footer from './components/footer/footer';

// функция управления popup
import HandlePopup from './ui/handlePopup/handlePopup';

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";
import dartsTask from "./images/darts-task.png";

// Ссылки на проверочные константы (заглушки)
import { arrTodayTasks, arrThisWekTasks, footerLinkList } from './ui/verificationConstants/verificationConstants.js'

const routesUrl = {
  homePage: "/",
  signin: "/signin",
  notFound: "*",
};

const App = () => {

  const handlePopup = HandlePopup();

  return (
    <Routes>
      <Route path={routesUrl.signin} element={<Signin />} />
      <Route
        path={routesUrl.homePage}
        element={
          <>
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
            <Footer footerLinkList={footerLinkList} />
            <Popup isOpen='isInfoPopupOpen' handlePopup={handlePopup} />
            <Popup isOpen='isErrorPopupOpen' handlePopup={handlePopup} />
            <Popup isOpen='isTaskTrackingLogPopupOpen' handlePopup={handlePopup} />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default App;
