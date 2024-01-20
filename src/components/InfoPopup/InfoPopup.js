import React from 'react';
import InfoPopupStyle from './InfoPopup.module.scss';
import closingCross from '../../svg/closing-cross.svg';

const InfoPopup = (props) => {

  React.useEffect(() => {
    if (props.isOpen.tugle) {
      document.addEventListener('click', props.onClose);
      document.addEventListener('keydown', props.onClose);

      document.querySelector('#info-popup-content-box').style['background-image'] = `url(${props.isOpen.infoPopupImg})`;
      // document.querySelector('#info-popup-content-box').style['background-color'] = 'red';

      return () => {
        document.removeEventListener('click', props.onClose);
        document.removeEventListener('keydown', props.onClose);
      }
    };

  }, [props.isOpen, props.onClose]);

  return (
    <aside className={`${InfoPopupStyle['info-popup']} ${props.isOpen.tugle && InfoPopupStyle['info-popup_opened']}`} id='info-popup-overlay'>
      <div className={`${InfoPopupStyle['info-popup__content-box']}`} id='info-popup-content-box'>
        <button type="button" className={`${InfoPopupStyle['info-popup__close-button']}`} >
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id='info-popup-close-button'>
            <use className={`${InfoPopupStyle['info-popup__close-button-icon']}`} href={`${closingCross}#closing-cross`} id='info-popup-close-button-icon'></use>
          </svg>
        </button>
        <p className={`${InfoPopupStyle['info-popup__text-box']}`}>{props.isOpen.infoPopupText}</p>
      </div>
    </aside>
  );
};

export default InfoPopup;


//  {props.isOpen.infoTooltipImg && <img className="popup__sign" src={props.isOpen.infoPopupImg} alt="знак" />}