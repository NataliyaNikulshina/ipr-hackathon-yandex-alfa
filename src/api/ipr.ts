import { getReq, postReq } from "./api";

// типизация данных ИПР

export type IIprUser = {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  position: string;
  userpic: string;
};

export type ITask = {
  id?: number;
  creation_date?: string;
  creator?: string;
  description?: string;
  end_date?: string;
  name: string;
  start_date?: string;
  status: string;
  checkbox?: boolean;
  isBoss?: boolean;
  onClick?: VoidFunction | ((e: any) => void);
};

export type IIpr = {
  creation_date: string;
  creator: IIprUser;
  end_date: string;
  executor: IIprUser;
  id: number;
  start_date: string;
  status: string;
  tasks: ITask[];
  title: string;
};

export type IAddIpr = {
  end_date: string;
  start_date: string;
  title: string,
  executor: IIprUser,
  status: string
}

export interface IIprResponse extends Array<IIpr> {}
export interface IAddIprResponse extends IIpr {}

// Запрос на получение данных ИПР отпределенного пользователя
export function getIprApi(id: number) {
  return getReq<IIprResponse>({
    uri: `api/v1/iprs/?user_id=${id}`,
    auth: true,
  });
}

// Запрос на создание ИПР 
export function addIprApi(userInfo:IAddIpr) {
  return postReq<IAddIprResponse>({ 
    uri: "api/v1/iprs/?user_id=${id}", 
    auth: true, 
    data: userInfo 
  });
}
