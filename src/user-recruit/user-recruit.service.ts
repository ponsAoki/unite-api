import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruit } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';

@Injectable()
export class UserRecruitService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany();
  }

  findById(id: string): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.findFirst({ where: { id } });
  }

  findManyByFirebaseUID(firebaseUID): Promise<UserRecruit[]> {
    return this.prismaService.userRecruit.findMany(
      {
        where: {
          recruiter: {
            firebaseUID
          }
        }
      }
    )
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
