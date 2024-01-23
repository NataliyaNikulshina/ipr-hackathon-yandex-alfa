import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin/signin";
import Popup from "./components/popup/popup";
import HomePage from "./pages/homePage/homePage";
import NotFound from "./pages/not-found/not-found";

// Ссылки на проверочные константы (заглушки)
import {
  arrTodayTasks,
  arrThisWekTasks,
} from "./ui/verificationConstants/verificationConstants.js";

export const routesUrl = {
  homePage: "/",
  signin: "/signin",
  notFound: "*",
};

const App = () => {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState({
    popupAssignment: "info",
    tugle: false,
    popupText: "",
    popupImg: "",
  });
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState({
    popupAssignment: "error",
    tugle: false,
    popupText: "",
    popupImg: "",
  });
  const [isTaskTrackingLogPopupOpen, setIsTaskTrackingLogPopupOpen] = useState({
    popupAssignment: "task",
    tugle: false,
    popupText: "",
    popupImg: "",
    arrTodayTasks: [],
    arrThisWekTasks: [],
  });
  const [howManyOpenPoups, setHowManyOpenPoups] = useState(0);

  const handlePopup = (() => {
    const whatPopupHandle = (popupAssignment) => {
      let setIsPopup = [];
      if (popupAssignment === "info") {
        setIsPopup[0] = isInfoPopupOpen;
        setIsPopup[1] = setIsInfoPopupOpen;
      } else if (popupAssignment === "error") {
        setIsPopup[0] = isErrorPopupOpen;
        setIsPopup[1] = setIsErrorPopupOpen;
      } else if (popupAssignment === "task") {
        setIsPopup[0] = isTaskTrackingLogPopupOpen;
        setIsPopup[1] = setIsTaskTrackingLogPopupOpen;
      }
      return setIsPopup;
    };

    const open = (props) => {
      let setIsPopup = whatPopupHandle(props.popupAssignment);

      if (setIsPopup.length && !setIsPopup[0].tugle) {
        setHowManyOpenPoups(howManyOpenPoups + 1);

        if (props.popupAssignment === "task") {
          setIsPopup[1]({
            ...setIsPopup[0],
            tugle: true,
            popupImg: props.newPopupImg ? props.newPopupImg : "",
            arrTodayTasks: arrTodayTasks ? arrTodayTasks : [],
            arrThisWekTasks: arrThisWekTasks ? arrThisWekTasks : [],
          });
        } else {
          setIsPopup[1]({
            ...setIsPopup[0],
            tugle: true,
            popupText: props.newPopupText ? props.newPopupText : "",
            popupImg: props.newPopupImg ? props.newPopupImg : "",
          });
        }
      }
    };

    const close = (popupAssignment) => {
      setHowManyOpenPoups(howManyOpenPoups - 1);
      let closedPopup = whatPopupHandle(popupAssignment);
      closedPopup[1]({ ...closedPopup[0], tugle: false });
    };

    const closeEvent = (evt, popupAssignment) => {
      if (evt.type === "click") {
        const isOverlay = evt.target.classList.contains("popup-overlay");
        const isCloseButton =
          evt.target.classList.contains("close-button") ||
          evt.target.classList.contains("close-button__ico-box") ||
          evt.target.classList.contains("close-button__icon");
        if (isOverlay || isCloseButton) {
          close(popupAssignment);
        }
      } else if (evt.type === "keydown") {
        if (evt.key === "Escape") {
          close(popupAssignment);
        }
      }
    };

    return { open, closeEvent };
  })();

  return (
    <>
      <Routes>
        <Route path={routesUrl.signin} element={<Signin />} />
        <Route path={routesUrl.homePage} element={<HomePage />} />
        <Route path={routesUrl.notFound} element={<NotFound />} />
      </Routes>
      <Popup
        isOpen={isInfoPopupOpen}
        onClose={handlePopup.closeEvent}
        zIndex={howManyOpenPoups}
      />
      <Popup
        isOpen={isErrorPopupOpen}
        onClose={handlePopup.closeEvent}
        zIndex={howManyOpenPoups}
      />
      <Popup
        isOpen={isTaskTrackingLogPopupOpen}
        onClose={handlePopup.closeEvent}
        zIndex={howManyOpenPoups}
      />
    </>
  );
};

export default App;
