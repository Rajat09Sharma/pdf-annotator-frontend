import { useEffect } from "react";
import { axiosPrivate } from "../apis/axiosApi";
import { useRefreshToken } from "./useRefreshToken";
import { useSelector } from "react-redux";

export const useAxiosPrivate = () => {
  const authToken = useSelector((state) => state.auth.token);
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config; 
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.retry) {
          prevRequest.retry = true;
          const token = await refreshToken();
          prevRequest.headers = prevRequest.headers || {};
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken, refreshToken]);

  return axiosPrivate;
};
