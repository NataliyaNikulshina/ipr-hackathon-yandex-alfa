import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './services/store';
import { fetchUser } from "./services/slice/userSlice";
import { fetchUsers } from "./services/slice/usersTeamSlice";

import "./index.scss";

import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(fetchUser());
// store.dispatch(fetchUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
