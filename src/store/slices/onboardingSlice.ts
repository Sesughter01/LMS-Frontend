// onboardingSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OnboardingService from "@/services/api/onboarding";
import { setUser } from "./authSlice";
import { toast } from "react-toastify";

interface OnboardingState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OnboardingState = {
  status: "idle",
  error: null,
};

export const updateSingleTrainee = createAsyncThunk(
  "onboarding/updateSingleTrainee",
  async (payload: any, { dispatch }) => {
    try {
      const data = await OnboardingService.updateSingleTrainee(
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

export const createTraineeAddress = createAsyncThunk(
  "onboarding/createTraineeAddress",
  async (payload: any) => {
    try {
      const data = await OnboardingService.createTraineeAddress(
        payload.traineeId,
        payload.data
      );
      // console.log(data)
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

export const createTraineeEducation = createAsyncThunk(
  "onboarding/createTraineeEducation",
  async (payload: any) => {
    try {
      const data = await OnboardingService.createTraineeEducation(
        payload.traineeId,
        payload.data
      );
      // console.log('dataeducatrion', data)
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
      throw err
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSingleTrainee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSingleTrainee.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateSingleTrainee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(createTraineeAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTraineeAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createTraineeAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
        // console.log("actionnn", action)
      })
      .addCase(createTraineeEducation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTraineeEducation.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createTraineeEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default onboardingSlice.reducer;
