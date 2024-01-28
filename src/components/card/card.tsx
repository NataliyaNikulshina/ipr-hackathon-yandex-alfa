import { FC } from "react";
import Photo from "../../ui/icons/avatar-default.svg";
import BellIcon from "../../ui/icons/bell";

import styleCard from "./card.module.scss";
import light from "../../ui/icons/achievement/light.svg";
import people from "../../ui/icons/achievement/people.svg";
import timer from "../../ui/icons/achievement/timer.svg";
import Popup from "../popup/popup";
import dartsTask from "../../images/darts-task.png";
import HandlePopup from "../../utils/handlePopup/handlePopup";
// Ссылки на проверочные константы (заглушки)
import { arrTodayTasks, arrThisWekTasks } from '../../ui/verificationConstants/verificationConstants.js'

export interface ICard {
  size: string;
  avatar?: string;
  name: string;
  appointment: string;
}

const Card: FC<ICard> = ({ size, avatar, name, appointment }) => {

  const handlePopup = HandlePopup();

  function onClick() {
    const popupAssignment = "task";
    handlePopup.open({ popupAssignment, newPopupImg: dartsTask, arrTodayTasks, arrThisWekTasks });
    console.log(handlePopup.open);
  }

  const styleAll =
    size === "big"
      ? styleCard.card + " " + styleCard.big
      : styleCard.card + " " + styleCard.small;

  return (
    <div className={styleAll}>
      <img
        src={avatar || Photo}
        alt="Avatar"
        className={avatar ? styleCard.avatar : styleCard.logo}
      />
      <div className={styleCard.wrapperText}>
        <p className={styleCard.name}>{name}</p>
        <p className={styleCard.appointment}>{appointment}</p>
      </div>
      <div className={styleCard.wrapperIcons}>
        <div className={styleCard.box_achievement}>
          <img src={people} alt="Achievement" />
        </div>
        <div className={styleCard.box_achievement}>
          <img src={light} alt="Achievement" />
        </div>
        {size === "big" && (
          <>
            <div className={styleCard.box_achievement}>
              <img src={light} alt="Achievement" />
            </div>
            <button onClick={onClick} className={styleCard.icon}>
              <BellIcon />
            </button>
          </>
        )}
        <div className={styleCard.box_achievement}>
          <img src={timer} alt="Achievement" />
        </div>
      </div>
      <Popup isOpen='isTaskTrackingLogPopupOpen' handlePopup={handlePopup} />
    </div>
  );
};

export default Card;
