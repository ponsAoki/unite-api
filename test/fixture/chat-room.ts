import { ChatRoom } from '@prisma/client';

export class TestChatRooms {
  create(num = 10): ChatRoom[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `chatRoomId${n}`,
        createdAt: t,
        updatedAt: t,
      };
    });
  }
}
