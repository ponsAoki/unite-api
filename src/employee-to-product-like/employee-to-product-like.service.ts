import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeToProductLikeService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  create(employeeId: string, productId: string): PrismaPromise<any> {
    return this.prismaService.employeeToProductLike.create({
      data: { employeeId, productId}
    })
  }
}
