import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
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
    const url = await this.uploadFileToFirebaseStorage.handle(file)

    // const bucket = admin.storage().bucket();

    // const filename = `${Date.now()}_${file.originalname}`

    // try {
    //   const fileUpload = bucket.file(filename);
    //   const options = {
    //     destination: fileUpload,
    //     resumable: false,
    //     metadata: {
    //       contentType: file.mimetype,
    //     },
    //   };

    //   await fileUpload.save(file.buffer, options)

    //   const [ url ] = await fileUpload.getSignedUrl({
    //     //ここは決めてないです
    //     action: 'read',
    //     expires: '03-01-2500',
    //   });

    //   return url
    // } catch (error) {
    //   throw new Error(`fileのstorageへの保存に失敗しました。${error}`)
    // }
  }
}
