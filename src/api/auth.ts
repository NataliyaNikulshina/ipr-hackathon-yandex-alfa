import { getReq, postReq } from './api';

export interface IUserSigninState {
  email: string;
  password: string;
}

export interface IUserResponse extends TUser {}

// типизация данных пользователя
export type TUser = {
    email: string;
    access: string;
    refresh: string;
};

// запрос авторизации
function signinApi(userInfo: IUserSigninState) {
  return postReq<IUserResponse>({ uri: "api/v1/auth/jwt/create/", data: userInfo });
}


export {
  signinApi,
};