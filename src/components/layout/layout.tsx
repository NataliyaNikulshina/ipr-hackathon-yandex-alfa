import { FC, useState, useEffect } from 'react';
import { Outlet, useMatch } from 'react-router';
import { useNavigate, useLocation } from "react-router-dom";

import stylesLayout from './layout.module.scss';

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

import Rating from "../rating/rating"

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";

const Layout: FC = () => {
  // const matchChat = useMatch('/chat/:id');
  const location = useLocation();
  const navigate = useNavigate();

  const onClickIPR = () => {
    navigate("/myipr");
  };

  const onClickTeam = () => {
    navigate("/");
  };

  // произведена оценка или нет.
  // !!! для того, что бы пользователь не переголосовыва после перезагрузки
  //  или перезахода стоит запрашивать с бэка состояние переменной голосования,
  //  было оно уже или нет. !!!
  const [isAssessment, setIsAssessment] = useState(false);
  // Оценка
  const [isActualRating, setIsActualRating] = useState(0);

  return (
    <div className={stylesLayout.layout}>
      <section className={stylesLayout.layout__nav}>
        <Navigation />
      </section>
      <div className={stylesLayout.layout__card}>
        <Card
          size="big"
          avatar="https://fs.znanio.ru/7ec5d2/d4/b5/750c4d0f7fe1f3fd9cba006fbfce6bc710.jpg"
          name="Антонова Екатерина Владимировна"
          appointment="Главный финансовый аналитик"
        />
        <Button color="nav_white" width="304" heigth="48">
          Мои достижения
        </Button>
        <Button color="nav_white" width="304" heigth="48" onClick={onClickTeam} disabled={!location.pathname.includes('/myipr') ? true : false}>
          Моя команда
        </Button>
        <Button color="nav_white" width="304" heigth="48" onClick={onClickIPR} disabled={location.pathname.includes('/myipr') ? true : false}>
          Мои ИПР
        </Button>
      </div>
      <main className={stylesLayout.layout__page}>
        <Outlet />
        <Rating
          titleOpening='Оцените, пожалуйста, организацию и прохождение ИПР.'
          titleСlosing='Спасибо за оценку.'
          isAssessment={isAssessment}
          actualRating={setIsActualRating}
        />
        <button onClick={() => {
          // Проверяем случилось ли голосование.
          if (isActualRating) {
            // Тут нужно кудато послать наш рейтинг, видимо на бэк. 
            alert(isActualRating);
            // И если ответ с бэка положительный сказать спасибо за голосование.
            setIsAssessment(true);
            // а ести отрицатеольный вызвать попап с ерором.
          }
        }}>оценить</button>
      </main>
      <section className={stylesLayout.layout__footer}>
        <Footer footerLinkList={footerLinkList} />
      </section>
    </div>
  );
};

export default Layout;
