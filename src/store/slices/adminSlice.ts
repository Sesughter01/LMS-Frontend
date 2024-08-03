import { Admin } from "@/shared/types/admin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "@/services/api/admins";

export const fetchAllAdmins: any = createAsyncThunk("admin/fetchAllAdmins", async () => {
  const admins = await adminService.GetAllAdmins();
  return admins;
});

export const fetchAllAdminsBySuper: any = createAsyncThunk("admin/fetchAllAdminsBySuper", async () => {
  const admins = await adminService.GetAllAdminsBySuper();
  return admins;
});

interface AdminState {
  allAdmins: Admin[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  allAdmins: [],
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAdmins = action.payload;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })

      .addCase(fetchAllAdminsBySuper.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAdminsBySuper.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAdmins = action.payload;
      })
      .addCase(fetchAllAdminsBySuper.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

// export const { setFormData, resetForm } = studentSlice.actions;
export default adminSlice.reducer;
