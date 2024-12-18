export interface Election {
  _id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  candidates?: string[]; // Array of Candidate IDs
  createdAt?: Date;
  updatedAt?: Date;
}
