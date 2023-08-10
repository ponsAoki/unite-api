import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { CreateCorporationInput } from './dto/create-corporation.input';
import { UpdateCorporationInput } from './dto/update-corporetion.input';
import { CorporationEntity } from './entities/corporation.entity';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CompanyAuth,
  CompanyAuthParam,
} from 'src/common/decorators/company-auth.decorator';
import { UpdateCorporationService } from './use-case/update-corporation.service';

@Controller('corporation')
export class CorporationController {
  constructor(
    private readonly corporationService: CorporationService,
    private readonly updateCorporationService: UpdateCorporationService,
  ) {}

  @Get()
  async findAll() {
    return await this.corporationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CorporationEntity> {
    return await this.corporationService.findWithEmployees(id);
  }

  @Post('sharedPassword')
  async findBySharedPassword(@Body() requestBody: { sharedPassword: string }) {
    const { sharedPassword } = requestBody;
    return await this.corporationService.findBySharedPassword(sharedPassword);
  }

  @Post()
  async createCorporation(@Body() input: CreateCorporationInput) {
    return await this.corporationService.create(input);
  }

  @Put(':id')
  @UseGuards(CorporateAuthGuard)
  @UseInterceptors(FileInterceptor('imageFile'))
  async update(
    @CompanyAuth() { corporation }: CompanyAuthParam,
    @Param('id') id: string,
    @Body() input: UpdateCorporationInput,
    @UploadedFile() imageFile?: Express.Multer.File,
  ): Promise<CorporationEntity> {
    return await this.updateCorporationService.handle(
      corporation,
      input,
      imageFile,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.corporationService.delete(id);
  }
}
