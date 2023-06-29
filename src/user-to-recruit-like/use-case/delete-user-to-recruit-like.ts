import { Injectable } from "@nestjs/common";
import { CreateUserToRecruitLikeInput } from "../dto/create-user-to-recruit-like";
import { UserRecruitService } from "src/user-recruit/user-recruit.service";
import { UserToRecruitLikeService } from "../user-to-recruit-like.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class DeleteUserToRecruitLikeService {
  constructor(
    private readonly userService: UserService,
    private readonly userRecruitService: UserRecruitService,
    private readonly userToRecruitLikeService: UserToRecruitLikeService
  ) {}

  async handle(userId: string, recruitId: string) {
    const user = await this.userService.findByFirebaseUID(userId)

    //特定のrecruitのいいねを取得する
    const likedRecruit = await this.userRecruitService.findLikedRecruitById(recruitId);
    //テーブル設計的に一つのrecruitに対して複数回いいねを押せるようになっているため
    const myLiked = likedRecruit.userToRecruitLikes.filter((userToRecruitLike) => {
      return userToRecruitLike.userId === user.id
    })

    //２つ以上の場合はエラーを投げる
    if (myLiked.length > 1) throw new Error('同じプロダクトに対して2回以上いいねしてしまっています。')

    await this.userToRecruitLikeService.delete(myLiked[0].id)
  }
}
