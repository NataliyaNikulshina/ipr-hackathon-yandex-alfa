import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Signin from "./pages/signin/signin";

import Layout from "./components/layout/layout";
  import HomePage from "./pages/homePage/homePage";
    import EmployeeIpr from "./pages/employeeIpr/employeeIpr";
      import CreateIpr from "./pages/createIpr/createIpr";
      import EmployeeListTasks from "./pages/employeeListTasks/employeeListTasks";
      import EditIpr from "./pages/editIpr/editIpr";
      import EmployeeTask from "./pages/employeeTask/employeeTask";
        import EditEmployeeTask from "./pages/editEmployeeTask/editEmployeeTask";

import Popup from "./components/popup/popup";

import NotFound from "./pages/not-found/not-found";





import StatusIpr from "./pages/statusIpr/statusIpr";
import CreateTask from "./pages/createTask/createTask";

import MyIpr from "./pages/myIpr/myIpr";
import MyTask from "./pages/myTask/myTask";



import Loader from "./components/loader/loader";

// функция управления popup
import HandlePopup from './utils/handlePopup/handlePopup';

//  Ссылки на картинки инфо попапа
import darts from "./images/darts.png";
import telephoneOperator from "./images/telephone-operator.png";


export const routesUrl = {
  signin: "/signin",

  layout: "/",
  homePage: "",
    employeeIpr: "employee-ipr",
      createIpr: "create-ipr",
      employeeListTasks: "list-tasks",
        editIpr: "edit-ipr",
        statusIpr: "status-ipr",
        createTask: "create-task",
        employeeTask: "task",
          editEmployeeTask: "edit-task",
          
  myIPR: "myipr",
    myTask: "my-task",

  notFound: "*",
};

const App = () => {
  const path = useLocation().pathname;
  const handlePopup = HandlePopup();

  const [isLoader, setIsLoader] = useState(false);

  return (
    <>
      <Routes>
        <Route path={routesUrl.signin} element={<Signin />} />
        <Route path={routesUrl.layout} element={<Layout handlePopup={handlePopup.open} />}>

          <Route path={routesUrl.homePage} element={<HomePage />}>

            <Route path={routesUrl.employeeIpr} element={<EmployeeIpr />}>
              {/* Считаю что создание ИПР должно выкидывать обратно на страницу EmployeeIpr при успешной отсылки на бэк */}
              <Route path={routesUrl.createIpr} element={<CreateIpr />} />    
              {/* И не нужно с это страницы переходить в создание задачи! */}
              <Route path={routesUrl.employeeListTasks} element={<EmployeeListTasks />}>
                  <Route path={routesUrl.createTask} element={<CreateTask />} />
                  {/* Редактировать ИПР, про неё забыли.!!! */}
                  <Route path={routesUrl.editIpr} element={<EditIpr />} />
                  <Route path={routesUrl.statusIpr} element={<StatusIpr />} />
                  <Route path={routesUrl.employeeTask} element={<EmployeeTask />} >
                    <Route path={routesUrl.editEmployeeTask} element={<EditEmployeeTask />} />
                  </Route> 
              </Route>
            </Route>

          </Route>

          <Route path={routesUrl.myIPR} element={<MyIpr />}>
            <Route path={routesUrl.myTask} element={<MyTask />} />
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
      <Popup isOpen='isTaskTrackingLogPopupOpen' handlePopup={handlePopup} />
      <Popup isOpen='isInfoPopupOpen' handlePopup={handlePopup} />
      <Popup isOpen='isErrorPopupOpen' handlePopup={handlePopup} />
      <Loader isOpen={isLoader} />
    </>
  );
};

export default App;
