import { ChatRoomParticipant, Employee, User } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChatSenderInput {
  @IsNotEmpty()
  participant: ChatRoomParticipant;

  @IsOptional()
  user?: User;

  @IsOptional()
  employee?: Employee;
}
