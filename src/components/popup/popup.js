import React from 'react';
import popupStyle from './popup.module.scss';
import closingCross from '../../icons/closing-cross.svg';
import PopupClossButton from '../../ui/popupClossButton/popupClossButton.js'
import Unpacker from '../../ui/unpacker/unpacker.js'

const Popup = (props) => {

  const handleClose = (evt) => {
    props.onClose(evt, props.isOpen.popupAssignment)
  }

  React.useEffect(() => {
    if (props.isOpen.tugle) {
      document.querySelector(`.${props.isOpen.popupAssignment}-popup`).addEventListener('click', handleClose);
      document.addEventListener('keydown', handleClose);
      document.querySelector(`#${props.isOpen.popupAssignment}-popup-overlay`).style['z-index'] = props.zIndex;
      document.querySelector(`#${props.isOpen.popupAssignment}-popup-content-box`).style['background-image'] = `url(${props.isOpen.popupImg})`;

      return () => {
        document.querySelector(`.${props.isOpen.popupAssignment}-popup`).removeEventListener('click', handleClose);
        document.removeEventListener('keydown', handleClose);
      }
    };

  }, [props.isOpen]);

  return (
    <aside className={`${popupStyle['popup']} ${props.isOpen.tugle && popupStyle['popup_opened']} ${props.isOpen.popupAssignment}-popup popup-overlay`} id={`${props.isOpen.popupAssignment}-popup-overlay`}>
      <div className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__content-box`]}`} id={`${props.isOpen.popupAssignment}-popup-content-box`}>

        {props.isOpen.popupAssignment === 'task' && <div className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__tasks-box`]}`}>
          <div>
            <span className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__tasks-titl`]}`}>Сегодня</span>
            <ul className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__tasks-list`]}`}>
              {props.isOpen.arrTodayTasks.length ?
                props.isOpen.arrTodayTasks.map((title) => <Unpacker key={title.id}>
                  <li className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${props.isOpen.popupAssignment}-popup__task_today`]}`}>{title.title} </li>
                </Unpacker>)
                :
                <li className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${props.isOpen.popupAssignment}-popup__task_today`]}`}>Сообщения отсутствуют</li>
              }
            </ul>
          </div>
          <div>
            <span className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__tasks-titl`]}`}>На этой неделе</span>
            <ul className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__tasks-list`]}`}>
              {props.isOpen.arrThisWekTasks.length ?
                props.isOpen.arrThisWekTasks.map((title) => <Unpacker key={title.id}>
                  <li className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${props.isOpen.popupAssignment}-popup__task_this-week`]}`}>{title.title}</li>
                </Unpacker>)
                :
                <li className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__task`]} ${popupStyle[`${props.isOpen.popupAssignment}-popup__task_this-week`]}`}>Сообщения отсутствуют</li>
              }
            </ul>
          </div>
        </div>}

        <PopupClossButton svgHref={closingCross} svgId='#closing-cross' elementStyle={popupStyle} elementType={`${props.isOpen.popupAssignment}-popup`} />

        {props.isOpen.popupAssignment !== 'task' && <p className={`${popupStyle[`${props.isOpen.popupAssignment}-popup__text-box`]}`}>{props.isOpen.popupText}</p>}
      </div>
    </aside>
  );
};

export default Popup;