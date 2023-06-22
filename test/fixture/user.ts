import { User } from '@prisma/client';

export class TestUsers {
  create(num: number): User[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);

      return {
        id: `userId${n}`,
        firebaseUID: `firebaseUid${n}`,
        name: `name${n}`,
        email: `test${n}@test.com`,
        imageUrl: `imageUrl${n}`,
        age: n,
        prefecture: `prefecture${n}`,
        university: `university${n}`,
        undergraduate: `undergraduate${n}`,
        graduateYear: `graduateYear${n}`,
        selfPublicity: `selfPublicity${n}`,
        careerVision: `name${n}`,
        programingSkills: ['HTML', 'CSS', 'JavaScript'],
      };
    });
  }
}
