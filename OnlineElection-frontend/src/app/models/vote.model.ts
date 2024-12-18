export interface Vote {
  _id?: string;
  user: string; // User ID
  candidate: { _id: string; name: string,party:string }; // Candidate ID
  createdAt?: Date;
  updatedAt?: Date;
}
