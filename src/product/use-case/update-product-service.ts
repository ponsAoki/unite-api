import { Injectable } from "@nestjs/common";
import { ProductService } from "../product.service";
import { UpdateFileToFirebaseStorage } from "../../common/file/update-file-service";
import { Request } from "express";


@Injectable()
export class UpdateProductService {
  constructor(
    private readonly productService: ProductService,
    private readonly updateFileToFirebaseStorage: UpdateFileToFirebaseStorage,
  ) {}

  async handle(
    id: string,
    input: any,
    file?: Request
  ) {

    if (file) {
      //ファイルをstorageに保存してurlを作成
      const url = await this.updateFileToFirebaseStorage.handle(id, file);
      const includeUrlInput = {url, ...input}
      return await this.productService.update(id, includeUrlInput)
    } else {
      return await this.productService.update(id, input)
    }
  }
}
