// formSlice.js
import { GetCohortsWithinAProgramme, GetSingleCohortWithinAProgramme } from "@/services/api/cohort";
import { Cohort } from "@/shared/types/cohort";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCohorts: any = createAsyncThunk(
  "courses/fetchAllCohorts",
  async () => {
    const cohorts = await GetCohortsWithinAProgramme();
    return cohorts;
  }
);

export const fetchACohortsById: any = createAsyncThunk(
  "courses/fetchSingleCohorts",
  async (id: number) => {
    const cohort = await GetSingleCohortWithinAProgramme(id);
    return cohort;
  }
);

interface CourseState {
  allCohorts: Cohort[];
  singleCohort: Cohort[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  formData: any;
  // formData: {} | null;
}

const initialState: CourseState = {
  allCohorts: [],
  singleCohort: [],
  status: "idle",
  error: null,
  formData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    resetForm: (state) => {
      state.formData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCohorts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCohorts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCohorts = action.payload;
      })
      .addCase(fetchAllCohorts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchACohortsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchACohortsById.fulfilled, (state, {payload}) => {
        state.status = "succeeded";
        state.singleCohort = payload;
      })
      .addCase(fetchACohortsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
