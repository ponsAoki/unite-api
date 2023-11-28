import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserRecruitParticipantService } from '../user-recruit-participant.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApproveParticipantUseCase {
  constructor(
    private readonly userRecruitParticipantService: UserRecruitParticipantService,
    private readonly userRecruitService: UserRecruitService,
  ) {}

  async handle(id: string) {
    const userRecruitParticipant = await this.userRecruitParticipantService
      .approveParticipant(id)
      .catch((error) => {
        throw new Error(`失敗しました ${error.message}`);
      });

    if (!userRecruitParticipant) return;
    const userRecruit =
      await this.userRecruitService.findByUserRecruitParticipantId(
        userRecruitParticipant.id,
      );

    if (userRecruit.numberOfApplicants === 0)
      throw new Error('募集人数が1人以下なので認証できません。');

    const {
      numberOfApplicants,
      id: userRecruitId,
      programingSkills,
      ...rest
    } = userRecruit;
    const updateNumberOfApplicants = numberOfApplicants - 1;

    return this.userRecruitService.update(userRecruitId, {
      numberOfApplicants: updateNumberOfApplicants,
      programingSkills: programingSkills as string[],
      ...rest,
    });
  }
}
