import { combineReducers, configureStore, ThunkDispatch, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import usersTeamReduser from "./slice/usersTeamSlice";
import iprReduser from './slice/iprSlice';
import myIprReduser from "./slice/myIprSlice";
import employeeReduser from './slice/employeeSlice'
import {
    TypedUseSelectorHook,
    useSelector,
    useDispatch,
  } from 'react-redux';

const rootReducer = combineReducers( {
    user: userReducer,
    usersTeam: usersTeamReduser,
    ipr: iprReduser,
    myIpr: myIprReduser,
    employee: employeeReduser,
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>; 
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;