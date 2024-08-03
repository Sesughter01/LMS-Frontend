import {
    User,
  } from "@/shared/types/user";
  import { ApiRequestClient } from "@/shared/utils/api-client";
  
  export default class userService {
  
    static async GetUsersByEmail(email: string): Promise<User> {
      let url = `/api/v1/auth/email?email=${email}`;
      
      const response = await ApiRequestClient.get(url);
      return response.data;
    }
    static async updateUser(Id: number, data: any): Promise<any> {
      const url = `/api/v1/trainees/${Id}`;
      const response = await ApiRequestClient.put(url, data);
      return response.data;
    }
  }
  