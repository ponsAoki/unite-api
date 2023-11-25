import { Injectable } from '@nestjs/common';
import { PrismaPromise, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ProductWithLikesAndLikeSum } from './entities/product-with-likes-and-like-sum';
import { CreateSystemProductInput } from './dto/create-system-product-input';
import { UpdateProductInput } from './dto/update-product-input';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(): PrismaPromise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        comment: true,
        recruit: {
          include: {
            recruiter: true,
            userRecruitParticipant: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        comment: {
          include: {
            user: true,
          },
        },
        employeeToProductLikes: true,
      },
    });
  }

  //リファクタ->もっとマシな書き方あるはず(そもそもテーブル設計がいけてないちゃんと学ぶ)
  findMyProducts(id: string): PrismaPromise<Product[]> {
    const myProducts = this.prismaService.product.findMany({
      where: {
        recruit: {
          recruiterId: id,
        },
      },
      include: {
        comment: true,
      },
    });
    return myProducts;
  }

  findRelatedProducts(id: string): PrismaPromise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        recruit: {
          userRecruitParticipant: {
            some: {
              userId: id,
            },
          },
        },
      },
    });
  }

  //いいねを含む募集を全件取得
  findAllIncludeLikes(): PrismaPromise<ProductWithLikesAndLikeSum[]> {
    return this.prismaService.product.findMany({
      where: {
        employeeToProductLikes: {},
      },
      include: {
        employeeToProductLikes: true,
        periodLikeSum: true,
      },
    });
  }

  update(id: string, input: UpdateProductInput): PrismaPromise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: input,
    });
  }

  create(input: CreateSystemProductInput): PrismaPromise<Product> {
    return this.prismaService.product.create({
      data: { ...input },
    });
  }
}
