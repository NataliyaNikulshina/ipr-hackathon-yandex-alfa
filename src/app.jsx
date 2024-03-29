import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin/signin";

import Layout from "./components/layout/layout";
import HomePage from "./pages/homePage/homePage";
import EmployeeIpr from "./pages/employeeIpr/employeeIpr";
import IprCreateOrEdit from "./pages/iprCreateOrEdit/iprCreateOrEdit";
import EmployeeListTasks from "./pages/employeeListTasks/employeeListTasks";
import EmployeeTask from "./pages/employeeTask/employeeTask";
import TaskCreateOrEdit from "./pages/taskCreateOrEdit/taskCreateOrEdit";

import Popup from "./components/popup/popup";

import NotFound from "./pages/not-found/not-found";
import MyIprs from "./pages/myIprs/myIprs";
import MyIpr from "./pages/myIpr/myIpr";

import StatusIpr from "./pages/statusIpr/statusIpr";

import { selectUser } from "./services/slice/userSlice";
import { useAppSelector } from "./services/store";

import MyTask from "./pages/myTask/myTask";

import Loader from "./components/loader/loader";

import ProtectedRoute from "./routes/protected-route";

// функция управления popup
import HandlePopup from "./utils/handlePopup/handlePopup";

export const routesUrl = {
  signin: "/signin",

  layout: "/",
  homePage: "",
  employeeIpr: "employee-ipr/:id",
  createIpr: "create-ipr",
  employeeListTasks: "list-tasks/:idIpr",
  editIpr: "edit-ipr",
  statusIpr: "status-ipr",
  createTask: "create-task",
  employeeTask: "task/:idTask",
  editEmployeeTask: "edit-task",
  myIPRs: "myiprs",
  myIPR: "myipr/:idMyIpr",
  myTask: "my-task/:idMyTask",

  notFound: "*",
};

const App = () => {
  const handlePopup = HandlePopup();
  const { isLoading } = useAppSelector(selectUser);
  return (
    <>
      <Routes>
        <Route
          path={routesUrl.signin}
          element={
            <ProtectedRoute notAuth>
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route
          path={routesUrl.layout}
          element={
            <ProtectedRoute>
              <Layout handlePopup={handlePopup.open} />
            </ProtectedRoute>
          }
        >
          <Route
            path={routesUrl.homePage}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route
              path={routesUrl.employeeIpr}
              element={
                <ProtectedRoute>
                  <EmployeeIpr />
                </ProtectedRoute>
              }
            >
              <Route
                path={routesUrl.createIpr}
                element={
                  <ProtectedRoute>
                    <IprCreateOrEdit role="create" />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routesUrl.employeeListTasks}
                element={
                  <ProtectedRoute>
                    <EmployeeListTasks />
                  </ProtectedRoute>
                }
              >
                <Route
                  path={routesUrl.createTask}
                  element={
                    <ProtectedRoute>
                      <TaskCreateOrEdit role="create" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routesUrl.editIpr}
                  element={
                    <ProtectedRoute>
                      <IprCreateOrEdit role="edit" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routesUrl.statusIpr}
                  element={
                    <ProtectedRoute>
                      <StatusIpr />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routesUrl.employeeTask}
                  element={
                    <ProtectedRoute>
                      <EmployeeTask />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path={routesUrl.editEmployeeTask}
                    element={
                      <ProtectedRoute>
                        <TaskCreateOrEdit role="edit" />{" "}
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path={routesUrl.myIPRs} element={<MyIprs />}>
            <Route
              path={routesUrl.myIPR}
              element={<MyIpr handlePopup={handlePopup.open} />}
            >
              <Route
                path={routesUrl.myTask}
                element={<MyTask handlePopup={handlePopup.open} />}
              />
            </Route>
          </Route>
        </Route>
        <Route path={routesUrl.notFound} element={<NotFound />} />
      </Routes>
      <Popup isOpen="isTaskTrackingLogPopupOpen" handlePopup={handlePopup} />
      <Popup isOpen="isInfoPopupOpen" handlePopup={handlePopup} />
      <Popup isOpen="isErrorPopupOpen" handlePopup={handlePopup} />
      <Loader isOpen={isLoading} />
    </>
  );
};

export default App;
