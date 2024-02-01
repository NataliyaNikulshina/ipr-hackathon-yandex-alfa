import { useEffect, FC } from "react";
import { Navigate } from "react-router-dom";

import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken } from "../utils/authService";

import { routesUrl } from "../app";

type TProtectedRoute = {
  children: JSX.Element;
  notAuth?: boolean;
};

const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  notAuth = false,
}): JSX.Element => {

  const token = getAccessToken();
  console.log(token);

  // для выхода из профиля
  // removeAccessToken();
  // removeRefreshToken();

  // useEffect(() => {
  //   if (!token) {
  //     getRefreshToken();
  //   }
  // }, [token]);

  if (token && notAuth) {
    return <Navigate to={routesUrl.homePage} />;
  }

  if (!notAuth && !token) {
    return <Navigate to={routesUrl.signin} />;
  }

  return children;
};

export default ProtectedRoute;
