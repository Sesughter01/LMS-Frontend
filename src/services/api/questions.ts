import { ApiRequestClient } from "@/shared/utils/api-client";

export const CreateQuestion = async (
  assessmentId: number,
  assessmentForId: number,
  questionData: any
) => {
  try {
    const response = await ApiRequestClient.post(
      `api/v1/courses/${assessmentForId}/assessments/${assessmentId}/questions`,
      questionData
    );
    console.log("response:", response);
    return response.data;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
};
