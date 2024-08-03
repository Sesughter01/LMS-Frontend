// import { Cohort } from "@/shared/types/cohort";
import { ApiRequestClient } from "@/shared/utils/api-client";

import { Cohort } from "@/shared/types/cohort";
import { cohorts } from "@/mock/cohorts";

export const GetCohortsWithinAProgramme = async (): Promise<Cohort[]> => {
  const response = await ApiRequestClient.get(
    `/api/v1/programmes/${1}/cohorts?isActive=true`
  );
  return response.data;
};

export const GetSingleCohortWithinAProgramme = async (
  id: number
): Promise<Cohort[]> => {
  const response = await ApiRequestClient.get(
    `/api/v1/programmes/1/cohorts/${id}`
  );

  // console.log("cohoert", response)
  return response.data;
};

// export const DeleteSingleCohort = async (id: number): Promise<Cohort[]> => {
//   const response = await ApiRequestClient.delete(
//     `/api/v1/programmes/1/cohorts/${id}`,
//     ""
//   );
//   return response.data;
// };

// export const UpdateSingleCohortStatus = async (
//   id: number,
//   status: string
// ): Promise<Cohort> => {
//   const response = await ApiRequestClient.patch(
//     `/api/v1/programmes/1/cohorts/${id}?status=${status}`,
//     ""
//   );
//   return response.data;
// };

// export const DeleteSingleCourseFromCohort = async (
//   courseId: number,
//   id: number
// ): Promise<Cohort[]> => {
//   const response = await ApiRequestClient.delete(
//     `/api/v1/courses/${courseId}/cohort?cohortId=${id}`,
//     ""
//   );
//   return response.data;
// };



// export const GetCohortsWithinAProgramme = async (programmeId: number): Promise<Cohort[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filteredCohorts = cohorts.filter(cohort => cohort.programmeId === programmeId && cohort.status === "Active");
//       resolve(filteredCohorts);
//     }, 500); // Simulating network latency
//   });
// };

// export const GetSingleCohortWithinAProgramme = async (programmeId: number, id: number): Promise<Cohort | undefined> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const cohort = cohorts.find(cohort => cohort.programmeId === programmeId && cohort.id === id);
//       resolve(cohort);
//     }, 500); // Simulating network latency
//   });
// };

export const DeleteSingleCohort = async (programmeId: number, id: number): Promise<Cohort[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = cohorts.findIndex(cohort => cohort.programmeId === programmeId && cohort.id === id);
      if (index !== -1) {
        cohorts.splice(index, 1);
      }
      resolve(cohorts);
    }, 500); // Simulating network latency
  });
};

export const UpdateSingleCohortStatus = async (programmeId: number, id: number, status: string): Promise<Cohort | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cohort = cohorts.find(cohort => cohort.programmeId === programmeId && cohort.id === id);
      if (cohort) {
        cohort.status = status;
      }
      resolve(cohort);
    }, 500); // Simulating network latency
  });
};

export const DeleteSingleCourseFromCohort = async (courseId: number, cohortId: number): Promise<Cohort[]> => {
  // Assuming there is some course data structure inside cohorts to delete from.
  // This function is just a placeholder, as the structure isn't defined in the prompt.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Logic to remove course from cohort can be added here if course data was available.
      resolve(cohorts);
    }, 500); // Simulating network latency
  });
};
