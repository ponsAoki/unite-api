import { Corporation } from "@prisma/client";

export class TestCorporation {
  create(num = 10): Corporation[] {
    return [...new Array(num)].map((_,n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n)
      return {
        id: `corporationId${n}`,
        sharedPassword: `sharedPassword${n}`,
        name: `name${n}`,
        email: `testcorporate${n}@gmail.com`,
        imageUrl: `imageURL${n}`,
        DescriptionOfBusiness: `DescriptionOfBusiness${n}`,
        location: `location${n}`,
        phoneNumber: `000-0000-000${n}`
      }
    })
  }
}


