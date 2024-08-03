import axiosInstance from "@/shared/utils/axios.instance";
import { logoutUser } from "@/store/slices/authSlice";
import { persistor } from "@/store/store";

export const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  setInterceptors(store);

  return next(action);
};

export const setInterceptors = (store: any) => {
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const state = await store.getState();
      const accessToken = state?.auth?.user?.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    function (response: any) {
      return response;
    },
    function (error: any) {
      if(error?.response?.status == 401 && error?.response?.statusText == 'Unauthorized') {
        store.dispatch(logoutUser())
        //persistor.purge();
        window.location.href = '/';
      }

      return Promise.reject(error);
    },
  );
};