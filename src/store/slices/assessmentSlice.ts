import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Update the path accordingly
import { Assessment } from "@/shared/types/assessment";
import {
  CreateAssessment,
  GetAllAssessment,
  GetAssessmentById,
  GetAssessmentQuestions,
  GetSingleAssessment,
} from "@/services/api/assessments";
import { RootState } from "../store";
import { Question } from "@/shared/types/question";
import { toast } from "react-toastify";

interface AssessmentState {
  assessments: Assessment[];
  questions: Question[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AssessmentState = {
  assessments: [],
  questions: [],
  loading: "idle",
  error: null,
};

// Async thunk for creating a new assessment
export const createAssessment = createAsyncThunk(
  "assessment/createAssessment",
  async (storedData) => {
    try {
      console.log("Creating assessment with data:", storedData);
      const response = await CreateAssessment(storedData);
      console.log("Response from CreateAssessment:", response);
      return response;
    } catch (err: any) {
      // console.error("Error creating assessment:", err);
      if (err.response && err.response.status === 400) {
        const errorKey = Object.keys(err.response.data)[0];
        let errStr = `${errorKey.toUpperCase()}: ${
          err.response.data[errorKey]
        }`;

        toast.error(errStr);
      }

      throw err;
    }
  }
);

export const getAllAssessments = createAsyncThunk(
  "assessment/getAllAssessments",
  async (organizationId) => {
    try {
      const response = await GetAllAssessment(organizationId);
      return response;
    } catch (error) {
      console.error("Error getting assessment list:", error);
      throw error;
    }
  }
);

export const getAssessmentQuestions = createAsyncThunk(
  "assessment/getAssessmentQuestions",
  async (assessmentId) => {
    try {
      const response = await GetAssessmentQuestions(assessmentId);
      return response;
    } catch (error) {
      console.error("Error getting assessment questions:", error);
      throw error;
    }
  }
);

export const getSingleAssessment = createAsyncThunk(
  "assessment/getSingleAssessment",
  async () => {
    try {
      const response = await GetSingleAssessment();
      return response;
    } catch (error) {
      console.error("Error getting single assessment:", error);
      throw error;
    }
  }
);

export const getAssessmentById = createAsyncThunk(
  "assessment/getAssessmentById",
  async (id: any) => {
    try {
      const response = await GetAssessmentById(id);
      return response;
    } catch (error) {
      console.error("Error getting single assessment:", error);
      throw error;
    }
  }
);

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAssessment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.assessments = action.payload;
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
        console.log("action(((((((((((", action);
        toast.error(action.error.message);
      })
      .addCase(getAssessmentQuestions.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAssessmentQuestions.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.questions = action.payload;
      })
      .addCase(getAssessmentQuestions.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(getAllAssessments.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllAssessments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.assessments = action.payload;
      })
      .addCase(getAllAssessments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })

      .addCase(getSingleAssessment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSingleAssessment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.assessments = [action.payload];
      })
      .addCase(getSingleAssessment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })

      .addCase(getAssessmentById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAssessmentById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.assessments = [action.payload];
      })
      .addCase(getAssessmentById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectAssessments = (state: RootState) =>
  state.assessment.assessments;
export const selectAssessmentLoading = (state: RootState) =>
  state.assessment.loading;
export const selectAssessmentError = (state: RootState) =>
  state.assessment.error;

export default assessmentSlice.reducer;
