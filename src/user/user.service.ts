import { Injectable } from '@nestjs/common';
import { PrismaPromise, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  SignInWithGithubInput,
  SignInWithGoogleInput,
} from './dto/sign-in-with-google-or-github.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<User[]> {
    return this.prismaService.user.findMany();
  }

  find(id: string): PrismaPromise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByFirebaseUID(firebaseUID: string): PrismaPromise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        firebaseUID,
      },
    });
  }

  findByEmail(email: string): PrismaPromise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  create(
    input: CreateUserInput | SignInWithGoogleInput | SignInWithGithubInput,
  ): PrismaPromise<User> {
    return this.prismaService.user.create({ data: input });
  }

  updateById(id: string, input: UpdateUserInput): PrismaPromise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { ...input, age: input.age ? Number(input.age) : undefined },
    });
  }

  updateByFirebaseUID(
    firebaseUID: string,
    input: UpdateUserInput & { age: number | null },
  ): PrismaPromise<User> {
    return this.prismaService.user.update({
      where: { firebaseUID },
      data: input,
    });
  }
}
