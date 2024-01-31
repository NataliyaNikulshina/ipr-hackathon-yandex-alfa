import { getReq } from './api';

// типизация данных пользователя
export type IUserMeResponse = {
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

// Запрос на получение данных пользователя
function getUserInfoApi() {
  return getReq<IUserMeResponse>({ uri: 'api/v1/users/me/', auth: true });
}

export default getUserInfoApi;
