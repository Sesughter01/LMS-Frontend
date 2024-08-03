// src/mock/organizations.ts
import { Organization } from "@/shared/types/organization";

const organizationsMockData: Organization[] = [
  {
    id: 1,
    organizationName: "Ingryd",
    email: "ingryd@ingryd.com",
    phoneNumber: "08012345678",
    colorScheme: "#336699",
    logo: "https://s3.eu-west-1.wasabisys.com/crunchies/1703597222.593015GBlo6HuXoAAfwes.jpeg",
    subDomain: "ingryd",
    createdAt: "2023-12-26T13:22:21.456042Z",
    // updatedAt: "2023-12-26T13:44:31.084242Z",
    is_active: true
  },
  {
    id: 2,
    organizationName: "LSETF",
    email: "lsetf@ingryd.com",
    phoneNumber: "08012345678",
    colorScheme: "#336699",
    logo: "https://example.com/logo.png",
    subDomain: "lsetf",
    createdAt: "2023-12-27T19:25:49.446322Z",
    // updatedAt: "2023-12-27T19:25:49.446322Z",
    is_active: true
  },
  {
    id: 3,
    organizationName: "UNICEF",
    email: "unicef@ingryd.com",
    phoneNumber: "08012345679",
    colorScheme: "#336699",
    logo: "https://example.com/logo.png",
    subDomain: "unicef",
    createdAt: "2023-12-27T19:40:26.818524Z",
    // updatedAt: "2023-12-27T19:40:26.818524Z",
    is_active: true
  },
  {
    id: 4,
    organizationName: "Ingryd",
    email: "charles.avul@gmail.com",
    phoneNumber: "07034955363",
    colorScheme: "#336699",
    // logo: "https://s3.eu-west-1.wasabisys.com/crunchies/1703597222.593015GBlo6HuXoAAfwes.jpeg",
    logo: "https://i.ibb.co/v11Bscx/ingryd-logo2.png",
    subDomain: "ingryd",
    createdAt: "2023-12-26T13:22:21.456042Z",
    // updatedAt: "2023-12-26T13:44:31.084242Z",
    is_active: true
  }
];

export default organizationsMockData;
