export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  favorites?: string[]; // Array of Candidate IDs
  age?: number;
  bio?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
