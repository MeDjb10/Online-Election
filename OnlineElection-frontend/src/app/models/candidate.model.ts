export interface Candidate {
  _id?: string;
  name: string;
  party: string;
  biography: string;
  electoralProgram: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
