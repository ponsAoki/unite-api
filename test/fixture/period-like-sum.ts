import { PeriodLikeSum } from "@prisma/client"

export class TestPeriodLikeSum {
  create(num = 10): PeriodLikeSum[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date()
      t.setSeconds(t.getSeconds() - num + 1)
      return {
        id: `periodLikeSum${n}`,
        productId: `productId${n}`,
        likesCount: n ,
        createdAt: t
      }
    })
  }
}