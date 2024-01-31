import { FC, useState, useEffect } from 'react';
import { Outlet, useMatch } from 'react-router';
import { useNavigate, useLocation } from "react-router-dom";

import stylesLayout from './layout.module.scss';

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchUser } from '../../services/slice/userSlice';

export interface ILayout {
  handlePopup(editing: object): void;
}

const Layout: FC<ILayout> = ({ handlePopup }) => {
  // const matchChat = useMatch('/chat/:id');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);

  const onClickIPR = () => {
    navigate("/myipr");
  };

  useEffect(() => {
    dispatch(fetchUser())
  },[])

  const onClickTeam = () => {
    navigate("/");
  };

  console.log(user);

  return (
    <div className={stylesLayout.layout}>
      <section className={stylesLayout.layout__nav}>
        <Navigation />
      </section>
      <div className={stylesLayout.layout__card}>
      <Card
            size="big"
            avatar="https://fs.znanio.ru/7ec5d2/d4/b5/750c4d0f7fe1f3fd9cba006fbfce6bc710.jpg"
            name={user!.first_name}
            appointment="Главный финансовый аналитик"
            handlePopup={handlePopup}
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
      </main>
      <section className={stylesLayout.layout__footer}>
        <Footer footerLinkList={footerLinkList} />
      </section>
    </div>
  );
};

export default Layout;
