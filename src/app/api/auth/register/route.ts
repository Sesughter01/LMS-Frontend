// src/app/api/auth/register/route.ts

// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   const { email, password, firstName, lastName, phoneNumber, location, ageRange, employmentStatus, payWilling, physicalAttendance } = await request.json();

//   // Mock response data
//   const responseData = {
//     id: 15,
//     email: "kiaaa@mailinator.com",
//     isEmailVerified: false,
//     accountType: "TRAINEE",
//     roleId: null,
//     disabled: false,
//     lastLoginAt: "2023-08-25T17:35:22.811270Z",
//     personalProfileId: null,
//     isOnboarded: false,
//     createdAt: "2023-08-25T17:35:22.811270Z",
//     updatedAt: "2023-08-25T17:35:22.811270Z",
//     profile: {
//       id: 6,
//       firstName: "Teko",
//       lastName: "Umoh",
//       gender: null,
//       title: null,
//       isCompleted: false,
//       payWilling: true,
//       physicalAttendance: true,
//       createdAt: "2023-08-25T17:35:23.285897Z",
//       updatedAt: "2023-08-25T17:35:23.285897Z",
//       traineeUserId: 15,
//       addressId: 8,
//       profileDocumentId: null
//     }
//   };

//   return NextResponse.json(responseData, { status: 201 });
// }

// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/shared/types/user';
import { Organization } from '@/shared/types/organization';
import  organizationsMockData  from '@/mock/organisations';
import  usersMockData  from '@/mock/users';

// Mock database
const users = new Map<number, User>();
const organizations = new Map<string, Organization>();

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, phoneNumber, location, ageRange, employmentStatus, payWilling, physicalAttendance } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // const userId = uuidv4();
    // const currentDate = new Date().toISOString();

  // Generate a new numeric user ID based on the number of users in the mock database
  const userId = usersMockData.length + 1;

    const newUser: User = {
      id: userId,
      email,
      password, // In a real application, make sure to hash the password
      profile: {
        firstName,
        lastName,
        avatarImageUrl: ''
      },
      telephone: phoneNumber,
      street: location,
      city: '', // You can split location into street, city, state as needed
      state: '',
      dateOfBirth: '',
      role: 'TRAINEE',
      createdAt:  new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessToken: '', // This can be set upon login
      userProgrammes: null, // Update this based on your data structure
      isEmailVerified:false
    };

    // Simulate saving to a database
    users.set(userId, newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

