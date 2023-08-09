import { Corporation, Employee } from '@prisma/client';

export class CorporationEntity implements Corporation {
  id: string;
  sharedPassword: string;
  name: string;
  email: string;
  imageUrl: string;
  descriptionOfBusiness: string;
  location: string;
  phoneNumber: string;
  employees?: Employee[];
}
