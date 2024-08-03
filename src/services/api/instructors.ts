import { Instructor } from "@/shared/types/instructor";
import { CourseDetail } from "@/shared/types/course";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { baseURL } from "@/shared/utils/axios.instance";
import axios from "axios";
import { _getUserToken } from "../AuthService";

export default class instructorService {
  static async GetAllInstructors(): Promise<Instructor[]> {
    let url = `/api/v1/instructors`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetInstructorsById(id: number): Promise<Instructor[]> {
    let url = `/api/v1/instructors/${id}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetInstructorCourses(id: number): Promise<CourseDetail[]> {
    let url = `${baseURL}/api/v1/instructors/${id}/courses`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async disabledInstructor(id: number, status: boolean): Promise<Instructor> {
    let url = `/api/v1/instructors/${id}/status`;

    const response = await (status ? ApiRequestClient.post(url, "") : ApiRequestClient.delete(url, ""));
    return response.data;
  }

  static async deleteInstructor(id: number): Promise<Instructor> {
    let url = `/api/v1/instructors/${id}`;

    const response = await axios.delete(url);
    return response.data;
  }
}
