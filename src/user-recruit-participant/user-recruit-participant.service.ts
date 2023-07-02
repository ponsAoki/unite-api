import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitParticipantInput } from './dto/create-user-recruit-participant-input';

@Injectable()
export class UserRecruitParticipantService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll() {
    return this.prismaService.userRecruitParticipant.findMany();
  }

  findManyByRecruitId(userRecruitId: string) {
    return this.prismaService.userRecruitParticipant.findMany({
      where: { userRecruitId },
      include: { user: true },
    });
  }

  create(userId: string, input: CreateUserRecruitParticipantInput) {
    return this.prismaService.userRecruitParticipant.create({
      data: {
        userRecruitId: input.userRecruitId,
        userId: userId,
      },
    });
  }

  approveParticipant(id: string) {
    return this.prismaService.userRecruitParticipant.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });
  }
}
