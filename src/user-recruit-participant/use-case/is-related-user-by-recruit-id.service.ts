import { Injectable } from '@nestjs/common';
import { UserOrCorporateAuthParam } from 'src/common/decorators/user-or-corporate-atuh.decorator';
import { UserRecruitParticipantService } from '../user-recruit-participant.service';
import { UserRecruitParticipant } from '@prisma/client';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';

@Injectable()
export class IsRelatedUserByRecruitIdService {
  constructor(
    private readonly userRecruitService: UserRecruitService,
    private readonly userRecruitParticipantService: UserRecruitParticipantService,
  ) {}

  async handle(
    operator: UserOrCorporateAuthParam,
    recruitId: string,
  ): Promise<boolean> {
    if (!operator.user) return false;

    const recruit = await this.userRecruitService.findById(recruitId);
    const isRecruitOwner = recruit.recruiterId === operator.user.id;

    const approvedUserRecruitParticipants = (
      await this.userRecruitParticipantService.findManyByRecruitId(recruitId)
    ).filter((participant: UserRecruitParticipant) => participant.isApproved);

    const isRelatedUser = approvedUserRecruitParticipants.some(
      (participant: UserRecruitParticipant) =>
        participant.userId === operator.user.id || participant,
    );

    return isRecruitOwner || isRelatedUser;
  }
}
