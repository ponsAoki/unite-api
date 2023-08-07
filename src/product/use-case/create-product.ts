import { ConflictException, Injectable, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as admin from 'firebase-admin';
import { ProductService } from "../product.service";
import { UploadFileToFirebaseStorage } from "src/common/file/uplpad-fIle-to-firebaseStorage";
import { FAIL_TO_CREATE_PRODUCT, FAIL_TO_UPLOAD_FIREBASE_STORAGE } from "src/common/constants/message";
import { DeleteFileToFirebaseStorage } from "src/common/file/delete-file-to-firebase-storage";


@Injectable()
export class CreateProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadFileToFirebaseStorageService: UploadFileToFirebaseStorage,
    private readonly deleteFileToFirebaseStorage: DeleteFileToFirebaseStorage
  ) {}

  async handle(file: Express.Multer.File, rest: any) {
    let url
    try {
      url = await this.uploadFileToFirebaseStorageService.handle(file)
    } catch (error) {
      //fireStorageに保存していた場合storageから削除する。
      throw new Error(FAIL_TO_UPLOAD_FIREBASE_STORAGE);
    }

    const input = {url, ...rest};
    try {
      const product = await this.productService.create(input);
      return product
    } catch (error) {
      await this.deleteFileToFirebaseStorage.handle(url);
      throw new Error(FAIL_TO_CREATE_PRODUCT)
    }
  }

}







