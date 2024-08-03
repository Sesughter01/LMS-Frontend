import { AdminDashboard } from "@/shared/types/admin";
import { Announcement } from "@/shared/types/announcement";
import { InstructorDashboard } from "@/shared/types/instructor";
import { ApiRequestClient } from "@/shared/utils/api-client";

export default class DashboardService {
  static async getAdminDashboard(): Promise<AdminDashboard | null> {
    const url = "/api/v1/admins/dashboard";
    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async getInstructorDashboard(): Promise<InstructorDashboard | null> {
    const url = "/api/v1/instructors/30/dashboard";
    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async addAnnouncement(payload: any): Promise<any> {
    const url = "/api/v1/announcements";
    const response = await ApiRequestClient.post(url, payload);
    return response.data;
  }

  static async getAnnouncements(): Promise<Announcement> {
    const url = "/api/v1/announcements";
    const response = await ApiRequestClient.get(url);
    return response.data;
  }
}
