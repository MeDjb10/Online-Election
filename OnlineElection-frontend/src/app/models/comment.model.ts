export interface Comment {
  _id: string;
  user: { _id: string; name: string }; // Update to expect user object
  candidate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
