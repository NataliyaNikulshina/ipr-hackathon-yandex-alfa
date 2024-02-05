import { postReq } from "./api";

export interface IUserSigninState {
  email: string;
  password: string;
}

export interface IUserSigninResponse extends TUserSignin {}

// типизация данных пользователя
export type TUserSignin = {
  email: string;
  access: string;
  refresh: string;
};

// запрос авторизации
function signinApi(userInfo: IUserSigninState) {
  return postReq<IUserSigninResponse>({
    uri: "api/v1/auth/jwt/create/",
    data: userInfo,
  });
}

export { signinApi };
