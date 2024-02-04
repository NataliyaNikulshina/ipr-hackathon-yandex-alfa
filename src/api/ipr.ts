import { getReq, postReq, patchReq } from "./api";

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
  skill?: string;
  start_date?: string;
  status: string;
  checkbox?: boolean;
  isBoss?: boolean;
  onClick?: VoidFunction | ((e: any) => void);
};

export type IAddTask = {
  end_date: string;
  start_date: string;
  name: string,
  description: string;
  executor: number,
  status: string,
  ipr: number,
  skill: string
}

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
  executor: number,
  status: string
}

export interface IIprResponse extends Array<IIpr> {}
export interface IAddIprResponse extends IIpr {}
export interface IAddTaskResponse extends ITask {}

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
    uri: `api/v1/iprs/`, 
    auth: true, 
    data: userInfo 
  });
}


// Запрос на изменение ИПР 
export function editIprApi(userInfo:IAddIpr, id: number) {
  return patchReq<IAddIprResponse>({ 
    uri: `api/v1/iprs/${id}/`, 
    auth: true, 
    data: userInfo 
  });
}


// Запрос на создание задачи 
export function addTaskApi(userInfo:IAddTask) {
  return postReq<IAddTaskResponse>({ 
    uri: `api/v1/tasks/`, 
    auth: true, 
    data: userInfo 
  });
}


// Запрос на изменение задачи 
export function editTaskApi(userInfo:IAddTask, id: number) {
  return patchReq<IAddTaskResponse>({ 
    uri: `api/v1/tasks/${id}/`, 
    auth: true, 
    data: userInfo 
  });
}