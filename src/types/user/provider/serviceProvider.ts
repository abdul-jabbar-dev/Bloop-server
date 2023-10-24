import { Status } from "@prisma/client";
export type CreateServiceProvider = {
  userId: string;
  serviceTypeId: string;
  availability: boolean;
  status: Status;
}; 
