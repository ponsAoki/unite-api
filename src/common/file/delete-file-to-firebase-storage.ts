import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { URL } from 'url';

@Injectable()
export class DeleteFileToFirebaseStorage {
  async handle(fileUrl: string) {
    const bucket = admin.app('user').storage().bucket();

    try {
      //↓ fileUrlからfirebase storageに保存されているファイル名を抽出し、そのファイル名を持ったファイルがすでにfirebase storageに存在すれば削除する (存在しなければ早期return)
      const pathname = new URL(fileUrl).pathname;
      const decodedPathname = decodeURIComponent(pathname);
      const splitPathname = decodedPathname.split('/');
      const fileName = splitPathname[splitPathname.length - 1];
      const [isFileExist] = await bucket.file(fileName).exists();

      if (!isFileExist) return;

      return await bucket.file(fileName).delete();
    } catch (error) {
      throw new Error(`fileをstorageから削除する処理に失敗しました。${error}`);
    }
  }
}
