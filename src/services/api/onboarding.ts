import { ApiRequestClient } from "@/shared/utils/api-client";

export default class OnboardingService {
  static async updateSingleTrainee(traineeId: number, data: any): Promise<any> {
    const url = `/api/v1/trainees/${traineeId}`;
    const response = await ApiRequestClient.put(url, data);
    return response.data;
  }

  static async createTraineeAddress(traineeId: number, data: any): Promise<any> {
    const url = `/api/v1/trainees/${traineeId}/address`;
    const response = await ApiRequestClient.post(url, data);
    return response.data;
  }

  static async createTraineeEducation(traineeId: number, data: any): Promise<any> {
    const url = `/api/v1/trainees/${traineeId}/education`;
    const response = await ApiRequestClient.post(url, data);
    return response.data;
  }
}
