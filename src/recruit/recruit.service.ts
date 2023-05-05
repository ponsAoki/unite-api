import { Injectable } from '@nestjs/common';
import { PrismaPromise, Recruit } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateSystemRecruitInput } from './dto/create-system-recruit.input';
import { UpdateRecruitInput } from './dto/update-recruite.input';

@Injectable()
export class RecruitService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<Recruit[]> {
    return this.prismaService.recruit.findMany();
  }

  create(recruit: CreateSystemRecruitInput): PrismaPromise<Recruit> {
    return this.prismaService.recruit.create({ data: recruit });
  }

  update(id: string, input: UpdateRecruitInput): PrismaPromise<Recruit> {
    return this.prismaService.recruit.update({ where: { id }, data: input });
  }

  delete(id: string): PrismaPromise<Recruit> {
    return this.prismaService.recruit.delete({ where: { id } });
  }
}
