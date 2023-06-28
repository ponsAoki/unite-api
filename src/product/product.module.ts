import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProduct } from './use-case/create-product';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UpdateProductService } from './use-case/update-product-service';
import { UpdateFileToFirebaseStorage } from '../common/file/update-file-service';
import { UserService } from 'src/user/user.service';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebaseStorage';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    CreateProduct,
    UserRecruitService,
    UpdateProductService,
    UpdateFileToFirebaseStorage,
    DeleteFileToFirebaseStorage,
    UserService,
    UploadFileToFirebaseStorage
  ]
})
export class ProductModule {}
