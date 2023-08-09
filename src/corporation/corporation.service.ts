import { Injectable } from '@nestjs/common';
import { Corporation, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCorporationInput } from './dto/update-corporetion.input';
import { CreateCorporationInput } from './dto/create-corporation.input';

@Injectable()
export class CorporationService {
  constructor(private readonly prismaService: PrismaService) {}

  //企業を全権取得()
  findAll(): PrismaPromise<Corporation[] | null> {
    return this.prismaService.corporation.findMany();
  }

  //企業のユニークidから探索
  find(id: string): PrismaPromise<Corporation | null> {
    return this.prismaService.corporation.findUnique({ where: { id } });
  }

  //企業のユニークidから探索
  findWithEmployees(id: string): PrismaPromise<Corporation | null> {
    return this.prismaService.corporation.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });
  }

  //企業を共有パスワードから探索する
  findBySharedPassword(
    sharedPassword: string,
  ): PrismaPromise<Corporation | null> {
    return this.prismaService.corporation.findFirst({
      where: {
        sharedPassword,
      },
    });
  }

  //企業を作成する
  create(input: CreateCorporationInput): PrismaPromise<Corporation> {
    return this.prismaService.corporation.create({ data: input });
  }

  //企業の情報をアップデートする
  updateById(
    id: string,
    input: UpdateCorporationInput,
  ): PrismaPromise<Corporation> {
    return this.prismaService.corporation.update({
      where: { id },
      data: input,
      include: { employees: true },
    });
  }

  //企業のアカウントを消去する
  delete(id: string): PrismaPromise<Corporation> {
    return this.prismaService.corporation.delete({ where: { id } });
  }
}
