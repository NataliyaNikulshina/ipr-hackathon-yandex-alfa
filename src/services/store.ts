import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import usersTeamReduser from "./slice/usersTeamSlice";
import {
    TypedUseSelectorHook,
    useSelector,
    useDispatch,
  } from 'react-redux';

const rootReducer = combineReducers( {
    user: userReducer,
    usersTeam: usersTeamReduser,
});



export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;