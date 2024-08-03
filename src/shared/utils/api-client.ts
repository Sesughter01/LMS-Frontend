import { _getOrgId, _getUserToken } from "@/services/AuthService";
import axiosInstance from "./axios.instance";

class ApiClient {
  get(path: string, params: any | null = null) {
    const headers = this.getHeaders();
    return axiosInstance.get(path, {
      params,
      headers,
    });
  }

  post(path: string, payload: any, headers = {}) {
    return axiosInstance.post(path, payload, {
      headers,
    });
  }
 

  delete(path: string, params: any) {
    return axiosInstance.delete(path, {
      params,
    });
  }

  patch(path: any, payload: any = {}) {
    return axiosInstance.patch(path, payload);
  }

  put(path: any, payload: any) {
    return axiosInstance.put(path, payload);
  }

  getHeaders() {
    const headers = {
      Authorization: `Bearer ${_getUserToken()}`,
      Organization: `${_getOrgId()}`,
    };
    return headers;
  }
}

export const ApiRequestClient = new ApiClient();
