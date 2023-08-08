import { Injectable } from '@nestjs/common';
import { PrismaPromise, Scout } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateScoutInput } from './dto/create-scout-input';

@Injectable()
export class ScoutService {
  constructor(private readonly prismaService: PrismaService) {}

  create(input: CreateScoutInput): PrismaPromise<Scout> {
    return this.prismaService.scout.create({ data: input });
  }
}
