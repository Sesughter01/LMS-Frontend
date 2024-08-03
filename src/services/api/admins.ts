import { Admin } from "@/shared/types/admin";
import { ApiRequestClient } from "@/shared/utils/api-client";
import axiosInstance, { baseURL } from "@/shared/utils/axios.instance";
import axios from "axios";
import { _getUserToken } from "../AuthService";

export default class adminService {
  static async GetAllAdmins(): Promise<Admin[]> {
    let url = `/api/v1/admins`;

    const response = await ApiRequestClient.get(url);

    console.log("Admin:", response);

    return response.data;
  }

  static async GetAllAdminsBySuper(): Promise<Admin[]> {
    let url = `/api/v1/admins`;

    const response = await axiosInstance.get(url);

    console.log("Admin:", response);

    return response.data;
  }

  static async GetAdminById(id: number): Promise<Admin[]> {
    let url = `/api/v1/admins/${id}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async disableAdminById(id: number, status: boolean): Promise<Admin> {
    let url = `/api/v1/admins/${id}/status`;

    // const response = await axiosInstance.delete(url);
    const response = await (status ? ApiRequestClient.post(url, "") : ApiRequestClient.delete(url, ""));
    return response.data;
  }

  static async disabledAdmin(id: number, status: boolean): Promise<Admin> {
    let url = `/api/v1/instructors/${id}/status`;

    const response = await (status ? ApiRequestClient.post(url, "") : ApiRequestClient.delete(url, ""));
    return response.data;
  }

  static async sendAdminInvitation(payload: any): Promise<Admin> {
    try {
      const response = await ApiRequestClient.post(`/api/v1/admins`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async sendAdminInvitationBySuperAdmin(payload: any, organizationId: any): Promise<Admin> {
    try {
      const response = await axiosInstance.post(`/api/v1/admins/${organizationId}/organizations`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
