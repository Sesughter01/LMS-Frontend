// organizationSlice.js
import OrganizationService from "@/services/api/organization";
import { Organization } from "@/shared/types/organization";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createNewOrganization: any = createAsyncThunk("organizations/createNewOrganization", async (organizationData: any) => {
  const newOrganization = await OrganizationService.createOrganization(organizationData);
  return newOrganization;
});

export const fetchAllOrganizations: any = createAsyncThunk("organizations/fetchAllOrganizations", async () => {
  const organizations = await OrganizationService.getOrganizations();
  return organizations;
});

interface OrganizationState {
  allOrganizations: Organization[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrganizationState = {
  allOrganizations: [],
  status: "idle",
  error: null,
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allOrganizations = [...state.allOrganizations, action.payload];
        toast.success("organization created");
      })
      .addCase(createNewOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
        toast.error("organization with this email already exists.");
      })
      .addCase(fetchAllOrganizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allOrganizations = action.payload;
      })
      .addCase(fetchAllOrganizations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default organizationSlice.reducer;
