import { Corporation } from "@prisma/client";

export class CorporationEntity implements Corporation {
  id: string;
  sharedPassword: string;
  name: string;
  email: string;
  imageUrl: string;
  DescriptionOfBusiness: string;
  location: string;
  phoneNumber: string;
}

