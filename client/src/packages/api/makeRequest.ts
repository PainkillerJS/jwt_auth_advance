import axios from "axios";
import type { AxiosResponse } from "axios";

import $api from "../../configs/axios";

type methodsAxios = "get" | "post";
type argsMakeRequest<D> = {
  method: methodsAxios;
  url: string;
  data?: D;
  isUseInstanceAxios?: boolean;
};

export default async <T, D = any>({ method, url, data, isUseInstanceAxios = true }: argsMakeRequest<D>): Promise<AxiosResponse<T>> => {
  const request = isUseInstanceAxios ? $api : axios.create({ withCredentials: true });

  if (method === "post") {
    return request.post<T>(url, data);
  }

  return request[method]<T>(url);
};
