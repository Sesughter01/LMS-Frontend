import DashboardService from "@/services/api/dashboard";
import { AdminDashboard } from "@/shared/types/admin";
import { InstructorDashboard } from "@/shared/types/instructor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  adminDashboard: AdminDashboard | null;
  instructorDashboard: InstructorDashboard | null;
  announcements: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DashboardState = {
  adminDashboard: null,
  instructorDashboard: null,
  announcements: [],
  status: "idle",
  error: null,
};

export const getAdminDashboard = createAsyncThunk(
  "dashboard/getAdminDashboard",
  async () => {
    return DashboardService.getAdminDashboard();
  }
);

export const getInstructorDashboard = createAsyncThunk(
  "dashboard/getInstructorDashboard",
  async () => {
    return DashboardService.getInstructorDashboard();
  }
);

export const addAnnouncement = createAsyncThunk(
  "dashboard/addAnnouncement",
  async (payload: any) => {
    return DashboardService.addAnnouncement(payload);
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminDashboard = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(getInstructorDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getInstructorDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.instructorDashboard = action.payload;
      })
      .addCase(getInstructorDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(addAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.announcements.push(action.payload);
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default dashboardSlice.reducer;
