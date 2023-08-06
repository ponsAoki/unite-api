import { Product } from "@prisma/client";

export class TestProduct {
  create(num=10): Product[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `productId${n}`,
        recruitId: `userRecruitId${n}`,
        headline: `headline${n}`,
        url: `url${n}`,
        detail: `detail${n}`,
        createdAt: t,
        updatedAt: t
      }
    })
  }
}