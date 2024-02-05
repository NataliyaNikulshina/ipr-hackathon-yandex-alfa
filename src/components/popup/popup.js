import React from 'react';
import popupStyle from './popup.module.scss';
import closingCross from '../../ui/icons/closing-cross.svg';
import resetBasket from '../../ui/icons/reset-basket.svg'
import PopupButton from '../../ui/svgButton/svgButton.js';
import Unpacker from '../../ui/unpacker/unpacker.js';

const Popup = (props) => {

  const isOpen = props.handlePopup[props.isOpen];

  const handleClose = (evt) => {
    props.handlePopup.closeEvent(evt, isOpen.popupAssignment)
  }

  const close = () => {
    props.handlePopup.close(isOpen.popupAssignment)
  }

  React.useEffect(() => {
    if (isOpen.tugle) {
      document.querySelector(`.${isOpen.popupAssignment}-popup`).addEventListener('click', handleClose);
      document.addEventListener('keydown', handleClose);
      document.querySelector(`#${isOpen.popupAssignment}-popup-overlay`).style['z-index'] = props.handlePopup.howManyOpenPoups;
      document.querySelector(`#${isOpen.popupAssignment}-popup-content-box`).style['background-image'] = `url(${isOpen.popupImg})`;

      return () => {
        document.querySelector(`.${isOpen.popupAssignment}-popup`).removeEventListener('click', handleClose);
        document.removeEventListener('keydown', handleClose);
      }
    };

  }, [isOpen.tugle]);

  return (
    <aside className={`${popupStyle['popup']} ${isOpen.tugle && popupStyle['popup_opened']} ${isOpen.popupAssignment}-popup popup-overlay`} id={`${isOpen.popupAssignment}-popup-overlay`}>
      <div className={`${popupStyle[`${isOpen.popupAssignment}-popup__content-box`]}`} id={`${isOpen.popupAssignment}-popup-content-box`}>

        <div className={`${popupStyle[`${isOpen.popupAssignment}-popup__button-box`]}`}>
          {isOpen.popupAssignment === 'task' ?
            <PopupButton
              svgHref={resetBasket}
              svgId='#reset-basket'
              viewBox='0 0 32 32'
              elementStyle={popupStyle}
              elementName={`${isOpen.popupAssignment}-`}
              elementType='popup'
              destiny='reset-button'
              onClick={props.handlePopup.resetTasks} />
            :
            <></>
          }
          <PopupButton
            svgHref={closingCross}
            svgId='#closing-cross'
            viewBox='0 0 20 20'
            elementStyle={popupStyle}
            elementName={`${isOpen.popupAssignment}-`}
            elementType='popup'
            destiny='close-button'
            onClick={close} />

        </div>
        {isOpen.popupAssignment === 'task' ?
          <div className={`${popupStyle[`${isOpen.popupAssignment}-popup__tasks-box`]}`}>
            <div className={`${popupStyle[`${isOpen.popupAssignment}-popup__list-box`]}`}>
              <span className={`${popupStyle[`${isOpen.popupAssignment}-popup__tasks-titl`]}`}>Сегодня</span>
              <ul className={`${popupStyle[`${isOpen.popupAssignment}-popup__tasks-list`]}`}>
                {isOpen.arrTodayTasks.length ?
                  isOpen.arrTodayTasks.map((title) => <Unpacker key={title.id}>
                    <li className={`${popupStyle[`${isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${isOpen.popupAssignment}-popup__task_today`]}`}>{title.title} </li>
                  </Unpacker>)
                  :
                  <li className={`${popupStyle[`${isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${isOpen.popupAssignment}-popup__task_today`]}`}>Сообщения отсутствуют</li>
                }
              </ul>
            </div>
            <div>
              <span className={`${popupStyle[`${isOpen.popupAssignment}-popup__tasks-titl`]}`}>На этой неделе</span>
              <ul className={`${popupStyle[`${isOpen.popupAssignment}-popup__tasks-list`]}`}>
                {isOpen.arrThisWekTasks.length ?
                  isOpen.arrThisWekTasks.map((title) => <Unpacker key={title.id}>
                    <li className={`${popupStyle[`${isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${isOpen.popupAssignment}-popup__task_this-week`]}`}>{title.title}</li>
                  </Unpacker>)
                  :
                  <li className={`${popupStyle[`${isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${isOpen.popupAssignment}-popup__task_this-week`]}`}>Сообщения отсутствуют</li>
                }
              </ul>
            </div>
          </div>
          :
          <></>
        }

        {isOpen.popupAssignment !== 'task' && <p className={`${popupStyle[`${isOpen.popupAssignment}-popup__text-box`]}`}>{isOpen.popupText}</p>}
      </div>
    </aside>
  );
};

export default Popup;