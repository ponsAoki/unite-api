import { EmployeeToProductLike } from '@prisma/client';

export class TestEmployeeToProductLike {
  create(num = 10): EmployeeToProductLike[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `employeeToProductLike${n}`,
        employeeId: `employeeId${n}`,
        productId: `productId${n}`,
        createdAt: t,
      };
    });
  }
}
