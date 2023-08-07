import { Injectable } from '@nestjs/common';
import { PrismaPromise, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findMany(): PrismaPromise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        comment: true,
        recruit: {
          include: {
            recruiter: true,
            userRecruitParticipant: {
              include: {
                user: true
              }
            },
          }
        },
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
        },
        employeeToProductLikes: true,
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

  findRelatedProducts(id: string): PrismaPromise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        recruit: {
          userRecruitParticipant: {
            some: {
              userId: id
            }
          }
        }
      }
    })
  }

  //いいねを含む募集を全件取得
  findAllIncludeLikes() {
    return this.prismaService.product.findMany({
      where: {
        employeeToProductLikes: {}
      },
      include: {
        employeeToProductLikes: true,
        periodLikeSum: true
      },
    })
  }


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
