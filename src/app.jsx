import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/signin/signin";
import Popup from "./components/popup/popup";
import HomePage from "./pages/homePage/homePage";
import NotFound from "./pages/not-found/not-found";

import MyIpr from "./pages/myIpr/myIpr";

import EmployeeIpr from "./pages/employeeIpr/employeeIpr";
import EmployeeListTasks from "./pages/employeeListTasks/employeeListTasks";
import EmployeeTask from "./pages/employeeTask/employeeTask";
import CreateIpr from "./pages/createIpr/createIpr";
import StatusIpr from "./pages/statusIpr/statusIpr";
import CreateTask from "./pages/createTask/createTask";

import MyTask from "./pages/myTask/myTask";

import Layout from "./components/layout/layout";
import Loader from "./components/loader/loader";

import ProtectedRoute from './routes/protected-route';

// функция управления popup
import HandlePopup from "./utils/handlePopup/handlePopup";

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";

export const routesUrl = {
  homePage: "/",
  myIPR: "/myipr",
  myTask: "/myipr/my-task",
  signin: "/signin",
  employeeIpr: "employee-ipr",
  employeeListTasks: "employee-ipr/list-tasks",
  employeeTask: "employee-ipr/list-tasks/task",
  statusIpr: "employee-ipr/status-ipr",
  createIpr: "employee-ipr/create-ipr",
  createTask: "employee-ipr/create-ipr/create-task",
  notFound: "*",
};

const App = () => {
  const path = useLocation().pathname;
  const handlePopup = HandlePopup();

  const [isLoader, setIsLoader] = useState(false);

  return (
    <>
      <Routes>
        <Route path={routesUrl.signin} element={<ProtectedRoute notAuth><Signin /></ProtectedRoute>} />
        <Route path={routesUrl.homePage} element={<ProtectedRoute><Layout handlePopup={handlePopup.open}/></ProtectedRoute>}>
          <Route path={routesUrl.homePage} element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path={routesUrl.employeeIpr} element={<ProtectedRoute><EmployeeIpr /></ProtectedRoute>} />
          <Route path={routesUrl.employeeListTasks} element={<ProtectedRoute><EmployeeListTasks /></ProtectedRoute>} />
          <Route path={routesUrl.employeeTask} element={<ProtectedRoute><EmployeeTask /></ProtectedRoute>} />
          <Route path={routesUrl.createIpr} element={<ProtectedRoute><CreateIpr /></ProtectedRoute>} />
          <Route path={routesUrl.createTask} element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path={routesUrl.statusIpr} element={<ProtectedRoute><StatusIpr /></ProtectedRoute>} />
          <Route path={routesUrl.myIPR} element={<ProtectedRoute><MyIpr /></ProtectedRoute>} >
            <Route path={routesUrl.myTask} element={<ProtectedRoute><MyTask /></ProtectedRoute>} />
          </Route>
        </Route>
        <Route path={routesUrl.notFound} element={<NotFound />} />
      </Routes>
      {/* <button
              type="button"
              onClick={() => {
                const popupAssignment = 'info';
                // const text = 'Комментарий отправлен сотруднику!';
                // const text = 'Завтра вы отправляетесь в космос.';
                const text = '';
                handlePopup.open({ popupAssignment, newPopupText: text, newPopupImg: darts })
              }}
            >
              Открыть popup info
            </button>

            <button
              type="button"
              onClick={() => {
                const popupAssignment = 'error';
                // const text = 'Что-то пошло не так, проверьте подключение к интернету';
                const text = 'Он из лесу вышел и снова зашёл.';
                handlePopup.open({ popupAssignment, newPopupText: text, newPopupImg: telephoneOperator })
              }}
            >
              Открыть popup error
            </button>  */}
      <Popup isOpen="isTaskTrackingLogPopupOpen" handlePopup={handlePopup} />
      <Popup isOpen="isInfoPopupOpen" handlePopup={handlePopup} />
      <Popup isOpen="isErrorPopupOpen" handlePopup={handlePopup} />
      <Loader isOpen={isLoader} />
    </>
  );
};

export default App;
