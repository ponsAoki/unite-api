import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruit } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserRecruitService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findAll(): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      include: {
        product: true,
        recruiter: true,
        userRecruitParticipant: true
      }
    });
  }

  findById(id: string): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.findFirst({
      where: { id },
      include: {
        product: true,
        recruiter: true,
        userRecruitParticipant: {
          include: {
            user: true
          }
        },
        userToRecruitLikes: true,
      }
    });
  }

  //いいねしているrecruitを探す
  findLikedRecruitById(id: string) {
    return this.prismaService.userRecruit.findFirst({
      where: { id },
      include: {
        userToRecruitLikes: true
      }
    })
  }

  //自分が作成したrecruitの一覧取得
  findManyByUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany(
      {
        where: {
          recruiter: {
            id
          }
        }
      }
    )
  }

  //関連するrecruitの一覧取得
  findRelativeManybyUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this. prismaService.userRecruit.findMany({
      where: {
        userRecruitParticipant: {
          some: {
            userId: id,
            isApproved: true
          }
        }
      }
    })
  }

  //自分がいいねしたrecruitの一覧取得
  findLikedRecruitsByUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      where: {
        userToRecruitLikes: {
          some: {
            userId: id,
          }
        }
      }
    })
  }

  findByIdAndRecruiterId(
    id: string,
    recruiterId: string,
  ): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.findFirst({
      where: { id, recruiterId },
    });
  }

  create(
    recruiterId: string,
    input: CreateUserRecruitInput,
  ): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.create({
      data: { ...input, recruiterId },
    });
  }

  update(
    id: string,
    input: UpdateUserRecruitInput,
  ): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.update({
      where: { id },
      data: input,
    });
  }

  delete(id: string): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.delete({ where: { id } });
  }
}
