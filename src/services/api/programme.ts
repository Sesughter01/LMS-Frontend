// import { Programme } from "@/shared/types/programme";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { Programme } from "@/shared/types/programme";
import { programmes, defaultProgramme} from "@/mock/programmes";

// export const GetDefaultProgramme = async (): Promise<Programme> => {
//   const response = await ApiRequestClient.get(`/api/v1/programmes/default`);

//   return response.data;
// };

// export const CreateProgramme = async (programmeData: Programme): Promise<Programme> => {
//   const response = await ApiRequestClient.post("/api/v1/programmes", programmeData);

//   return response.data;
// };

// export const GetAllProgrammes = async (): Promise<Programme> => {
//   const response = await ApiRequestClient.get(`/api/v1/programmes`);
//   console.log("rea:", response);

//   return response.data;
// };


// ADDED BY CHARLES BELOW


export const GetDefaultProgramme = async (): Promise<Programme> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(defaultProgramme);
    }, 500); // Simulating network latency
  });
};

export const CreateProgramme = async (programmeData: Programme): Promise<Programme> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProgramme = { ...programmeData, id: programmes.length + 1 };
      programmes.push(newProgramme);
      resolve(newProgramme);
    }, 500); // Simulating network latency
  });
};

export const GetAllProgrammes = async (): Promise<Programme[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(programmes);
    }, 500); // Simulating network latency
  });
};
