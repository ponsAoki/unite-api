import { Injectable } from '@nestjs/common';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebase-storage';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';

@Injectable()
export class UpdateFileToFirebaseStorage {
  constructor(
    private readonly deleteFileToFirebaseStorageService: DeleteFileToFirebaseStorage,
    private readonly uploadFileToFirebaseStorage: UploadFileToFirebaseStorage,
  ) {}

  async handle(file: Express.Multer.File, fileUrl?: string) {
    //すでに画像を登録している場合は、firebaseに保存されている画像ファイルを削除
    if (fileUrl) {
      await this.deleteFileToFirebaseStorageService.handle(fileUrl);
    }

    //新しいfileからfirebaseStoreに保存してurlを取得
    const uploadFile = file;
    const url = await this.uploadFileToFirebaseStorage.handle(uploadFile);

    return url;
  }
}
