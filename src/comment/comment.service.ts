import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput } from './dto/create-comment-input';
import { Comment, PrismaPromise } from '@prisma/client';
import { UpdateCommentInput } from './dto/update-comment-input';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  //一件取得
  findOne(id) {
    return this.prismaService.comment.findUnique({ where: { id } });
  }

  //同じproductIdを持つcommentを全権取得
  findManyByProductId(productId: string) {
    return this.prismaService.comment.findMany({
      where: { productId },
    });
  }

  //コメント作成
  create(input: CreateCommentInput): PrismaPromise<Comment> {
    return this.prismaService.comment.create({ data: input });
  }
  //コメントの編集
  update(id: string, input: UpdateCommentInput): PrismaPromise<Comment> {
    return this.prismaService.comment.update({
      where: { id },
      data: input,
    });
  }

  //コメントの削除
  delete(id: string) {
    return this.prismaService.comment.delete({ where: { id } });
  }
}
