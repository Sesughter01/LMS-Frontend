import { Assessment } from "@/shared/types/assessment";
import { AssessmentAttempt } from "@/shared/types/assessmentattempt";
import { QuestionAnswer } from "@/shared/types/questionanswer";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { baseURL } from "@/shared/utils/axios.instance";
import axios from "axios";
import { _getUserToken } from "../AuthService";
import { getCookie } from 'cookies-next';
import { UserTypes } from "@/lib/constants";

export const GetPreAssessmentForACohort = async (
  cohortId: any,
  organizationId: any
) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/cohorts/${cohortId}/preassessment`,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetPreAssessmentForACourse = async (
  courseId: number,
  organizationId: any
) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/courses/${courseId}/preassessment`,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetTraineePreAssessmentById = async (
  assessmentId: number,
  organizationId: any
) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/assessments/${assessmentId}`,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const StartAssessment = async (
  assessmentId: number,
  category: string,
  categoryId: number,
  traineeUserId: number,
  organizationId: any
): Promise<Assessment> => {
  try {
    let morePayload = { traineeId: traineeUserId } as any;

    if (category && category.toLocaleLowerCase().trim() === "cohort") {
      morePayload["cohortId"] = categoryId;
    }
    if (category && category.toLocaleLowerCase().trim() === "course") {
      morePayload["courseId"] = categoryId;
    }

    const response = await axios.post(
      `${baseURL}/api/v1/assessments/${assessmentId}/start`,
      morePayload,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const CompleteAssessment = async (
  assessmentId: number,
  questionAnswers: QuestionAnswer[],
  category: string,
  categoryId: number,
  traineeUserId: number | any,
  organizationId: any
) => {
  try {
    let morePayload = { traineeId: traineeUserId } as any;

    if (category && category.toLocaleLowerCase().trim() === "cohort") {
      morePayload["cohortId"] = categoryId;
    }
    if (category && category.toLocaleLowerCase().trim() === "course") {
      morePayload["courseId"] = categoryId;
    }
    const response = await axios.post(
      `${baseURL}/api/v1/assessments/${assessmentId}/complete`,
      { questionAnswers: questionAnswers, ...morePayload },
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetTraineeLatestAssessmentAttempt = async (
  assessmentId: number,
  organizationId: any
) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/assessments/${assessmentId}/attempts/last`,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetAllAccessmentList = async (organizationId: any) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/courses/1/assessments`,
      {
        headers: {
          Authorization: `Bearer ${_getUserToken()}`,
          Accept: "application/json",
          "Content-type": "application/json",
          organization: organizationId,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetAllAssessment = async (organizationId: any) => {
  try {
    let url = `${baseURL}/api/v1/assessments`
    const account_type = getCookie("account_type")

    if (account_type === UserTypes.INSTRUCTOR) {
      url += "?query_with=instructor";
    }
    // console.log("onlyInstructrs: true",url, account_type )

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${_getUserToken()}`,
        Accept: "application/json",
        "Content-type": "application/json",
        organization: organizationId,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const CreateAssessment = async (storedData: any) => {
  try {
    // console.log("storedDatassss", storedData)
    const response = await ApiRequestClient.post(
      "/api/v1/courses/1/assessments",
      storedData
    );

    // console.log("responseweeeee", response)

    sessionStorage.setItem("assessmentId", response.data.id);
    return response.data;
  } catch (err) {
    console.error("Error creating assessment:", err);
    throw err;
  }
};

export const GetAssessmentById = async (id: number) => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/courses/1/assessments/${id}`
    );
    console.log("single assessment:", response);
    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetAssessmentQuestions = async (assessmentId: any) => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/courses/1/assessments/${assessmentId}/questions`
    );
    console.log("questionResponse:", response);
    console.log(assessmentId);
    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetAssessmentQuestionsById = async (assessmentId: any) => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/courses/1/assessments/${assessmentId}/admins-questions`
    );
    console.log("questionResponse:", response);
    console.log(assessmentId);
    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetAssessmentStats = async (id: number) => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/assessments/${id}/stats`
    );
    console.log("statResponse:", response);

    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetCohortStats = async (id: any) => {
  try {
    const response = await ApiRequestClient.get(`/api/v1/cohorts/${id}/stats`);
    console.log("cohortDtatResponse:", response);

    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetSingleQuestion = async (id: number): Promise<Assessment[]> => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/courses/1/assessments/${id}/questions`
    );
    console.log("single assessment:", response);
    return response.data;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

export const GetTraineeAssessments = async (
  traineeUserId: number
): Promise<Assessment[]> => {
  try {
    const response = await ApiRequestClient.get(
      `/api/v1/trainees/${traineeUserId}/assessments`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Update the assessment service file

// ...

export const GetSingleAssessment = async () => {
  try {
    const selectedCohortId = sessionStorage.getItem("selectedCohortId");
    const selectedCourseId = sessionStorage.getItem("selectedCourseId");

    if (selectedCohortId) {
      const response = await ApiRequestClient.get(
        `/api/v1/cohorts/1/assessments/${selectedCohortId}`
      );
      return response.data;
    } else if (selectedCourseId) {
      const response = await ApiRequestClient.get(
        `/api/v1/courses/1/assessments/${selectedCourseId}`
      );
      return response.data;
    } else {
      throw new Error(
        "No selected cohortId or courseId found in sessionStorage"
      );
    }
  } catch (err) {
    throw err;
  }
};

// ...

// export const GetPreAssessmentForACohort = async (
//   cohortId: number
// ): Promise<Assessment> => {
//   const response = await ApiRequestClient.get(
//     `/api/v1/cohorts/${cohortId}/preassessment`
//   );
//   return response.data;
// };

// export const GetTraineeLatestAssessmentAttempt = async (
//   assessmentId: number
// ): Promise<AssessmentAttempt> => {
//   const response = await ApiRequestClient.get(
//     `api/v1/assessments/${assessmentId}/attempts/last`
//   );
//   return response.data;
// };
