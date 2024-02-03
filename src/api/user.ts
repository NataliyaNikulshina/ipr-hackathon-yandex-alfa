import { getReq } from './api';

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

export interface IUserMeResponse extends IUserMe {}
export interface IUsersResponse extends IUsers {}



// Запрос на получение данных пользователя
export function getUserInfoApi() {
  return getReq<IUserMeResponse>({ uri: 'api/v1/users/me/', auth: true });
}

// Запрос на получение данных всех пользователей
export function getUsersAllInfoApi() {
  return getReq<IUsersResponse[]>({ uri: 'api/v1/users/', auth: true });
}


