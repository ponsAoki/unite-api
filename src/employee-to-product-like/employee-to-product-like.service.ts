import { Injectable } from '@nestjs/common';
import { EmployeeToProductLike, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeToProductLikeService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(
    employeeId: string,
    productId: string,
  ): PrismaPromise<EmployeeToProductLike> {
    return this.prismaService.employeeToProductLike.findFirst({
      where: {
        employeeId,
        productId,
      },
    });
  }

  create(
    employeeId: string,
    productId: string,
  ): PrismaPromise<EmployeeToProductLike> {
    return this.prismaService.employeeToProductLike.create({
      data: { employeeId, productId },
    });
  }
}
