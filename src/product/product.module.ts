import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProduct } from './use-case/create-product';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UpdateProduct } from './use-case/update-product';
import { UpdateFileToFirebaseStorage } from '../common/file/update-file-service';
import { UserService } from 'src/user/user.service';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';
import { EmployeeService } from 'src/employee/employee.service';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebase-storage';
import { CorporationModule } from 'src/corporation/corporation.module';

@Module({
  imports: [CorporationModule],
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    CreateProduct,
    UserRecruitService,
    UpdateProduct,
    UpdateFileToFirebaseStorage,
    DeleteFileToFirebaseStorage,
    UserService,
    UploadFileToFirebaseStorage,
    EmployeeService,
  ],
})
export class ProductModule {}
