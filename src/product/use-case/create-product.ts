import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';
import {
  FAIL_TO_CREATE_PRODUCT,
  FAIL_TO_UPLOAD_FIREBASE_STORAGE,
} from 'src/common/constants/message';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebase-storage';
import { FirebaseAppName } from 'src/common/enums/storage-type';

@Injectable()
export class CreateProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadFileToFirebaseStorageService: UploadFileToFirebaseStorage,
    private readonly deleteFileToFirebaseStorage: DeleteFileToFirebaseStorage,
  ) {}

  async handle(file: Express.Multer.File, rest: any) {
    let url: string;

    try {
      url = await this.uploadFileToFirebaseStorageService.handle(
        file,
        FirebaseAppName.USER,
      );
    } catch (error) {
      //fireStorageに保存していた場合storageから削除する。
      throw new Error(FAIL_TO_UPLOAD_FIREBASE_STORAGE);
    }

    const input = { url, ...rest };
    try {
      const product = await this.productService.create(input);
      return product;
    } catch (error) {
      await this.deleteFileToFirebaseStorage.handle(url, FirebaseAppName.USER);
      throw new Error(FAIL_TO_CREATE_PRODUCT);
    }
  }
}
