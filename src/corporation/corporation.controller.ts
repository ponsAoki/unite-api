import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { CreateCorporationInput } from './dto/create-corporation.input';
import { UpdateCorporationInput } from './dto/update-corporetion.input';

@Controller('corporation')
export class CorporationController {
  constructor(
    private readonly corporationService: CorporationService,
  ){}

  @Get()
  async findAll() {
    return await this.corporationService.findAll()
  }

  @Get('sharedPassword')
  async findBySharedPassword(@Body() requestBody: { sharedPassword: string }) {
    const { sharedPassword } = requestBody;
    return  await this.corporationService.findBySharedPassword(sharedPassword)
  }

  @Post()
  async createCorporation(@Body() input: CreateCorporationInput) {
    return await this.corporationService.create(input)
  }

  @Put(':id')
  async updatebyId(
    @Param('id') id: string,
    @Body() input: UpdateCorporationInput
  ) {
    return await this.corporationService.updateById(id, input)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.corporationService.delete(id)
  }
}

