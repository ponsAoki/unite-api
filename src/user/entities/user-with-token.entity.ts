import { UserEntity } from './user.entity';

export class UserWithTokenEntity extends UserEntity {
  token!: string;
}
