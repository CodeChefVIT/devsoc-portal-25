import { APIResponse } from "@/interfaces";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENTVAR,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
// Add a request interceptor
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    config.withCredentials = true;

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const error = err as AxiosError;
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!error.response) {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post<APIResponse<unknown>>(
          `${process.env.NEXT_PUBLIC_CLIENTVAR}/token/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        return api(originalRequest); // Use the api instance to retry the request
      } catch {
        // Handle refresh token error or redirect to login
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          //UNCOMMENT WHEN LOGIN DONE
          // window.location.href = "/login";
        }, 2000);
      }
    }

    return Promise.reject(error);
  },
);

export default api;


