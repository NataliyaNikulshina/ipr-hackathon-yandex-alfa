import { FC, useState, useEffect, FormEvent } from "react";
import stylesProfile from "./profile.module.scss";

import Statistics from "../../components/Statistics/Statistics";

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";
import dartsTask from "./images/darts-task.png";
//import  { handlePopup }  from "../../app";

const Profile: FC = (): JSX.Element => {
  return <section className={stylesProfile.page}>
    <Statistics />


            {/* <button
              type="button"
              onClick={() => {
                const popupAssignment = "task";
                handlePopup.open({ popupAssignment, newPopupImg: dartsTask });
              }}
            >
              Открыть popup task
            </button> */}
  </section>;
};

export default Profile;
