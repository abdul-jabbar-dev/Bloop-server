 
export type CreateUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  status: "pending";
  role: "subscriber";
};
 
export type LoginUser = {
  password: string;
  email: string;
};
