import { Injectable } from '@nestjs/common';
import { PrismaPromise, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<User[]> {
    return this.prismaService.user.findMany();
  }

  findById(firebaseUID: string): PrismaPromise<User | null> {
    return this.prismaService.user.findUnique({ where: { firebaseUID } });
  }

  findByFirebaseUID(firebaseUID: string): PrismaPromise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        firebaseUID
      }
    });
  }

  findByEmail(email: string): PrismaPromise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  create(input: CreateUserInput): PrismaPromise<User> {
    return this.prismaService.user.create({ data: input });
  }

  updateById(id: string, input: UpdateUserInput): PrismaPromise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: input,
    });
  }

  updateByFirebaseUID(
    firebaseUID: string,
    input: UpdateUserInput,
  ): PrismaPromise<User> {
    return this.prismaService.user.update({
      where: { firebaseUID },
      data: input,
    });
  }
}
