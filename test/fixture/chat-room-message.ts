import { ChatRoomMessage } from '@prisma/client';

export class TestChatRoomMessages {
  create(num = 10): ChatRoomMessage[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `chatRoomMessageId${n}`,
        content: 'content',
        roomId: `chatRoomId${n}`,
        senderId: `chatRoomParticipantId${n}`,
        createdAt: t,
        updatedAt: t,
      };
    });
  }
}
