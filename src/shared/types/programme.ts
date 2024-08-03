export interface Programme {
  id: number;

  programmeName: string;
  programmeDescription: string;

  createdByCategory?: string;

  isDefault: boolean;

  createdAt?: any;
}
