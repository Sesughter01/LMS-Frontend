import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Programme } from "@/shared/types/programme";
import { CreateProgramme, GetAllProgrammes } from "@/services/api/programme";
import programmeService from "@/services/api/programmeMain";
import { toast } from "react-toastify";

interface ProgrammeMainState {
  allProgrammes: Programme[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProgrammeMainState = {
  allProgrammes: [],
  status: "idle",
  error: null,
};

// Create async thunk for getting all programmes
export const getAllProgrammesAsync = createAsyncThunk("programmes/getAllProgrammes", async () => {
  const response = await programmeService.getProgrammes();
  return response;
});

// Create async thunk for creating a programme
export const createProgrammeAsync = createAsyncThunk("programmes/createProgramme", async (programmeData: any) => {
  const response = await programmeService.createProgramme(programmeData);
  return response;
});

// Create the programmeMainSlice
const programmeMainSlice = createSlice({
  name: "programmeMain",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      .addCase(createProgrammeAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(createProgrammeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.allProgrammes.push(action.payload);
        state.allProgrammes = [...state.allProgrammes, action.payload];
        toast.success("organization created");
      })

      .addCase(createProgrammeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
        toast.error("Organization is already associated with a programme.");
      })

      .addCase(getAllProgrammesAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getAllProgrammesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProgrammes = action.payload;
      })

      .addCase(getAllProgrammesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      }),
});

export default programmeMainSlice.reducer;
