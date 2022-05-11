import axios, { AxiosRequestConfig } from "axios";

// define common config for Axios
const instanceAxios = {
  baseURL: process.env.REACT_APP_API,
};

const axiosConfig = axios.create(instanceAxios);

const request = ({ method, url, data, ...rest }: AxiosRequestConfig) =>
  axiosConfig({
    method: method,
    url: url,
    data: data,
    ...rest,
  });

const requestToken = ({ method, url, data, ...rest }: AxiosRequestConfig) => {
  let token = localStorage.getItem("token");

  return axiosConfig({
    method: method,
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...rest,
  });
};

const axiosConfigInter = axios.create(instanceAxios);

export { request, requestToken, axiosConfigInter };
