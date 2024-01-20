import React from 'react';
import InfoPopup from './InfoPopup/InfoPopup.js'

//  Ссылки на картинки инфо попапа
import darts from '../images/darts.png';
import telephoneOperator from '../images/telephone-operator.png';

const App = () => {





  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState({ tugle: false, infoPopupText: '', infoPopupImg: '' });



  const handleInfoPopup = (() => {

    const open = (newInfoPopupText, newInfoPopupImg) => {
      setIsInfoPopupOpen({
        tugle: true,
        infoPopupText: newInfoPopupText ? newInfoPopupText : '',
        infoPopupImg: newInfoPopupImg ? newInfoPopupImg : ''
      });
    };

    const closeInfoPopup = () => {
      setIsInfoPopupOpen({ ...isInfoPopupOpen, tugle: false });
    };

    const closeEvent = (evt) => {
      if (evt.type === 'click') {
        const isOverlay = evt.target.getAttribute('id') === 'info-popup-overlay';
        const isCloseButton = (evt.target.getAttribute('id') === 'info-popup-close-button') || (evt.target.getAttribute('id') ==='info-popup-close-button-icon');
        if (isOverlay || isCloseButton) {
          closeInfoPopup();
        };
      } else if (evt.type === 'keydown') { if (evt.key === 'Escape') { closeInfoPopup(); } };
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
            const text = 'Комментарий отправлен сотруднику!';
            handleInfoPopup.open(text, darts) }}
        >
          Открыть окно 1
        </button>

        <button
          type="button"
          onClick={() => { 
            const text = 'Что-то пошло не так, проверьте подключение к интернету';
            handleInfoPopup.open(text, telephoneOperator) }}
        >
          Открыть окно 2
        </button>

      </div>
      <InfoPopup isOpen={isInfoPopupOpen} onClose={handleInfoPopup.closeEvent} />
    </>
  );
}

export default App;
