import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserToRecruitLikeService } from "../user-to-recruit-like.service";
import { ALREADY_EXISTS_LIKE } from "src/common/constants/message";

@Injectable()
export class CreateUserToRecruitLike {
  constructor(
    private readonly userService: UserService,
    private readonly userToRecruitLikeService: UserToRecruitLikeService
  ) {}

  async handle(userId: string, recruitId: string): Promise<void> {
    const user = await this.userService.findByFirebaseUID(userId);

    //すでにいいねテーブルを作成していないかチェックする
    const specificLike = await this.userToRecruitLikeService.findOne(user.id, recruitId)

    //いいねテーブルが存在したらエラーを返す
    if (specificLike !== null) {
      throw new ConflictException(ALREADY_EXISTS_LIKE);
    }

    await this.userToRecruitLikeService.create(user.id, recruitId)
  }
}