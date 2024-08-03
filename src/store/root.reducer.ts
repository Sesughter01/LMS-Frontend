import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import programmeReducer from "../store/slices/programmeSlice";
import assessmentAttemptReducer from "../store/slices/assessmentAttemptSlice";
import coursesReducer from "../store/slices/coursesSlice";
import userReducer from "../store/slices/userSlice";
import formReducer from "../store/slices/cohortFormData";
import instructorReducer from "../store/slices/instructorFormData";
import assessmentSlice from "./slices/assessmentSlice";
import questionSlice from "./slices/questionSlice";
import studentSlice from "./slices/studentSlice";
import adminSlice from "./slices/adminSlice";
import dashboardSlice from "./slices/dashboardSlice";
import onboardingSlice from "./slices/onboardingSlice";
import organizationSlice from "./slices/organizationSlice";
import programmeMain from "./slices/programmeMain";
import modalReducer from './slices/modalSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  programme: programmeReducer,
  assessmentAttempt: assessmentAttemptReducer,
  courses: coursesReducer,
  form: formReducer,
  instructor: instructorReducer,
  assessment: assessmentSlice,
  question: questionSlice,
  student: studentSlice,
  admin: adminSlice,
  dashboard: dashboardSlice,
  onboarding: onboardingSlice,
  organizations: organizationSlice,
  programmeMain: programmeMain,
  modal:modalReducer
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logoutUser") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
