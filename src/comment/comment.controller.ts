import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment-input';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateMyComment } from './use-case/create-my-comment';
import { UpdateCommentInput } from './dto/update-comment-input';
import { CommentService } from './comment.service';
import { deleteComment } from './use-case/delete-comment';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly createMyCommentService: CreateMyComment,
    private readonly commentService: CommentService,
    private readonly deleteCommentService: deleteComment
  ) {}

  //コメント作成
  //FEのcomment追加をmodalで行いたい為productIdはBodyの中に含める。
  @Post()
  async createComment(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateCommentInput,
  ) {
    return await this.createMyCommentService.handle(authUser.uid, input)
  }

  //コメントの編集
  //modalで編集したいのでidはinputに含める。
  @Put(':id')
  async updateComment(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
    @Body() input: UpdateCommentInput,
  ) {
    return this.commentService.update(id, input);
  }

  //コメントの削除
  @Delete()
  async deleteComment(
    @FirebaseAuth() authUser: any,
    @Body() input: { id: string },
  ) {
    return this.deleteCommentService.handle(input.id, authUser.uid)
  }
}
