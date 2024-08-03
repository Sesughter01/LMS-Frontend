// import {
//   Course,
//   CourseDetail,
//   couponResponse,
//   courseOverview,
// } from "@/shared/types/course";
// import { Module } from "@/shared/types/module";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { baseURL } from "@/shared/utils/axios.instance";
import axios from "axios";
import { _getUserToken } from "../AuthService";

import { Module } from "@/shared/types/module";
import { courses, courseDetails,CourseOverviews,CouponResponses} from "@/mock/courses";
import {modules} from "@/mock/modules";
import { Course, CourseDetail, couponResponse, courseOverview } from "@/shared/types/course";

export default class courseService {
  static async GetAllAvailableCoursesInProgramme(
    programmeId: number,
    cohortId?: number
  ): Promise<Course[]> {
    let url = `/api/v1/courses?programmeId=${programmeId}&`;

    if (cohortId) {
      url = `${url}cohortId=${cohortId}&`;
    }

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetAllAvailableCourses(
    organizationId: any,
    programmeId: number,
    cohortId?: number
  ): Promise<Course[]> {
    let url = `${baseURL}/api/v1/courses?programmeId=${programmeId}&`;
    console.log("COHORT IDD : ", cohortId)
    if (cohortId) {
      url = `${url}cohortId=${cohortId}&`;
    }

    // const response = await ApiRequestClient.get(url);
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        organization: organizationId,
      },
    });
    return response.data;
  }
  static async GetAllAvailableCourses2(
    organizationId: any,
    programmeId: number,
    cohortId?: number
  ): Promise<Course[]> {
    console.log("PROGRAMME ID", programmeId);
    console.log("COHORT IDD", cohortId);
    let url = `${baseURL}/api/v1/courses`;

    if (cohortId) {
      url = `${url}&cohortId=${cohortId}`;
    }

    // const response = await ApiRequestClient.get(url);
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        organization: organizationId,
      },
    });
    return response.data;
  }

  static async GetAllAvailableCoursesInCohort(
    cohortId: number
  ): Promise<Course[]> {
    let url = `/api/v1/courses?cohortId=${cohortId}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetIndividualCourseDetails(
    courseId: number
  ): Promise<CourseDetail> {
    let url = `/api/v1/courses/${courseId}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetCourseOverview(courseId: number): Promise<courseOverview> {
    let url = `/api/v1/courses/${courseId}/overview`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async initiateCoursePayment(
    couponCode: any,
    paymentOption: string,
    courseId: number
  ): Promise<any> {
    let url = `/api/v1/payments`;

    const response = await ApiRequestClient.post(url, {
      couponCode: couponCode ? couponCode : "",
      paymentOption,
      courseId,
    });
    return response.data;
  }

  static async confirmPayment(
    { ref, courseId }: any,
    organizationId: any
  ): Promise<any> {
    let url;
    if (ref) {
      url = `/api/v1/payments/verify?reference=${ref}`;
    } else {
      url = `/api/v1/payments/verify?courseId=${courseId}`;
    }

    const response = await ApiRequestClient.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        organization: organizationId,
      },
    });
    return response.data;
  }

  static async getUserCoupon(
    courseCouponId: any,
    courseId: string,
    traineeId: any
  ): Promise<couponResponse> {
    let url = `/api/v1/couponCode/${courseCouponId}/course/${courseId}?traineeId=${traineeId}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async validateCoupon(couponCode: string): Promise<couponResponse> {
    let url = `/api/v1/couponCode/code?couponCode=${couponCode}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async GetModule(courseId: number): Promise<Module[]> {
    let url = `/api/v1/courses/${courseId}/modules`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async assignCourseToInstructor(
    id: number,
    courseId: number,
    action?: string
  ): Promise<Course[]> {
    const data = {
      courseId: courseId,
    };

    let url = `/api/v1/instructors/${id}/courses`;

    const response = await (action && action == "add"
      ? ApiRequestClient.post(url, data)
      : ApiRequestClient.delete(url, { courseId: courseId }));
    return response.data;
  }

  static async addCourseToCohort(
    courseId: number,
    cohortId: number
  ): Promise<CourseDetail> {
    let url = `/api/v1/courses/${courseId}/cohort`;

    const data = {
      cohortId: cohortId,
    };
    const response = await ApiRequestClient.post(url, data);
    return response.data;
  }

  static async createACourse(payload: any): Promise<CourseDetail> {
    try {
      let url = `/api/v1/courses`;
      const response = await ApiRequestClient.post(url, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async DeleteSingleCourse(id: number): Promise<Course[]> {
    const response = await ApiRequestClient.delete(`/api/v1/courses/${id}`, "");
    return response.data;
  }

  static async GetAllStudentInCourse(courseId: number): Promise<Module[]> {
    let url = `/api/v1/courses/${courseId}/students`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }

  static async getUserPayments(userId: number): Promise<any[]> {
    let url = `/api/v1/payments/${userId}`;

    const response = await ApiRequestClient.get(url);
    return response.data;
  }
}



// export default class courseService {
//   static async GetAllAvailableCoursesInProgramme(
//     programmeId: number,
//     cohortId?: number
//   ): Promise<Course[]> {
//     let url = `/api/v1/courses?programmeId=${programmeId}&`;

//     if (cohortId) {
//       url = `${url}cohortId=${cohortId}&`;
//     }

//     const response = await ApiRequestClient.get(url);

//     // console.log("resssssssssssss", response)
//     return response.data;
//   }

//   static async GetAllAvailableCourses(
//     organizationId: any,
//     programmeId: number,
//     cohortId?: number
//   ): Promise<Course[]> {
//     console.log("PROGRAMME ID", programmeId);
//     let url = `${baseURL}/api/v1/courses?programmeId=${programmeId}&`;

//     if (cohortId) {
//       url = `${url}cohortId=${cohortId}&`;
//     }

//     // const response = await ApiRequestClient.get(url);
//     const response = await axios.get(url, {
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//         organization: organizationId,
//       },
//     });
//     console.log("RESPONSE DATAA", response.data);
//     return response.data;
//   }

//   static async GetAllAvailableCoursesInCohort(
//     cohortId: number
//   ): Promise<Course[]> {
//     let url = `/api/v1/courses?cohortId=${cohortId}`;

//     const response = await ApiRequestClient.get(url);
//     // console.log("responsewwwwwwwwwwwwww", response)
//     return response.data;
//   }

//   static async GetIndividualCourseDetails(
//     courseId: number
//   ): Promise<CourseDetail> {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const courseDetail = courseDetails.find(course => course.id === courseId);
//         if (courseDetail) {
//           resolve(courseDetail);
//         } else {
//           reject(new Error(`Course with ID ${courseId} not found`));
//         }
//       }, 500); // Simulating network latency
//     });
//   }

//   static async GetCourseOverview(courseId: number): Promise<courseOverview> {
//     return new Promise((resolve,reject) => {
//       setTimeout(() => {
//         const courseOview = CourseOverviews.find(course => course.id === courseId);
//         if(courseOview ){

//           resolve(courseOview ); 

        
//       }else {
//         reject(new Error(`Course with ID ${courseId} not found`));
//       }
//     }
//       , 500); // Simulating network latency
//     });
//   }

//   static async initiateCoursePayment(
//     couponCode: any,
//     paymentOption: string,
//     courseId: number
//   ): Promise<any> {
//     let url = `/api/v1/payments`;

//     const response = await ApiRequestClient.post(url, {
//       couponCode: couponCode ? couponCode : "",
//       paymentOption,
//       courseId,
//     });
  
//     return response.data;
//   }
  

//   static async confirmPayment(
//     { ref, courseId }: any,
//     organizationId: any
//   ): Promise<any> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ verified: true });
//       }, 500); // Simulating network latency
//     });
//   }

//   static async getUserCoupon(
//     courseCouponId: any,
//     courseId: string,
//     traineeId: any
//   ): Promise<couponResponse> {
//     return new Promise((resolve,reject) => {
//       setTimeout(() => {
          
//         const couponResponse = CouponResponses.find(couponresponse => couponresponse.id === courseCouponId);
//         if(couponResponse){

//           resolve(couponResponse ); 

        
//       }else {
//         reject(new Error(`Course with ID ${courseCouponId} not found`));
//       }
//       }, 500); // Simulating network latency
//     });
//   }

//   static async validateCoupon(couponCode: string): Promise<couponResponse> {
//     return new Promise((resolve,reject) => {
//       setTimeout(() => {
//         const coupon = CouponResponses.find(couponresponse => couponresponse.couponCode === couponCode);
//         if(coupon){
          
//           resolve(coupon);
//         }else{
//           reject(new Error(`Course Response with coupon code ${couponCode} not found`));
//         }
//       }, 500); // Simulating network latency
//     });
//   }

//   static async GetModule(courseId: number): Promise<Module[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(modules.filter(module => module.courseId === courseId));
//       }, 500); // Simulating network latency
//     });
//   }

//   static async assignCourseToInstructor(
//     id: number,
//     courseId: number,
//     action?: string
//   ): Promise<Course[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulating the assignment
//         resolve(courses);
//       }, 500); // Simulating network latency
//     });
//   }

//   static async addCourseToCohort(
//     courseId: number,
//     cohortId: number
//   ): Promise<CourseDetail> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulating adding course to cohort
//         const courseDetail = courseDetails.find(course => course.id === courseId);
//         if (courseDetail) {
//           // courseDetail.cohortId = cohortId;
//           resolve(courseDetail);
//         }
//       }, 500); // Simulating network latency
//     });
//   }

//   static async createACourse(payload: any): Promise<CourseDetail> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newCourse = { ...payload, id: courses.length + 1 };
//         courses.push(newCourse);
//         resolve(newCourse);
//       }, 500); // Simulating network latency
//     });
//   }

//   static async DeleteSingleCourse(id: number): Promise<Course[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const index = courses.findIndex(course => course.id === id);
//         if (index !== -1) {
//           courses.splice(index, 1); // Remove the course from the array
//         }
//         resolve([...courses]); // Return the updated list of courses
//       }, 500); // Simulating network latency
//     });
//   }

//   static async GetAllStudentInCourse(courseId: number): Promise<Module[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(modules.filter(module => module.courseId === courseId));
//       }, 500); // Simulating network latency
//     });
//   }

//   static async getUserPayments(userId: number): Promise<any[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve([]); // Return an empty array or mock payment data if available
//       }, 500); // Simulating network latency
//     });
//   }
// }