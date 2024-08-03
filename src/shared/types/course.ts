export interface Course {
  id: number;
  courseTitle: string;
  coursePrice?: any;
  courseDescription: string;
  courseListingImageReferenceId: string;
  image: string;
  cohortId: number;
  programmeId: number;
  cohortName: string;

  qualifyForCoupon: boolean;
  isEnrolled: boolean;

  courseStartDate: string;
  courseEndDate: string;

  createdAt: string;

  students: number;
  instructors: number;
  modules: number;
  hours: number;
}

export interface CourseDetail {
  couponId: number;
  cohortId: number;
  courseCode: null;
  courseDescription: string;
  courseEndDate: string;
  courseListingImageReferenceId: string;
  coursePrice: number;
  courseProfileImageReferenceId: string;
  courseStartDate: string;
  courseThumbnailImageReferenceId: string;
  courseTitle: string;
  createdAt: string;
  createdBy: number;
  deletedBy: null;
  hasAPreAssessment: boolean;
  id: number;
  isDeleted: boolean;
  isOpenForEnrollment: boolean;
  preAssessmentId: null;
  programmeId: number;
  updatedAt: string;
  students: number;
  instructors: number;
  modules: number;
  hours: number;
  courseOverview: any;
  courseInstructors: any;
}

export interface courseOverview {
  FAQ: { answer: string; question: string }[];
  about: null;
  courseId: number;
  id: number;
  learn: null;
  syllabus: null;
}

export interface couponResponse {
  id: number;
  couponTitle: string;
  couponCode: string;
  couponDiscountType: string;
  couponDiscountValue: number;
  maximumCouponUsageCount: number;
  cummulativeMaximumValueLimit: number;
  isActive: boolean;
  isDeleted: boolean;
  deletedBy: null;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}