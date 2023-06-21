import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChatRoomParticipantInput {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
