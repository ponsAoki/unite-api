import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserToRecruitLikeService } from "../user-to-recruit-like.service";

@Injectable()
export class CreateUserToRecruitLike {
  constructor(
    private readonly userService: UserService,
    private readonly userToRecruitLikeService: UserToRecruitLikeService
  ) {}

  async handle(userId: string, recruitId: string) {
    const user = await this.userService.findByFirebaseUID(userId);

    //すでにいいねテーブルを作成していないかチェックする
    const specificLike = await this.userToRecruitLikeService.findOne(user.id, recruitId)

    //いいねテーブルが存在したらエラーを返す
    if (specificLike !== null) {
      throw new Error('すでにいいねしてあります。')
    }

    await this.userToRecruitLikeService.create(user.id, recruitId)
  }
}