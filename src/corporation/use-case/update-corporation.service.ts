import { Injectable } from '@nestjs/common';
import { UpdateCorporationInput } from '../dto/update-corporetion.input';
import { CorporationEntity } from '../entities/corporation.entity';
import { UpdateFileToFirebaseStorage } from 'src/common/file/update-file-service';
import { FirebaseAppName } from 'src/common/enums/storage-type';
import { Corporation } from '@prisma/client';
import { CorporationService } from '../corporation.service';

@Injectable()
export class UpdateCorporationService {
  constructor(
    private readonly updateFileToFirebaseStorage: UpdateFileToFirebaseStorage,
    private readonly corporationService: CorporationService,
  ) {}

  async handle(
    corporation: Corporation,
    input: UpdateCorporationInput,
    imageFile: Express.Multer.File,
  ): Promise<CorporationEntity> {
    if (imageFile) {
      //firebaseのstorageに保存 & 画像url生成
      const newImageUrl = await this.updateFileToFirebaseStorage.handle(
        imageFile,
        FirebaseAppName.EMPLOYEE,
        corporation.imageUrl,
      );

      input = {
        ...input,
        imageUrl: newImageUrl,
      };
    }

    return await this.corporationService.updateById(corporation.id, input);
  }
}
