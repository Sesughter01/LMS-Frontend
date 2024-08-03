import { Organization } from "@/shared/types/organization";
import { ApiRequestClient } from "@/shared/utils/api-client";

export default class OrganizationService {
  static async createOrganization(payload: any): Promise<Organization> {
    try {
      const response = await ApiRequestClient.post(`/api/v1/organizations`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getOrganizations(): Promise<Organization[]> {
    try {
      const response = await ApiRequestClient.get(`/api/v1/organizations`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
