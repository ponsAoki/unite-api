import { Employee } from '@prisma/client';

export class TestEmployee {
  create(num = 10): Employee[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `employeeId${n}`,
        firebaseUID: `firebaseUID${n}`,
        corporationId: `corporationId${n}`,
        name: `name${n}`,
        email: `test${n}@gmail.com`,
        imageUrl: `imageURL${n}`,
        introduction: `introduction${n}`,
        phoneNumber: `090-${n}-${n}`,
      };
    });
  }
}
