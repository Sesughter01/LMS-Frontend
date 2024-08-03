import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/shared/types/course";
import courseService from "@/services/api/courses";
import instructorService from "@/services/api/instructors";
import { Module } from "@/shared/types/module";
import { GetDefaultProgramme } from "@/services/api/programme";

// Define an async thunk for fetching all courses
export const fetchAllCourses: any = createAsyncThunk("courses/fetchAllCourses", async () => {
  let programme = await GetDefaultProgramme();
  const courses = await courseService.GetAllAvailableCoursesInProgramme(programme.id);

  // console.log("courseswwwwwwwwwwwwwwwwwwww", courses)
  // return courses.results;
  return courses
});

export const fetchASingleCourseDetails: any = createAsyncThunk("courses/fetchASingleCourseDetails", async (id: number) => {
  const course = await courseService.GetIndividualCourseDetails(id);
  return course;
});

export const fetchAllCoursesByCohort: any = createAsyncThunk("courses/fetchAllCoursesByCohort", async (cohortId: any) => {
  const courses = await courseService.GetAllAvailableCoursesInCohort(cohortId);
  // console.log("cococococococ", courses)
  return courses?.results;
});

export const fetchAllCoursesByAInstructor: any = createAsyncThunk("courses/fetchAllCoursesByAInstructor", async (id: number) => {
  const courses = await instructorService.GetInstructorCourses(id);
  return courses;
});

export const fetchModule = createAsyncThunk("courses/fetchModule", async (courseId: number) => {
  const modules = await courseService.GetModule(courseId);
  return modules;
});

export const fetchAllCourseStudent: any = createAsyncThunk("courses/fetchAllCourseStudent", async (id: number) => {
  const students = await courseService.GetAllStudentInCourse(id);
  return students;
});

interface CourseState {
  allCourses: Course[];
  allCoursesByCohort: Course[];
  singleCourse: any;
  instructorCourses: any;
  courseModules: Module[];
  studentsInCourse: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  createCourse: {} | null;
  fetchASingleCourseDetailsError: null | any;
  coursesTotal: number
}

const initialState: CourseState = {
  allCourses: [],
  allCoursesByCohort: [],
  singleCourse: [],
  instructorCourses: [],
  courseModules: [],
  studentsInCourse: [],
  status: "idle",
  error: null,
  coursesTotal: 0,
  fetchASingleCourseDetailsError: null,
  /* createCourse: {
    courseTitle: "",
    courseDescription: "",
    coursePrice: "",
    courseDiscount: "",
    courseStartDate: "",
    courseEndDate: "",
    courseProfileImageReferenceId: "",
    courseListingImageReferenceId: "",
    courseThumbnailImageReferenceId: "",
    instructors: [],
    location: {
      description: "",
      physicalClassAddress:"",
      physicalClassAddressLink: "",
      virtualAddressLink: ""
    },
    overview: {
      about: "",
      syllabus: "",
      learn: "",
      FAQ: []
    },
    modules: []
  }, */
  createCourse: {
    courseTitle: "", // Course title string
    courseDescription: "", // Course description string
    coursePrice: 0, // Course price (number)
    courseDiscount: 0, // Course discount (number)
    status: "published", // Course status ("published" or "draft")
    instructors: [], // Array of instructor IDs (numbers)
    location: {
      description: "", // Location description string
      physicalClassAddress: "", // Physical class address string
      physicalClassAddressLink: "", // Physical class address link string
      virtualAddressLink: "", // Virtual address link string
    },
    overview: {
      about: "", // Overview about string
      syllabus: "", // Overview syllabus string
      learn: "", // Overview learn string
      FAQ: [
        {
          question: "", // FAQ question string
          answer: "", // FAQ answer string
        },
      ],
    },
    modules: [
      {
        moduleTitle: "", // Module title string
        moduleDescription: "", // Module description string
        moduleSequencePosition: 0, // Module sequence position (number)
        lessons: [
          {
            contentTitle: "", // Lesson content title string
            contentDescription: "", // Lesson content description string
            contentUrl: "", // Lesson content URL string
            contentDuration: 0, // Lesson content duration (number)
            contentType: "", // Lesson content type ("DOCUMENT", "VIDEO", "LINK")
          },
        ],
      },
    ],
  },
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    clearCourseForm: (state) => {
      state.createCourse = initialState.createCourse;
    },
    setCourseCreationForm: (state, action: PayloadAction<Object | null>) => {
      /* if (action.payload) {
        state.createCourse = action.payload;
      } else {
        state.createCourse = initialState.createCourse;
      } */
      state.createCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCourses = action.payload.results;
        state.coursesTotal = action.payload.total
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })

      .addCase(fetchModule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchModule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseModules = action.payload;
      })
      .addCase(fetchModule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })

      .addCase(fetchAllCoursesByCohort.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCoursesByCohort.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCoursesByCohort = action.payload;
      })
      .addCase(fetchAllCoursesByCohort.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchASingleCourseDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleCourse = action.payload;
      })
      .addCase(fetchASingleCourseDetails.rejected, (state, action) => {
        state.fetchASingleCourseDetailsError = action.error
      })
      .addCase(fetchAllCoursesByAInstructor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.instructorCourses = action.payload;
      })
      .addCase(fetchAllCourseStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsInCourse = action.payload;
      });
  },
});

export const { updateCourses, clearCourseForm, setCourseCreationForm } = courseSlice.actions;
export const selectCourseForm = (state: { courses: CourseState }): any => {
  return state.courses.createCourse;
};

export default courseSlice.reducer;
