import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { UpdateFileToFirebaseStorage } from '../../common/file/update-file-service';
import { FirebaseAppName } from 'src/common/enums/storage-type';

@Injectable()
export class UpdateProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly updateFileToFirebaseStorage: UpdateFileToFirebaseStorage,
  ) {}

  async handle(
    id: string,
    input: any,
    file: Express.Multer.File,
    firebaseAppName: FirebaseAppName,
  ) {
    if (file) {
      //ファイルをstorageに保存してurlを作成
      const product = await this.productService.findOne(id);
      const url = await this.updateFileToFirebaseStorage.handle(
        file,
        firebaseAppName,
        product.url,
      );
      const includeUrlInput = { url, ...input };
      return await this.productService.update(id, includeUrlInput);
    } else {
      return await this.productService.update(id, input);
    }
  }
}
