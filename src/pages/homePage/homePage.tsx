import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import TeamTable from "../../components/TeamTable/TeamTable";

const HomePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  let initialBreadcrumb = [];
  const { state, pathname } = useLocation();

  const onClickEmployee = () => {
    initialBreadcrumb = [{ path: "/", url: "/", title: "Моя команда" }];
    navigate("/employee-ipr", { state: initialBreadcrumb });
  };

  return (
    <section className={stylesProfile.page}>
      {pathname === '/' &&
        <>
          <TeamTable />
          <Statistics />
        </>
      }
      <Outlet />
    </section>
  );
};

export default HomePage;
