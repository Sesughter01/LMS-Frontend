// studentSlice.js
import studentService from "@/services/api/students";
import { Student, StudentAssessment } from "@/shared/types/student";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllStudents: any = createAsyncThunk(
  "students/fetchAllStudents",
  async () => {
    const students = await studentService.GetAllUsers();
    return students;
  }
);

export const fetchAStudentById: any = createAsyncThunk(
  "students/fetchAStudentById",
  async (id: number) => {
    const student = await studentService.GetUsersById(id);
    // console.log("student999999999999999", student)
    return student;
  }
);

export const fetchAStudentAssessmentDetails: any = createAsyncThunk(
    "students/fetchAStudentAssessmentDetails",
    async (id: number) => {
      const studentAssessmentDetails = await studentService.getStudentAssessmentDetails(id);
      return studentAssessmentDetails;
    }
);

export const FetchStudentAssessmentProgress: any = createAsyncThunk(
  "students/FetchStudentAssessmentProgress",
  async (id: number) => {
    const studentAssessmentProgress = await studentService.GetStudentAssessmentProgress(id);
    return studentAssessmentProgress;
  }
);
interface StudentState {
  allStudents: Student[];
  singleStudent: any;
  studentAssessmentDetails: StudentAssessment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  formData: any;
  studentAssessmentProgress: any;
}

const initialState: StudentState = {
  allStudents: [],
  singleStudent: null,
  studentAssessmentDetails: [],
  status: "idle",
  error: null,
  formData: null,
  studentAssessmentProgress: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    resetForm: (state) => {
      state.formData = null;
    },
   setEducation: (state, action: any) => {
     if(state.singleStudent?.education?.length){
       state.singleStudent.education.push(action.payload)
     }else{
       state.singleStudent.education = []
       state.singleStudent.education.push(action.payload)
     }
   },
   setAddress: (state, action: any) => {
     state.singleStudent.address = action.payload
   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allStudents = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchAStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAStudentById.fulfilled, (state, {payload}) => {
        state.status = "succeeded";
        state.singleStudent = payload;
      })
      .addCase(fetchAStudentById.rejected, (state, action) => {
        state.status = "failed";
        if(!state.singleStudent){
          state.singleStudent = {}
        }
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchAStudentAssessmentDetails.fulfilled, (state, {payload}) => {
        state.status = "succeeded";
        state.studentAssessmentDetails = payload;
      })
      .addCase(FetchStudentAssessmentProgress.fulfilled, (state, {payload}) => {
        state.status = "succeeded";
        state.studentAssessmentProgress = payload;
      });
  },
});

export const { setFormData, resetForm, setAddress, setEducation } = studentSlice.actions;
export default studentSlice.reducer;
