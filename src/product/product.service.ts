import { Injectable } from '@nestjs/common';
import { PrismaPromise, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { createProductInput } from './dto/create-product-input';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findMany(): PrismaPromise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        comment: true
      }
    })
  }

  findOne(id: string): PrismaPromise<Product> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        comment: {
          include: {
            user: true
          }
        }
      }
    });
  }

  //リファクタ->もっとマシな書き方あるはず(そもそもテーブル設計がいけてないちゃんと学ぶ)
  findMyProducts(id: string): PrismaPromise<Product[]> {
    const myProducts = this.prismaService.product.findMany({
      where: {
        recruit: {
          recruiterId: id
        }
      },
      include: {
        comment: true
      }
    })
    return myProducts
  }

  async findRelatedProducts(id: string) {
    return this.prismaService.product.findMany({
      where: {
        recruit: {
          userRecruitApplications: {
            some: {
              applicantId: id
            }
          }
        }
      }
    })
  }

  // findOneIncludeComment(id: string):PrismaPromise<Product> {
  //   return this.prismaService.product.findUnique({
  //     where: { id },
  //     include: {
  //       comment: true,
  //     }
  //   })
  // }

  update(
    id: string,
    input: any
  ): PrismaPromise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: input
    })
  }

  create(input: { recruitId: string, headline: string, detail: string, url: string}): PrismaPromise<Product> {
    return this.prismaService.product.create({
      data: {...input}
    })
  }
}
