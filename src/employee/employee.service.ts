import { Injectable } from '@nestjs/common';
import { Employee, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<Employee[] | null> {
    return this.prismaService.employee.findMany();
  }

  findByEmail(email: string): PrismaPromise<Employee | null> {
    return this.prismaService.employee.findUnique({where: { email }})
  }

  findByFirebaseUID(firebaseUID: string): Promise<Employee | null> {
    return this,this.prismaService.employee.findUnique({ where: { firebaseUID}})
  }

  updateByFirebaseUID(
    firebaseUID: string,
    input: UpdateEmployeeInput,
  ) {
    return this.prismaService.employee.update({
      where: { firebaseUID },
      data: input
    })
  }

  create(
    input: CreateEmployeeInput,
    corporationId: string
  ): Promise<Employee> {
    console.log("ここは読み込まれています🙇‍♀️",input, corporationId)
    return this.prismaService.employee.create({data: { ...input, corporationId }});
  }
}
