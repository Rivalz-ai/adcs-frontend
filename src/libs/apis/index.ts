import axios from "axios";
import queryString from "query-string";
import { getAccessToken } from "../utls";

export const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    ...headers,
  },
  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(params);
    },
  },
});

// Add request interceptor to set auth header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data?.data || response.data;
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data && error.response.data?.message) ||
        "Something went wrong"
    );
  }
);
export default axiosInstance;
