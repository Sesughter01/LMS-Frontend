export interface Admin {
    id: number,
    email: string,
    isEmailVerified: boolean,
    disabled: boolean,
    profile: {
      firstName: string,
      lastName: string,
      phoneNumber: string,
      gender: string,
      dateOfBirth: string,
      avatar: string,
      title: string,
    },
    address: {
      street: string,
      city: string,
      state: string,
      country: string,
    },
    accountType: string,
    createdAt: string,
    updatedAt: string,
    accessToken: string,
    // Add other user-related properties here
  }

export interface AdminDashboard {
  courseEnrollments: number;
  instructors: number;
  courses: number;
  chart: ChartItem[];
}

export interface ChartItem {
  course_name: string;
  unique_enrollments: number;
}
