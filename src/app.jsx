import { Route, Routes } from 'react-router-dom';
import Signin from "./pages/signin/signin";

const routesUrl = {
  homePage: "/",
  signin: "/signin",
  notFound: "*",
};

const App = () => {
  return (
    <Routes>
      <Route
        path={routesUrl.signin}
        element={
            <Signin />
        }
      />
      <Route
        path={routesUrl.homePage}
        element={
          <p>Главная страница</p>
        }
      ></Route>
    </Routes>
  );
};

export default App;
