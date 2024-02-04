import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./myIprs.module.scss";

import { isContainRoute } from "../../utils/breadcrumbs";
// import getUserInfoApi from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectIpr, fetchIpr } from "../../services/slice/iprSlice";
import { selectUser } from "../../services/slice/userSlice";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";

const MyIprs: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { ipr } = useAppSelector(selectIpr);

  useEffect(() => {
    user && dispatch(fetchIpr(user.id));
  }, [user]);

  useEffect(
    () => {
      if (pathname === "/myiprs" && state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Мои ИПР" }], replace: true });
      }
    },
    [pathname, url, state]
  );

  useEffect(() => {
    if (ipr.length)
      navigate(`/myiprs/myipr/${ipr[0].id}`);
  }, [])

  return (
    <>
      {pathname === '/myiprs' &&
        <>
          <div className={styles.title_empty_box}>
            <p className={styles.title_empty}>ИПР пока нет</p>
          </div>
        </>
      }
      <Outlet />
    </>
  );
};

export default MyIprs;