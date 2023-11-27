import { Employee } from '@prisma/client';

export class EmployeeEntity implements Employee {
  id: string;
  firebaseUID: string;
  corporationId: string;
  name: string;
  email: string;
  imageUrl: string;
  introduction: string;
  phoneNumber: string;
}
