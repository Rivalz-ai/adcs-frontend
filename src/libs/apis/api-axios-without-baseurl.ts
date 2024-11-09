import axios from "axios";
import queryString from "query-string";

export const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const axiosWithoutBaseUrl = axios.create({
  headers: {
    ...headers,
  },
  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(params);
    },
  },
});

axiosWithoutBaseUrl.interceptors.response.use(
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
export default axiosWithoutBaseUrl;
