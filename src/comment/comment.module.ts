import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ProductService } from 'src/product/product.service';
import { CheckForMyComment } from './policy/check-for-my-comment';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { CreateMyComment } from './use-case/create-my-comment';
import { deleteComment } from './use-case/delete-comment';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    PrismaService,
    ProductService,
    CheckForMyComment,
    UserRecruitService,
    CreateMyComment,
    deleteComment,
    UserService
  ]
})
export class CommentModule {}
