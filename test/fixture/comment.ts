import { Comment } from "@prisma/client";

export class TestComment {
  create(num = 10): Comment[] {
    return [...new Array(num)].map((_,n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n)
      return {
        id: `commentId${n}`,
        productId: `productId${n}`,
        userId : `userId${n}`,
        content: `content${n}`,
        createdAt: t,
        updatedAt: t
      }
    })
  }
}


