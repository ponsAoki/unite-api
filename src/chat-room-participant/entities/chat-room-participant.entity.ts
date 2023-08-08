import { ChatRoomParticipant } from '@prisma/client';

export class ChatRoomParticipantEntity implements ChatRoomParticipant {
  id: string;
  roomId: string;
  userId: string | null;
  employeeId: string | null;
}
