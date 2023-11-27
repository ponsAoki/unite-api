import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruit } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';
import { UserService } from 'src/user/user.service';
import { CreateUserRecruitSystemInput } from './dto/create-user-recruit.system.input';

@Injectable()
export class UserRecruitService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  findAll(): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      include: {
        product: true,
        recruiter: true,
        userRecruitParticipant: true,
      },
    });
  }

  findSearch(search?: string) {
    return this.prismaService.userRecruit.findMany({
      where: {
        hackathonName: {
          contains: search,
        },
      },
      include: {
        recruiter: true,
        userRecruitParticipant: true,
      },
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
            user: true,
          },
        },
        userToRecruitLikes: true,
      },
    });
  }

  findByUserRecruitParticipantId(id: string) {
    return this.prismaService.userRecruit.findFirst({
      where: {
        userRecruitParticipant: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  //いいねしているrecruitを探す
  findLikedRecruitById(id: string) {
    return this.prismaService.userRecruit.findFirst({
      where: { id },
      include: {
        userToRecruitLikes: true,
      },
    });
  }

  //自分が作成したrecruitの一覧取得
  findManyByUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      where: {
        recruiter: {
          id,
        },
      },
      include: {
        userRecruitParticipant: true,
      },
    });
  }

  //関連するrecruitの一覧取得
  findRelativeManybyUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      where: {
        userRecruitParticipant: {
          some: {
            userId: id,
            isApproved: true,
          },
        },
      },
      include: {
        recruiter: true,
      },
    });
  }

  //自分がいいねしたrecruitの一覧取得
  findLikedRecruitsByUserId(id: string): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany({
      where: {
        userToRecruitLikes: {
          some: {
            userId: id,
          },
        },
      },
    });
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
    input: CreateUserRecruitSystemInput,
  ): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.create({
      data: {
        ...input,
        recruiterId,
      },
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
