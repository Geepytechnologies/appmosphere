export type User = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  joined_date: string;
};
export interface IloginResponse {
  token: string;
  user: User;
}
