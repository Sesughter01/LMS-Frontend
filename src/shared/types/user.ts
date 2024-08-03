// export interface User {
//     id: number,
//     email: string,
//     password: string,
//     profile: {
//       firstName: string,
//       lastName: string,
      
//       avatarImageUrl: string,
//     },
//     telephone: string,
//     street: string,
//     city: string,
//     state: string,
//     dateOfBirth: string,
//     role: string,
//     createdAt: string,
//     updatedAt: string,
//     accessToken: string,
//     userProgrammes: any,
//     // Add other user-related properties here
//   }

// src/shared/types/user.ts

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarImageUrl?: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    title?: string;
    gender?: string;
    avatarImageUrl: string;
  };
  telephone: string;
  street: string;
  city: string;
  state: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  userProgrammes: any;
  // Add other user-related properties here
}