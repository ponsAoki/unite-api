import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

//fileをfirebaseStorageに保存してurlとして返す。
//(テーブルにurlとして保存)
@Injectable()
export class UploadFileToFirebaseStorage {
  async handle(file: Express.Multer.File) {
    const bucket = admin.storage().bucket();
    const fileName = `${Date.now()}_${file.originalname}`;

    try {
      const fileUpload = bucket.file(fileName);
      const options = {
        destination: fileUpload,
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      };

      await fileUpload.save(file.buffer, options);

      const [url] = await fileUpload.getSignedUrl({
        //ここは決めてないです
        action: 'read',
        expires: '03-01-2500',
      });

      return url;
    } catch (error) {
      throw new Error(
        `fileをfirebaseStorageに保存することができませんでした。| ${error}`,
      );
    }
  }
}
