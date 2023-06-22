import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { ProductService } from "src/product/product.service";

@Injectable()
export class DeleteFileToFirebaseStorage {
  constructor(
    private readonly productService: ProductService,
  ) {}

 async handle(id: string) {
    const product = await this.productService.findOne(id) ;

    const bucket = admin.storage().bucket();
    try {
      await bucket.file(product.url).delete();
      return
    } catch (error) {
      throw new Error(`fileをstorageから削除する処理に失敗しました。${error}`)
    }
  }
}
