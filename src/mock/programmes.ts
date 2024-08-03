// src/mock/programmes.ts

import { Programme } from "@/shared/types/programme";


export const defaultProgramme: Programme = {
  id: 1,
  programmeName: "Default Programme",
  programmeDescription: "This is the default programme description.",
  createdByCategory: "Admin",
  isDefault: true,
  createdAt: new Date().toISOString()
};

export const programmes: Programme[] = [
  {
    id: 1,
    programmeName: "Full Stack Web Development",
    programmeDescription: "Learn to build dynamic and responsive websites using the latest technologies.",
    createdByCategory: "Technology",
    isDefault: true,
    createdAt: "2022-01-01T00:00:00Z",
  },
  {
    id: 2,
    programmeName: "Data Science and Analytics",
    programmeDescription: "Master data analysis, visualization, and machine learning techniques.",
    createdByCategory: "Data Science",
    isDefault: false,
    createdAt: "2022-03-15T00:00:00Z",
  },
  {
    id: 3,
    programmeName: "Cybersecurity",
    programmeDescription: "Learn the skills to protect systems and networks from cyber threats.",
    createdByCategory: "Security",
    isDefault: false,
    createdAt: "2022-05-20T00:00:00Z",
  },
  {
    id: 4,
    programmeName: "Digital Marketing",
    programmeDescription: "Develop strategies for effective online marketing and social media engagement.",
    createdByCategory: "Marketing",
    isDefault: true,
    createdAt: "2022-07-30T00:00:00Z",
  },
  {
    id: 5,
    programmeName: "Project Management",
    programmeDescription: "Gain expertise in managing projects efficiently and effectively.",
    createdByCategory: "Management",
    isDefault: false,
    createdAt: "2022-09-10T00:00:00Z",
  },
  {
    id: 6,
    programmeName: "AI and Machine Learning",
    programmeDescription: "Explore the world of artificial intelligence and machine learning.",
    createdByCategory: "Artificial Intelligence",
    isDefault: true,
    createdAt: "2022-11-05T00:00:00Z",
  },
];
