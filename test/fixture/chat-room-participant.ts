import { ChatRoomParticipant } from '@prisma/client';

export class TestChatRoomParticipants {
  create(num = 10): ChatRoomParticipant[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `chatRoomParticipantId${n}`,
        roomId: `chatRoomId${n}`,
        userId: `userId${n}`,
      };
    });
  }
}
