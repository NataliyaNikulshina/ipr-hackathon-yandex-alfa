import { getAccessToken } from "../utils/authService";

// типизация запросов api
export interface IResponse<T> extends Response {
  json(): Promise<T>;
}

export type TResponseError = [string, Promise<unknown>];

const BASE_URL = "https://ipr.ddns.net";

type TReq = {
  uri: string;
  auth?: boolean;
  data?: any;
  id?: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
};

type TOptions = {
  headers?: { authorization?: string; "Content-Type": string };
  method?: string;
  body?: string;
};

export function checkRes<T>(res: IResponse<T>): Promise<T> | Promise<never> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}

function request<T>(url: string, options: TOptions): Promise<T> {
  return fetch(url, options).then(checkRes);
}

function requestNotRes<T>(url: string, options: TOptions): Promise<T> {
  return fetch(url, options).then();
}

const BASE_PARAMS = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

function getReqParams({ uri, id, method, data, auth }: TReq) {
  const params: TOptions = {
    ...BASE_PARAMS,
    method,
  };
  const path = `${BASE_URL}/${uri}${id ? `/${id}` : ""}`;
  if (auth) {
    params.headers!.authorization = `Bearer ${getAccessToken() || ""}`;
  }
  if (data) {
    params.body = JSON.stringify(data);
  }
  return { path, params };
}

export function getReq<T>(options: TReq) {
  const { path, params } = getReqParams({ ...options, method: "GET" });
  return request<T>(path, params);
}

export function postReq<T>(options: TReq) {
  const { path, params } = getReqParams({ ...options, method: "POST" });
  return request<T>(path, params);
}

export function patchReq<T>(options: TReq) {
  const { path, params } = getReqParams({ ...options, method: "PATCH" });
  return request<T>(path, params);
}

export function deleteReq<T>(options: TReq) {
    const { path, params } = getReqParams({ ...options, method: 'DELETE' });
    return requestNotRes<T>(path, params);
  }

export default {
  patchReq,
  postReq,
  getReq,
};
