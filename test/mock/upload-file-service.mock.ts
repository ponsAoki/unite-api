export class UploadFileToFirebaseStorageMock {
  async handle(file: Express.Multer.File): Promise<string> {
    return Promise.resolve('fileUrl0');
  }
}
