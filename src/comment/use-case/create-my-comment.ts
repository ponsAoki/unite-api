import { Injectable } from "@nestjs/common";
import { CreateCommentInput } from "../dto/create-comment-input";
import { CheckForMyComment } from "../policy/check-for-my-comment";
import { CommentService } from "../comment.service";
import { Comment } from "@prisma/client";
import { UserService } from "src/user/user.service";

@Injectable()
export class CreateMyComment {
  constructor(
    private readonly checkForComment: CheckForMyComment,
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  async handle(firebaseUID: string, input: CreateCommentInput): Promise<Comment> {

    const user = await this.userService.findByFirebaseUID(firebaseUID)
    //自分のコメントがあるかチェックする。
    await this.checkForComment.handle(input.productId, user.id)

    //コメントがなかった場合commentを作成する。
    const comment = await this.commentService.create(input, user.id)

    return comment
  }
}
