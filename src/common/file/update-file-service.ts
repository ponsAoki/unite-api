import { Injectable } from '@nestjs/common';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebaseStorage';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';

@Injectable()
export class UpdateFileToFirebaseStorage {
  constructor(
    private readonly deleteFileToFirebaseStorageService: DeleteFileToFirebaseStorage,
    private readonly uploadFileToFirebaseStorage: UploadFileToFirebaseStorage,
  ) {}

  async handle(file: Express.Multer.File, fileUrl?: string) {
    //まず保存中のファイルを削除
    await this.deleteFileToFirebaseStorageService.handle(fileUrl);

    //新しいfileからfirebaseStoreに保存してurlを取得
    const uploadFile = file;
    const url = await this.uploadFileToFirebaseStorage.handle(uploadFile);

    return url;
  }
}
