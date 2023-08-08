import { Module } from '@nestjs/common';
import { ScoutController } from './scout.controller';
import { ScoutService } from './scout.service';
import { PrismaService } from 'src/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CorporationService } from 'src/corporation/corporation.service';
import { SendScoutService } from './use-case/send-scout.service';
import { UtilService } from 'src/common/utils/util.service';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';

@Module({
  controllers: [ScoutController],
  providers: [
    EmployeeService,
    CorporationService,
    SendScoutService,
    ScoutService,
    UtilService,
    ChatRoomService,
    ChatRoomParticipantService,
    ChatRoomMessageService,
    PrismaService,
  ],
})
export class ScoutModule {}
