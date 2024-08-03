import { User } from "@/shared/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/services/api/user";
import { toast } from "react-toastify";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registrationForm: {} | null;
}

// interface UserProfile {
//   avatarImageUrl: string;
//   name: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   mobile: string;
//   dob: string;
//   idNumber: string;
// }


const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  registrationForm: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    ageRange: "",
    employmentStatus: "",
    // payWilling: "",
    physicalAttendance: "",
    password: "",
    // learnAboutUsFrom: "",
    country: "",
    city: "",
    gender: "",

    // preferredCohort: 0,
    preferredCourse: 0,
  },
};

// export const sampleThunk = createAsyncThunk(
//   "walletWithdrawal/getWithdrawalRoutes",
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await sampleService(params);
//       return response.data.data;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );


export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: any, { dispatch }) => {
    try {
      const data = await userService.updateUser(
        payload.traineeId,
        payload.data
      );
      // console.log("fdfdfdfd", data)
      // dispatch(setUser(data));
      return data;
    } catch (err: any) {
      // console.log("errr", err)
      if (err.response && err.response.status === 400) {
        const errorKey = Object.keys(err.response.data)[0];
        let errStr = `${errorKey.toUpperCase()}: ${
          err.response.data[errorKey]
        }`;

        toast.error(errStr);
      } else {
        toast.error(err.message || "An error occurred");
      }
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      (state.isAuthenticated = true), //!!action.payload;
        (state.registrationForm = initialState.registrationForm);
    },
    clearUser: (state) => {
      console.log("clearing user")
      state = initialState;
    },
    // logoutUser: () => {},
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.registrationForm = initialState.registrationForm;
    },
    setRegistrationForm: (state, action: PayloadAction<Object | null>) => {
      if (action.payload) {
        state.registrationForm = action.payload;
      } else {
        state.registrationForm = initialState.registrationForm;
      }
    },

    updateUserProfile(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateUserAvatar(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profile.avatarImageUrl = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(sampleThunk.pending, (state) => {});
    // builder.addCase(sampleThunk.fulfilled, (state, { payload }) => {
    // });
    // builder.addCase(sampleThunk.rejected, (state, { payload }) => {
    // });
  },
});

export const { setUser, clearUser, logoutUser, setRegistrationForm,updateUserProfile, updateUserAvatar } =
  authSlice.actions;

export const selectUser = (state: { auth: AuthState }): User | null =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }): boolean =>
  state.auth.isAuthenticated;

export const selectRegistrationForm = (state: { auth: AuthState }): any => {
  return state.auth.registrationForm;
};

export default authSlice.reducer;
