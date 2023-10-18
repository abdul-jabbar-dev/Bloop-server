 
export type CreateUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  status: "active";
  role: "subscriber";
};
 
export type LoginUser = {
  password: string;
  email: string;
};
