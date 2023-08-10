import { Scout } from '@prisma/client';

export class TestScouts {
  create(num = 10): Scout[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `scoutId${n}`,
        userId: `userId${n}`,
        corporationId: `corporationId${n}`,
        employeeId: `employeeId${n}`,
        createdAt: t,
        updatedAt: t,
      };
    });
  }
}
