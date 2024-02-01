import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import stylesProfile from "./homePage.module.scss";

import Statistics from "../../components/Statistics/Statistics";
import TeamTable from "../../components/TeamTable/TeamTable";
import { isContainRoute } from "../../utils/breadcrumbs";
// import getUserInfoApi from "../../api/user";

const HomePage: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  let initialBreadcrumb = [];

  // const onClickEmployee = () => {
  //   initialBreadcrumb = [{ path: "/", url: "/", title: "Моя команда" }];
  //   navigate("/employee-ipr", { state: initialBreadcrumb });
  // };


  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Моя команда" }], replace: true });
      }
    },
    [pathname, url, state]
  );

  // useEffect(() => {
  //   getUserInfoApi()
  //   .then((res) => {
  //     console.log(res);
  //   })
  // }, [])

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
