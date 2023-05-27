import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomParticipantInput {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
