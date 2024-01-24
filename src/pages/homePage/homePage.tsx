import { FC, useState, useEffect, FormEvent } from "react";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";
import dartsTask from "./images/darts-task.png";
//import  { handlePopup }  from "../../app";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const HomePage: FC = (): JSX.Element => {
  return (
    <section className={stylesProfile.page}>
      <Statistics />
      <Card
        size="big"
        avatar="https://fs.znanio.ru/7ec5d2/d4/b5/750c4d0f7fe1f3fd9cba006fbfce6bc710.jpg"
        name="Антонова Екатерина Владимировна"
        appointment="Главный финансовый аналитик"
      />
      <Card
        size="small"
        // avatar="https://i.pinimg.com/originals/2f/b8/61/2fb861e3a0060ae2ce593877cff4edab.jpg"
        name="Соколов Михаил 
        Алексеевич"
        appointment="Финансовый аналитик"
      />

      {/* <button
              type="button"
              onClick={() => {
                const popupAssignment = "task";
                handlePopup.open({ popupAssignment, newPopupImg: dartsTask });
              }}
            >
              Открыть popup task
            </button> */}
      <Footer footerLinkList={footerLinkList} />
    </section>
  );
};

export default HomePage;
