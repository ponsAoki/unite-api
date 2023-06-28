import { Injectable } from "@nestjs/common";
import { DeleteFileToFirebaseStorage } from "src/common/file/delete-file-to-firebaseStorage";
import { UploadFileToFirebaseStorage } from "src/common/file/uplpad-fIle-to-firebaseStorage";
import { Request } from "express";

@Injectable()
export class UpdateFileToFirebaseStorage {
  constructor(
    private readonly deleteFileToFirebaseStorageService: DeleteFileToFirebaseStorage,
    private readonly uploadFileToFirebaseStorage: UploadFileToFirebaseStorage,
    ) {}

  async handle(id: string, req: Request) {
    //まず保存中のファイルを削除
    await this.deleteFileToFirebaseStorageService.handle(id);

    //新しいfileからfirebaseStoreに保存してurlを取得
    const uploadFile = req.file;
    const url = await this.uploadFileToFirebaseStorage.handle(uploadFile);

    return url;
  }
}
