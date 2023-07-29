import { Server } from 'socket.io';
import { SendMessageService } from './send-message.service';
import { Test } from '@nestjs/testing';
import { ChatSenderInput } from '../dto/chat-sender.input';
import { ChatMessageInput } from '../dto/chat-message.input';
import { ChatRoomMessageService } from '../../chat-room-message/chat-room-message.service';

describe('SendMessageService Service', () => {
  let server: Server;
  let sendMessageSerSendMessageService: SendMessageService;
  let chatRoomMessageService: ChatRoomMessageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChatRoomMessageService, SendMessageService],
    })
      .overrideProvider(ChatRoomMessageService)
      .useClass(class {})
      .compile();

    server = new Server();

    chatRoomMessageService = module.get<ChatRoomMessageService>(
      ChatRoomMessageService,
    );

    sendMessageSerSendMessageService =
      module.get<SendMessageService>(SendMessageService);
  });

  it('チャットメッセージの保存とクライエントへの送信のユースケースが成功すること', async () => {
    const senderParticipantId = 'chatRoomParticipantId0';
    const roomId = 'chatRoomId0';
    const senderUserId = 'userId0';
    const message = 'test message';

    const sender: ChatSenderInput = {
      participant: {
        id: senderParticipantId,
        roomId,
        userId: senderUserId,
      },
      user: {
        id: senderUserId,
        firebaseUID: 'firebaseUid0',
        name: 'name0',
        email: 'test0@test.com',
        imageUrl: 'imageUrl0',
        age: 11,
        prefecture: 'prefecture0',
        university: 'university0',
        undergraduate: 'undergraduate0',
        graduateYear: 'graduateYear0',
        githubAccount: 'githubAccount0',
        selfPublicity: 'selfPublicity0',
        careerVision: 'name0',
        programingSkills: ['HTML', 'CSS', 'JavaScript'],
      },
    };
    const input: ChatMessageInput = {
      message,
      roomId,
    };

    chatRoomMessageService.create = jest.fn().mockResolvedValue({
      content: message,
      roomId,
      senderId: senderParticipantId,
    });

    expect(sendMessageSerSendMessageService.handle(server, sender, input))
      .resolves;

    const resMessage = await sendMessageSerSendMessageService.handle(
      server,
      sender,
      input,
    );
    expect(resMessage).toMatchObject({
      content: input.message,
      roomId: input.roomId,
      senderId: sender.participant.id,
      senderName: sender.user.name,
      senderImage: sender.user.imageUrl,
    });
  });
});
