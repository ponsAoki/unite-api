import { Injectable } from "@nestjs/common";
import { DeleteFileToFirebaseStorage } from "src/common/file/delete-file-to-firebaseStorage";
import { UploadFileToFirebaseStorage } from "src/common/file/uplpad-fIle-to-firebaseStorage";

@Injectable()
export class UpdateFileToFirebaseStorage {
  constructor(
    private readonly deleteFileToFirebaseStorageService: DeleteFileToFirebaseStorage,
    private readonly uploadFileToFirebaseStorage: UploadFileToFirebaseStorage,
    ) {}

  async handle(id: string, file: Express.Multer.File) {
    //まず保存中のファイルを削除
    await this.deleteFileToFirebaseStorageService.handle(id);

    //新しいfileからfirebaseStoreに保存してurlを取得
    const url = await this.uploadFileToFirebaseStorage.handle(file);

    return url
  }
}
