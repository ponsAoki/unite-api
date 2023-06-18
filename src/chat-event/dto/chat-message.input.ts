import { IsNotEmpty, IsString } from 'class-validator';

export class ChatMessageInput {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
