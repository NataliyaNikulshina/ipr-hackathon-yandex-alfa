import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import TeamTable from "../../components/TeamTable/TeamTable";

const HomePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  let initialBreadcrumb = [];


  const onClickEmployee = () => {
    initialBreadcrumb = [{ path: "/", url: "/", title: "Моя команда" }];
    navigate("/ipr-employee", { state: initialBreadcrumb });
  };

  return (
    <section className={stylesProfile.page}>
          <TeamTable />
          <Statistics />
    </section>
  );
};

export default HomePage;
