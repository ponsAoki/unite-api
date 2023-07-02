import { Injectable } from '@nestjs/common';
import { CommentService } from '../comment.service';

@Injectable()
export class CheckForMyComment {
  constructor(private readonly commentService: CommentService) {}

  async handle(productId: string, userId: string) {
    const comments = await this.commentService.findManyByProductId(productId);

    const isMyCommentExist = comments.find(
      (comment) => comment.userId === userId,
    );

    if (!isMyCommentExist) return;
    throw new Error('commentはすでに存在している為作成することができません。');
  }
}
