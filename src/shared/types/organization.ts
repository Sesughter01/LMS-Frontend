// export interface Organization {
//   id?: number;
//   organizationName: string;
//   email: string;
//   phoneNumber: string;
//   colorScheme: string;
//   logo?: string;
//   subDomain: string;
//   is_active?: boolean;
//   createdAt?: any;
// }

export interface Organization {
  id?: number; // Changed to string to align with UUIDs
  organizationName: string;
  email: string;
  phoneNumber: string;
  colorScheme: string;
  logo?: string;
  subDomain: string;
  is_active?: boolean;
  createdAt?: string;
}