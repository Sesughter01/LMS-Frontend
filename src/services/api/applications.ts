import { Application } from "@/shared/types/application";
import { ApiRequestClient } from "@/shared/utils/api-client"

export const GetMyApplications = async (traineeUserId: number) : Promise<Application[]>=> {
    const response = await ApiRequestClient.get(`/api/v1/trainees/${traineeUserId}/applications`);
    return response.data;
}

export const updateMyAppliedCourse = async (traineeUserId: number, applicationId: number, courseId: number) => {
    const response = await ApiRequestClient.put(`/api/v1/trainees/${traineeUserId}/applications/${applicationId}`, {
        courseId: courseId
    });

    return response.data;
}