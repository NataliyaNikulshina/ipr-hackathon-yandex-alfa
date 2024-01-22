import React, { useEffect } from 'react';
import Popup from './popup/popup'

//  Ссылки на картинки инфо попапа
import darts from '../images/darts.png';
import telephoneOperator from '../images/telephone-operator.png';
import dartsTask from '../images/darts-task.png';

// Ссылки на проверочные константы (заглушки)
import { arrTodayTasks, arrThisWekTasks } from '../ui/verificationConstants/verificationConstants.js'

const App = () => {

  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState({ popupAssignment: 'info', tugle: false, popupText: '', popupImg: '' });
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState({ popupAssignment: 'error', tugle: false, popupText: '', popupImg: '' });
  const [isTaskTrackingLogPopupOpen, setIsTaskTrackingLogPopupOpen] = React.useState({ popupAssignment: 'task', tugle: false, popupText: '', popupImg: '', arrTodayTasks: [], arrThisWekTasks: [] });
  const [howManyOpenPoups, setHowManyOpenPoups] = React.useState(0);



  const handlePopup = (() => {

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
            popupImg: props.newPopupImg ? props.newPopupImg : '',
            arrTodayTasks: arrTodayTasks ? arrTodayTasks : [],
            arrThisWekTasks: arrThisWekTasks ? arrThisWekTasks : []
          });
        } else {
          setIsPopup[1]({
            ...setIsPopup[0],
            tugle: true,
            popupText: props.newPopupText ? props.newPopupText : '',
            popupImg: props.newPopupImg ? props.newPopupImg : ''
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
        const isCloseButton = evt.target.classList.contains('close-button') || evt.target.classList.contains('close-button__ico-box') || evt.target.classList.contains('close-button__icon');
        if (isOverlay || isCloseButton) {
          close(popupAssignment);
        };
      } else if (evt.type === 'keydown') { if (evt.key === 'Escape') { close(popupAssignment); } };
    };

    return { open, closeEvent }

  })();

  return (
    <>
      <div className="App" style={{ 'background-color': 'orange', 'block-size': '150dvb', 'position': 'releative', 'margin': '0' }}>

        <header className="App-header">
          <p style={{ 'margin': '0' }}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>

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
            handlePopup.open({ popupAssignment, newPopupImg: dartsTask })
          }}
        >
          Открыть popup task
        </button>

      </div>
      <Popup isOpen={isInfoPopupOpen} onClose={handlePopup.closeEvent} zIndex={howManyOpenPoups} />
      <Popup isOpen={isErrorPopupOpen} onClose={handlePopup.closeEvent} zIndex={howManyOpenPoups} />
      <Popup isOpen={isTaskTrackingLogPopupOpen} onClose={handlePopup.closeEvent} zIndex={howManyOpenPoups} />
    </>
  );
}

export default App;