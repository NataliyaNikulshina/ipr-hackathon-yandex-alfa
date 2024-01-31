import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import TeamTable from "../../components/TeamTable/TeamTable";
import { isContainRoute } from "../../utils/breadcrumbs";

const HomePage: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  let initialBreadcrumb = [];

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Моя команда" }], replace: true });
      }
    },
    [pathname, url, state]
  );

  return (
    <section className={stylesProfile.page}>
          <TeamTable />
          <Statistics />
    </section>
  );
};

export default HomePage;
