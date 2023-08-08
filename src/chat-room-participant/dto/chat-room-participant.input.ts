import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChatRoomParticipantInput {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;
}
