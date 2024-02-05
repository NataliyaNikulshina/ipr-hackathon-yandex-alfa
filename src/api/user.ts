import { getReq, getReqUser } from './api';

// типизация данных пользователя
export type IUserMe = {
  id: number,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  patronymic: string,
  position: string,
  is_boss: true,
  date_joined: string,
  last_login: string,
  userpic: string,
  team: number
};

export type IUsers =
  IUserMe[];

export interface IUser extends IUserMe { }
export interface IUserMeResponse extends IUserMe { }
export interface IUsersResponse extends IUsers { }
export interface IUserResponse extends IUser { }

// Запрос на получение данных пользователя
export function getUserMeInfoApi() {
  return getReqUser<IUserMeResponse>({ uri: 'api/v1/users/me/', auth: true });
}

// Запрос на получение данных всех пользователей
export function getUsersAllInfoApi() {
  return getReq<IUsersResponse[]>({ uri: 'api/v1/users/', auth: true });
}

// Запрос на получение данных всех пользователей
export function getUserInfoApi(id: number) {
  return getReq<IUserResponse>({ uri: `api/v1/users/${id}`, auth: true });
}