import { ChatRoomMessage } from '@prisma/client';

export class ChatRoomMessageEntity implements ChatRoomMessage {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  senderName?: string;
  senderImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
