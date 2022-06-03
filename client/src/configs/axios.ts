import axios from "axios";

import { API_URL } from "../services/constants/http";
import { getTokenStorage, setTokenStorage } from "../packages/storage";
import { refreshRequest } from "../packages/api/rest/auth";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  // eslint-disable-next-line
  config.headers!.Authorization = `BEARER ${getTokenStorage()}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    try {
      const originalRequest = err.config;

      if (err.response.status === 401 && err.config && !err.config.__isRetry) {
        originalRequest._isRetry = true;
        const response = await refreshRequest();

        setTokenStorage(response.data.accessToken);

        return $api.request(originalRequest);
      }

      throw err;
    } catch (e) {
      console.log(e);
    }
  }
);

export default $api;
