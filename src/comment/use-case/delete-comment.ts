import { Comment } from '@prisma/client';
import { CommentService } from '../comment.service';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FAIL_TO_DELETE_COMMENT } from 'src/common/constants/message';

@Injectable()
export class deleteComment {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  async handle(id: string, userId: string): Promise<Comment> {
    const user = await this.userService.findByFirebaseUID(userId);
    const myComment = await this.commentService.findOne(id);

    if (myComment.userId !== user.id) {
      throw new Error(FAIL_TO_DELETE_COMMENT);
    }
    return await this.commentService.delete(id);
  }
}
