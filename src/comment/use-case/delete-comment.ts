import { Comment } from "@prisma/client";
import { CommentService } from "../comment.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class deleteComment {
  constructor(
    private readonly commentService: CommentService
  ) {}

  async handle(id: string, userId: string): Promise<Comment> {
    const myComment = await this.commentService.findOne(id);
    if (myComment.userId !== userId) {
      throw new Error("このコメントを削除することはできません")
    }
    return this.commentService.delete(id)
  }
}
