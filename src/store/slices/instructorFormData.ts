// formSlice.js
import { Instructor } from "@/shared/types/instructor";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instructorService from "@/services/api/instructors";

export const fetchAllInstructors: any = createAsyncThunk("instructors/fetchAllInstructors", async () => {
  const instructors = await instructorService.GetAllInstructors();
  return instructors;
});

interface InstructorState {
  allInstructors: Instructor[];
  instructorForm: {} | null;
  superForm: {} | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InstructorState = {
  allInstructors: [],
  status: "idle",
  error: null,
  instructorForm: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  },
  superForm: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    organization: "",
  },
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    clearInstructorUser: (state) => {
      state.instructorForm = initialState.instructorForm;
    },
    setInstructorForm: (state, action: PayloadAction<Object | null>) => {
      if (action.payload) {
        state.instructorForm = action.payload;
      } else {
        state.instructorForm = initialState.instructorForm;
      }
    },

    clearSuperUser: (state) => {
      state.superForm = initialState.superForm;
    },
    setSuperForm: (state, action: PayloadAction<Object | null>) => {
      if (action.payload) {
        state.superForm = action.payload;
      } else {
        state.superForm = initialState.superForm;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInstructors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllInstructors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allInstructors = action.payload;
      })
      .addCase(fetchAllInstructors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { clearInstructorUser, setInstructorForm, clearSuperUser, setSuperForm } = instructorSlice.actions;

export const selectInstructorRegistrationForm = (state: { instructor: InstructorState }): any => {
  return state.instructor.instructorForm;
};

export const selectSuperRegistrationForm = (state: { instructor: InstructorState }): any => {
  return state.instructor.superForm;
};

export default instructorSlice.reducer;
