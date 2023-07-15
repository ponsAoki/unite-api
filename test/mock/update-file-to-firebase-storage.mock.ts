import { DeleteFileToFirebaseStorageMock } from './delete-file-from-firebase-strage.mock';
import { UploadFileToFirebaseStorageMock } from './upload-file-service.mock';

export class UpdateFileToFirebaseStorageMock {
  constructor(
    private readonly deleteFileToFirebaseStorageMock: DeleteFileToFirebaseStorageMock,
    private readonly uploadFileToFirebaseStorageMock: UploadFileToFirebaseStorageMock,
  ) {
    this.deleteFileToFirebaseStorageMock =
      new DeleteFileToFirebaseStorageMock();
    this.uploadFileToFirebaseStorageMock =
      new UploadFileToFirebaseStorageMock();
  }

  async handle(file: Express.Multer.File, fileUrl?: string): Promise<string> {
    if (fileUrl) {
      await this.deleteFileToFirebaseStorageMock.handle(fileUrl);
    }

    const url = await this.uploadFileToFirebaseStorageMock.handle(file);
    return url;
  }
}
