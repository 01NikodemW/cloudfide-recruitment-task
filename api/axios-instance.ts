import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_ENTRYPOINT,
  headers: {
    "Content-Type": "application/json",
  },
};
export const axiosInstance = axios.create(config);
