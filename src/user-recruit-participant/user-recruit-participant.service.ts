import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitParticipantInput } from './dto/create-user-recruit-participant-input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserRecruitParticipantService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  findAll() {
    return this.prismaService.userRecruitParticipant.findMany()
  }

  findManyByRecruitId(userRecruitId: string) {
    return this.prismaService.userRecruitParticipant.findMany({
      where: { userRecruitId },
      include: { user: true }
    })
  }

  async create(userId: string, input: CreateUserRecruitParticipantInput) {
    const user = await this.userService.findById(userId)
    return this.prismaService.userRecruitParticipant.create({
      data: {
        userRecruitId: input.userRecruitId,
        userId: user.id
      }
    })
  }

  approveParticipant(id: string) {
    return this.prismaService.userRecruitParticipant.update({
      where: { id },
      data: {
        isApproved: true,
      }
    })
  }
}
