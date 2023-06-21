import { Comment } from "@prisma/client";

export class CommentEntity implements Comment {
  id: string;
  productId: string;
  userId: string; //commentを作成した人のfirebaseUID
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

