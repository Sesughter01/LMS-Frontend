import { Programme } from "@/shared/types/programme";
import { ApiRequestClient } from "@/shared/utils/api-client";

export default class programmeService {
  static async createProgramme(payload: any): Promise<Programme> {
    try {
      const response = await ApiRequestClient.post(`/api/v1/programmes`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getProgrammes(): Promise<Programme[]> {
    try {
      const response = await ApiRequestClient.get(`/api/v1/programmes`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
