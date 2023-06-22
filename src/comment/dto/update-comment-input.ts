import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentInput {
  @IsString()
  @IsNotEmpty()
  content!: string;
}
