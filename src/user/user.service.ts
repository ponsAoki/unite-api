import { Injectable } from '@nestjs/common';
import { PrismaPromise, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<User[]> {
    return this.prismaService.user.findMany();
  }

  create(user: CreateUserInput): PrismaPromise<User> {
    return this.prismaService.user.create({ data: user });
  }
}
