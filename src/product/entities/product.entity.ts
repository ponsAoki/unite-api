import { Comment, Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  recruitId: string;
  headline: string;
  url: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
  comment?: Comment[];
}
