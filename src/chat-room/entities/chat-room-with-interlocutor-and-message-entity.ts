import { ChatRoom } from '@prisma/client';

export class ChatRoomWithInterlocutorAndMessageEntity implements ChatRoom {
  id: string;
  interlocutorName: string;
  interlocutorImageUrl: string;
  latestMessage: string;
  lastDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
