import { ProductEntity } from './product.entity';
import { UserRecruitParticipantEntity } from 'src/user-recruit-participant/entities/user-recruit-participant.entity';

export class ProductWithApprovedUserRecruitParticipantsEntity extends ProductEntity {
  approvedUserRecruitParticipants: UserRecruitParticipantEntity[];
}
