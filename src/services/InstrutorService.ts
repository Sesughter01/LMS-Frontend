import { ApiRequestClient } from "@/shared/utils/api-client";
import ApiRoutes from "./ApiRoutes";
import axios from "axios";
import { baseURL } from "@/shared/utils/axios.instance";

export const _saveToken = (token: any) => {
  localStorage.setItem("token", token);
};

export const _getUserToken = () => {
  return localStorage.getItem("token");
};

export const login = async (email: string, password: string) => {
  try {
    const response = await ApiRequestClient.post(ApiRoutes.LOGIN, {
      email,
      password,
    });

    _saveToken(response.data.accessToken);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const sendInstructorInvitation = async (payload: any) => {
  try {
    const response = await ApiRequestClient.post(
      `/api/v1/instructors`,

      payload
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
