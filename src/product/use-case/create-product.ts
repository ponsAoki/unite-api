import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';
import { FirebaseAppName } from 'src/common/enums/storage-type';

@Injectable()
export class CreateProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadFileToFirebaseStorageService: UploadFileToFirebaseStorage,
  ) {}

  async handle(file: Express.Multer.File, rest: any) {
    try {
      const url = await this.uploadFileToFirebaseStorageService.handle(
        file,
        FirebaseAppName.USER,
      );

      const input = { url, ...rest };
      const product = await this.productService.create(input);

      return product;
    } catch (error) {
      //firebaseStorageに保存していた場合storageから削除する。
      throw new Error(
        `fileをfirebaseAuthに保存することができませんでした。 | ${error}`,
      );
    }
  }
}
