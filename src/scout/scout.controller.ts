import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';
import {
  CompanyAuth,
  CompanyAuthParam,
} from 'src/common/decorators/company-auth.decorator';
import { SendScoutInput } from './dto/send-scout.input';
import { SendScoutService } from './use-case/send-scout.service';
import { ScoutWithRoomIdEntity } from './entities/scount-with-room-id.entity';

@Controller('scout')
export class ScoutController {
  constructor(private readonly sendScoutService: SendScoutService) {}

  @Post('/send-scout')
  @UseGuards(CorporateAuthGuard)
  async create(
    @CompanyAuth() { corporation, employee }: CompanyAuthParam,
    @Body() input: SendScoutInput,
  ): Promise<ScoutWithRoomIdEntity> {
    return await this.sendScoutService.handle(
      corporation.id,
      employee.id,
      input,
    );
  }
}
