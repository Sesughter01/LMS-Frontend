export interface Instructor {
    id: number,
    email: string,
    isEmailVerified: boolean,
    accountType: string,
    password: string,
    disabled: boolean,
    profile: {
      firstName: string,
      lastName: string,
      phoneNumber: string,
      avatar: string,
      gender: string,
      dateOfBirth: string,
    },
    address: {
      street: string,
      city: string,
      state: string,
      country: string,
    },
    education: {
      institutionName: string,
      startYear: string,
      endYear: string,
      yearOfGraduation: string,
      certificateObtained: string,
      courseOfStudy: string,
    },
    roleId: string,
    createdAt: string,
    updatedAt: string,
    accessToken: string,
    // Add other user-related properties here
}

interface CourseOverview {
  id: number;
  courseId: number;
  about: string;
  syllabus: string;
  learn: string[];
  FAQ: { answer: string; question: string }[];
}

interface Course {
  id: number;
  cohortId: number | null;
  courseTitle: string;
  courseCode: string | null;
  status: string;
  courseDescription: string;
  coursePrice: number;
  courseImage: string | null;
  courseProfileImageReferenceId: string | null;
  courseListingImageReferenceId: string | null;
  courseThumbnailImageReferenceId: string | null;
  courseStartDate: string | null;
  courseEndDate: string | null;
  couponId: number | null;
  isOpenForEnrollment: boolean;
  hasAPreAssessment: boolean;
  preAssessmentId: number | null;
  isDeleted: boolean;
  deletedBy: number | null;
  createdBy: number | null;
  createdAt: string;
  updatedAt: string;
  IsUserEnrolled: boolean;
  students: number;
  modules: number;
  instuctors: number;
  assessments: number;
  hours: number;
  cohortName: string;
  courseOverview: CourseOverview;
}

export interface InstructorDashboard {
  unique_students_enrolled: number;
  total_modules: number;
  total_assessments: number;
  courses: Course[];
}
