import { Scout } from '@prisma/client';

export class ScoutEntity implements Scout {
  id: string;
  userId: string;
  employeeId: string;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
}
