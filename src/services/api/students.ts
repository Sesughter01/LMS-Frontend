import { Student, StudentAssessment } from "@/shared/types/student";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { baseURL } from "@/shared/utils/axios.instance";
import axios from "axios";
import { _getUserToken } from "../AuthService";

export default class studentService {
  static async GetAllUsers(): Promise<Student[]> {
    let url = `/api/v1/trainees`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetUsersById(id: number): Promise<Student[]> {
    let url = `/api/v1/trainees/${id}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetUsersProfileById(id: number): Promise<Student[]> {
    let url = `/api/v1/trainees/${id}/profile`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetUserEducationDetails(id: number): Promise<Student[]> {
    let url = `/api/v1/trainees/${id}/profile`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async disabledStudent(id: number, status: boolean): Promise<Student> {
    let url = `${baseURL}/api/v1/instructors/${id}/status`;

    const response = await (status ? ApiRequestClient.post(url, "") : ApiRequestClient.delete(url, ""));
    return response.data;
  }

  static async getStudentAssessmentDetails(id: number): Promise<StudentAssessment> {
    let url = `/api/v1/trainees/${id}/assessments/participations`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetStudentAssessmentProgress(id: number): Promise<Student[]> {
    let url = `/api/v1/trainees/${id}/progress`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetStudentByAssessmentId(id: number): Promise<Student[]> {
    let url = `/api/v1/assessments/${id}/students`;

    const response = await ApiRequestClient.get(url);
    console.log(response, "responseStudent");
    return response.data;
  }
}
