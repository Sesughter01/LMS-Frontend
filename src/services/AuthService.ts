import axios from "axios";
import { setCookie } from 'cookies-next';
import { ApiRequestClient } from "@/shared/utils/api-client";
import ApiRoutes from "./ApiRoutes";
import axiosInstance, { baseURL } from "@/shared/utils/axios.instance";
import usersMockData from '@/mock/users'; // Import mock organization data

// src/mock/users.ts
import { User } from "@/shared/types/user";

import { v4 as uuidv4 } from 'uuid';

// export let usersMockData: User[] = [];

export const addUserToMockData = (user: User) => {
  usersMockData.push(user);
};

export const _saveToken = (token: any) => {
  localStorage.setItem("token", token);
};

export const _getUserToken = () => {
  return localStorage.getItem("token");
};

export const _getOrgId = () => {
  return sessionStorage.getItem("orgId");
};

// Helper function to find user by email
const findUserByEmail = (email: string): User | undefined => {

  console.log("INPUT EMAILL: ",email);
  console.log("USER MOCK_DATA: ",JSON.stringify(usersMockData));
  return usersMockData.find(user => user.email === email);
};

export const login = async (email: string, password: string) => {
  try {
    const response = await ApiRequestClient.post(ApiRoutes.LOGIN, {
      email,
      password,
    },
   
   
  );

    setCookie('account_type', `${response.data.accountType}`);
    setCookie('token', `${response.data.accessToken}`);

    _saveToken(response.data.accessToken);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const register = async (payload: any) => {
  try {
    const response = await ApiRequestClient.post(`/api/v1/auth/registrations`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};



// NEW REGISTER SERVICE FROM CHARLES STARTS
export const register2 = async (payload: any) => {
  try {
    const response = await axios.post('/api/auth/register', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// NEW REGISTER SERVICE FROM CHARLES ENDS 

// NEW MOCK REGISTER SERVICE FROM CHARLES START

export const mockRegisterFunction = async (payload: any): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const existingUser = usersMockData.find(user => user.email === payload.email);

    if (existingUser) {
      return reject(new Error("User with this email already exists"));
    }

    const newUser: User = {
      id: usersMockData.length + 1, // Generating a unique numeric ID
      email: payload.email,
      password: payload.password, // In real applications, passwords should be hashed
      profile: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatarImageUrl: "",
      },
      telephone: payload.phoneNumber,
      street: payload.location,
      city: "",
      state: "",
      dateOfBirth: "",
      role: "TRAINEE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessToken: `mockToken-${uuidv4()}`,
      userProgrammes: [],
      isEmailVerified: false, // Initially not verified
    };

    addUserToMockData(newUser);
    resolve(newUser);
  });
};

// NEW MOCK REGISTER SERVICE FROM CHARLES END





// NEW MOCK LOGIN SERVICE FROM CHARLES START
export const mockLoginFunction = async (email: string, password: string) => {
  return new Promise<User>((resolve, reject) => {
    const user = findUserByEmail(email);
    console.log("FIND USER: ", user);
    if (!user) {
      return reject(new Error("User not found"));
    }

    if (user.password !== password) {
      return reject(new Error("Invalid password"));
    }

    // Simulate token generation
    const token = `mockToken-${user.id}`;

    // Return the user data along with the token
    const userData = {
      ...user,
      accessToken: token,
    };

    resolve(userData);
  });
};
export const mockLoginFunction2 = (email: string, password: string) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      const user = findUserByEmail(email);
      console.log("FIND USER: ", user);
      if (!user) {
        return reject(new Error("User not found"));
      }
  
      if (user.password !== password) {
        return reject(new Error("Invalid password"));
      }
  
      // Simulate token generation
      const token = `mockToken-${user.id}`;
  
      // Return the user data along with the token
      const userData = {
        ...user,
        accessToken: token,
      };
  
      resolve(userData);;
    }, 3000); // Simulates a 3-second delay
  });
};


// NEW MOCK LOGIN SERVICE FROM CHARLES END


export const verifyEmail = async (token: any, email: any) => {
  try {
    const response = await ApiRequestClient.post(`/api/v1/auth/tokens/validate?for=verify`, {
      token,
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const resendEmail = async (email: any) => {
  try {
    const response = await ApiRequestClient.post(`/api/v1/auth/tokens/resend?for=verify`, {
      email: email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const initiatePasswordReset = async (email: string) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/auth/password/reset`, {
      email: email,
      // password: password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const setNewPassword = async (password: string, token: any) => {
  try {
    const response = await ApiRequestClient.put(`/api/v1/auth/password/reset`, {
      newPassword: password,
      token,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const setInvitePassword = async (email: string, password: string) => {
  try {
    const response = await ApiRequestClient.post(ApiRoutes.SETPASSWORD, {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};


// MOCK VERIFY AND RESEND FUNCTIONS 

// src/services/api/AuthService.ts

export const mockVerifyEmail = async (token: string, email: string) => {
  const user = usersMockData.find(user => user.email === email && user.accessToken === token);

  if (!user) {
    throw new Error('Invalid token or email');
  }

  user.isEmailVerified = true;
  return user;
};

export const mockResendEmail = async (email: string) => {
  const user = usersMockData.find(user => user.email === email);

  if (!user) {
    throw new Error('Email not found');
  }

  // Simulate resending email by returning user details
  return user;
};
