import axios from "axios";
import queryString from "query-string";

export const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const axiosOpenApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CATEGORY_API_URL,
  headers: {
    ...headers,
  },
  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(params);
    },
  },
});

axiosOpenApi.interceptors.response.use(
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
export default axiosOpenApi;
