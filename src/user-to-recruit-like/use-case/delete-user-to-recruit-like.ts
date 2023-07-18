import { Injectable } from "@nestjs/common";
import { UserToRecruitLikeService } from "../user-to-recruit-like.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class DeleteUserToRecruitLikeService {
  constructor(
    private readonly userService: UserService,
    private readonly userToRecruitLikeService: UserToRecruitLikeService
  ) {}

  async handle(userId: string, recruitId: string) {
    const user = await this.userService.findByFirebaseUID(userId)
    const specificLike = await this.userToRecruitLikeService.findOne(user.id, recruitId)

    await this.userToRecruitLikeService.delete(specificLike.id)
  }
}
