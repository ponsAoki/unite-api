import { ConflictException, Injectable } from '@nestjs/common';
import { CommentService } from '../comment.service';
import { FAIL_TO_CREATE_COMMENT } from 'src/common/constants/message';

@Injectable()
export class CheckForMyComment {
  constructor(private readonly commentService: CommentService) {}

  async handle(productId: string, userId: string) {
    const comments = await this.commentService.findManyByProductId(productId);

    const isMyCommentExist = comments.find(
      (comment) => comment.userId === userId,
    );

    if (!isMyCommentExist) return;
    throw new ConflictException(FAIL_TO_CREATE_COMMENT);
  }
}
