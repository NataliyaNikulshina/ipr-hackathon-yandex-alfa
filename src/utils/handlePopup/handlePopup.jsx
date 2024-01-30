import React from 'react';

import darts from "../../images/darts.png";
import telephoneOperator from "../../images/telephone-operator.png";
import dartsTask from "../../images/darts-task.png";

const HandlePopup = () => {

  const [isInfoPopupOpen, setIsInfoPopupOpen] =
    React.useState({ popupAssignment: 'info', tugle: false, popupText: '', popupImg: '' });
  const [isErrorPopupOpen, setIsErrorPopupOpen] =
    React.useState({ popupAssignment: 'error', tugle: false, popupText: '', popupImg: '' });
  const [isTaskTrackingLogPopupOpen, setIsTaskTrackingLogPopupOpen] =
    React.useState({ popupAssignment: 'task', tugle: false, popupImg: '', arrTodayTasks: [], arrThisWekTasks: [] });
  const [howManyOpenPoups, setHowManyOpenPoups] = React.useState(10);

  const whatPopupHandle = (popupAssignment) => {
    let setIsPopup = [];
    if (popupAssignment === 'info') {
      setIsPopup[0] = isInfoPopupOpen;
      setIsPopup[1] = setIsInfoPopupOpen;
    } else if (popupAssignment === 'error') {
      setIsPopup[0] = isErrorPopupOpen;
      setIsPopup[1] = setIsErrorPopupOpen;
    } else if (popupAssignment === 'task') {
      setIsPopup[0] = isTaskTrackingLogPopupOpen;
      setIsPopup[1] = setIsTaskTrackingLogPopupOpen;
    };
    return setIsPopup;
  }

  const open = (props) => {
    let setIsPopup = whatPopupHandle(props.popupAssignment);

    if (setIsPopup.length && !setIsPopup[0].tugle) {

      setHowManyOpenPoups(howManyOpenPoups + 1);

      if (props.popupAssignment === 'task') {
        setIsPopup[1]({
          ...setIsPopup[0],
          tugle: true,
          popupImg: props.newPopupImg ? props.newPopupImg : dartsTask,
          arrTodayTasks: props.arrTodayTasks ? props.arrTodayTasks : [],
          arrThisWekTasks: props.arrThisWekTasks ? props.arrThisWekTasks : []
        });
      } else if (props.popupAssignment === 'error') {
        setIsPopup[1]({
          ...setIsPopup[0],
          tugle: true,
          popupText: props.newPopupText ? props.newPopupText : 'Что-то пошло не так, проверьте подключение к интернету',
          popupImg: props.newPopupImg ? props.newPopupImg : telephoneOperator
        });
      }else if (props.popupAssignment === 'info') {
        setIsPopup[1]({
          ...setIsPopup[0],
          tugle: true,
          popupText: props.newPopupText ? props.newPopupText : 'Комментарий отправлен сотруднику!',
          popupImg: props.newPopupImg ? props.newPopupImg : darts
        });
      };
    };
  };

  const close = (popupAssignment) => {
    setHowManyOpenPoups(howManyOpenPoups - 1);
    let closedPopup = whatPopupHandle(popupAssignment);
    closedPopup[1]({ ...closedPopup[0], tugle: false });
  };

  const closeEvent = (evt, popupAssignment) => {
    if (evt.type === 'click') {
      const isOverlay = evt.target.classList.contains('popup-overlay');
      if (isOverlay) {
        close(popupAssignment);
      };
    } else if (evt.type === 'keydown') {
      if (evt.key === 'Escape') { close(popupAssignment); }
    };
  };

  const resetTasks = () => {
    if (isTaskTrackingLogPopupOpen.arrTodayTasks.length || isTaskTrackingLogPopupOpen.arrThisWekTasks.length) {
      setIsTaskTrackingLogPopupOpen({
        ...isTaskTrackingLogPopupOpen,
        arrTodayTasks: [],
        arrThisWekTasks: []
      })
    }
  }

  return {
    open,
    closeEvent,
    close,
    resetTasks,
    isInfoPopupOpen,
    isErrorPopupOpen,
    isTaskTrackingLogPopupOpen,
    howManyOpenPoups
  }

};

export default HandlePopup;