import { Product } from '@prisma/client';

export class TestProduct {
  create(num = 10): Product[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `productId${n}`,
        recruitId: `userRecruitId${n}`,
        name: `name${n}`,
        skills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
        reasonForSkillSelection: `reasonForSkillSelection${n}`,
        developmentBackground: `developmentBackground${n}`,
        overview: `overview${n}`,
        url: `url${n}`,
        createdAt: t,
        updatedAt: t,
      };
    });
  }
}
