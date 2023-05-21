import { Injectable } from '@nestjs/common';
import { Corporation, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateCorporationInput } from './dto/update-corporetion.input';
import { CorporationEntity } from './entities/corporation.entity';
import { CreateCorporationInput } from './dto/create-corporation.input';

@Injectable()
export class CorporationService {
  constructor(private readonly prismaService: PrismaService) {};

  //企業を全権取得()
  findAll(): PrismaPromise<Corporation[] | null> {
    return this.prismaService.corporation.findMany();
  }

  //企業のユニークidから探索
  findbyCorporationID(id: string): PrismaPromise<Corporation | null> {
    return this.prismaService.corporation.findUnique({where: { id }})
  }

  //企業を共有パスワードから探索する
  findBySharedPassword(sharedPassword: string): PrismaPromise<Corporation | null> {
    console.log(sharedPassword)
    return this.prismaService.corporation.findFirst({
      where: {
        sharedPassword
      }
    })
  }

  //企業を作成する
  create(input: CreateCorporationInput): PrismaPromise<Corporation> {
    return this.prismaService.corporation.create({ data: input })
  }

  //企業の情報をアップデートする
  updateById(id: string, input: UpdateCorporationInput): PrismaPromise<Corporation> {
    return this.prismaService.corporation.update({
      where: { id },
      data: input,
    })
  }

  //企業のアカウントを消去する
  delete(id: string): PrismaPromise<CorporationEntity | null> {
    return this.prismaService.corporation.delete({where: {id}});
  }

}
