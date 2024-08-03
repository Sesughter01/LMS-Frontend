// import ReactS3Client from "react-aws-s3-typescript";
import { ApiRequestClient } from "@/shared/utils/api-client";
import axios, { AxiosInstance } from "axios";

export default class uploadService {
  static async UploadFiletoS3(file: any): Promise<string> {
    let url = `api/v1/files`;

    const customAxios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    const response = await customAxios.post(url, file);
    return response.data.file;
  }

  // static async uploadFileToCloud(file: any) {
  //   const config = {
  //     bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME || "",
  //     region: process.env.NEXT_PUBLIC_BUCKET_REGION_NAME || "",
  //     accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID || "",
  //     secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_KEY || "",
  //     s3Url: process.env.NEXT_PUBLIC_BUCKET_ENDPOINT_URL || "",
  //   };

  //   if(Object.values(config).some((item) => item == "")){
  //       throw new Error("Invalid upload Configuration credentials")
  //   }else{
  //       const s3 = new ReactS3Client(config);
       
  //       try {
  //           const res = await s3.uploadFile(file, file.name);

  //           console.log(res);
        
  //       } catch (err) {
  //           console.log(err);
  //       }
  //   }

  // }
}
