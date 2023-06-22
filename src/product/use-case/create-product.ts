import { Injectable, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as admin from 'firebase-admin';
import { ProductService } from "../product.service";
import { UploadFileToFirebaseStorage } from "src/common/file/uplpad-fIle-to-firebaseStorage";


@Injectable()
export class CreateProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadFileToFirebaseStorageService: UploadFileToFirebaseStorage
  ) {}

  async handle(file: Express.Multer.File, rest: any) {

    try {
      const url = await this.uploadFileToFirebaseStorageService.handle(file)

      const input = {url, ...rest};
      const product = await this.productService.create(input);

      return product

    } catch (error) {
      //firestorageに保存していた場合storageから削除する。
      throw new Error(`fileをfirebaseAuthに保存することができませんでした。 | ${error}`)
    }
  }

}







