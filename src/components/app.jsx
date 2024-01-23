import React, { useEffect } from 'react';
import Popup from './popup/popup.js';
import Footer from './footer/footer.js'

// функция управления popup
import HandlePopup from '../ui/handlePopup/handlePopup.jsx';

//  Ссылки на картинки инфо попапа
import darts from '../images/darts.png';
import telephoneOperator from '../images/telephone-operator.png';
import dartsTask from '../images/darts-task.png';

// Ссылки на проверочные константы (заглушки)
import { arrTodayTasks, arrThisWekTasks, footerLickList } from '../ui/verificationConstants/verificationConstants.js'

const App = () => {

  const handlePopup = HandlePopup();

  return (
    <>
      <div className="App" style={{ 'background-color': 'orange', 'block-size': '100dvb', 'position': 'releative', 'margin': '0' }}>

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
            handlePopup.open({ popupAssignment, newPopupImg: dartsTask, arrTodayTasks, arrThisWekTasks })
          }}
        >
          Открыть popup task
        </button>
        <Footer footerLickList={footerLickList} />
      </div>
      <Popup isOpen='isInfoPopupOpen' handlePopup={handlePopup} />
      <Popup isOpen='isErrorPopupOpen' handlePopup={handlePopup} />
      <Popup isOpen='isTaskTrackingLogPopupOpen' handlePopup={handlePopup} />
    </>
  );
}

export default App;