import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./myIprs.module.scss";

import { isContainRoute } from "../../utils/breadcrumbs";
// import getUserInfoApi from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectMyIpr } from "../../services/slice/myIprSlice";
import { selectUser } from "../../services/slice/userSlice";

const MyIprs: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { myIpr } = useAppSelector(selectMyIpr);

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
    if (myIpr.length)
      navigate(`/myiprs/myipr/${myIpr[0].id}`);
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