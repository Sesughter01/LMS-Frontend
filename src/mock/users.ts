import { v4 as uuidv4 } from 'uuid';
import { User } from "@/shared/types/user";


export const usersMockData: User[] = [
  {
    id: 1,
    email: "user1@example.com",
    password: "password1",  // In a real scenario, passwords should be hashed
    profile: {
      firstName: "John",
      lastName: "Doe",
      avatarImageUrl: ""
    },
    telephone: "1234567890",
    street: "123 Main St",
    city: "Somewhere",
    state: "CA",
    dateOfBirth: "1990-01-01",
    role: "user",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    accessToken: "mockAccessToken",
    userProgrammes: [],
    isEmailVerified:false ,
  },
  {
    id: 2,
    email: "charles.avul@gmail.com",
    password: "password2",  // In a real scenario, passwords should be hashed
    profile: {
      firstName: "Jane",
      lastName: "Doe",
      avatarImageUrl: ""
    },
    telephone: "0987654321",
    street: "456 Elm St",
    city: "Anywhere",
    state: "NY",
    dateOfBirth: "1985-05-05",
    role: "admin",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    accessToken: "mockAccessToken",
    userProgrammes: [],
    isEmailVerified:true
  }
];

export default usersMockData;