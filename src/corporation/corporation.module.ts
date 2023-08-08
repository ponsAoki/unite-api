import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
  exports: [CorporationService],
})
export class CorporationModule {}
