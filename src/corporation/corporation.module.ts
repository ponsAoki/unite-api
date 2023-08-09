import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { PrismaService } from 'src/prisma.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { UpdateCorporationService } from './use-case/update-corporation.service';
import { UpdateFileToFirebaseStorage } from 'src/common/file/update-file-service';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebase-storage';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';

@Module({
  imports: [EmployeeModule],
  controllers: [CorporationController],
  providers: [
    CorporationService,
    PrismaService,
    UpdateCorporationService,
    UpdateFileToFirebaseStorage,
    DeleteFileToFirebaseStorage,
    UploadFileToFirebaseStorage,
  ],
  exports: [CorporationService, UpdateCorporationService],
})
export class CorporationModule {}
