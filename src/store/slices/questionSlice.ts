import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CreateQuestion } from "@/services/api/questions";
import { Question } from "@/shared/types/question";
import { toast } from "react-toastify";

interface QuestionState {
  questions: Question[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: "idle",
  error: null,
};

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (questionData) => {
    // console.log("questionData", questionData)
    const assessmentId = sessionStorage.getItem("assessmentId");
    const assessmentForId = sessionStorage.getItem("selectedCourseId");
    if (!assessmentId) {
      throw new Error("Assessment ID not found in sessionStorage");
    }

    const createdQuestion = await CreateQuestion(
      Number(assessmentId),
      Number(assessmentForId),
      questionData
    );
    //  console.log("questionDatacreatedQuestion", createdQuestion)
    return createdQuestion;
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        console.log("Sending.....");
        state.loading = "pending";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.questions = [action.payload, ...state.questions];
        toast.success("Question created");
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
        toast.error(action.error.message);
      });
  },
});

// Selectors
export const selectQuestions = (state: RootState) => state.question.questions;
export const selectAssessmentLoading = (state: RootState) =>
  state.question.loading;
export const selectAssessmentError = (state: RootState) => state.question.error;

export default questionSlice.reducer;
