import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatRoomMessageInput {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;
}
