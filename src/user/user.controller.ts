import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserWithEmailInput } from './dto/create-user-with-email.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserWithTokenEntity } from './entities/user-with-token.entity';
import { UserEntity } from './entities/user.entity';
import { CreateUserWithEmail } from './use-case/create-user-with-email';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserWithGoogleOrGithubInput } from './dto/create-user-with-google-or-github.input';
import { CreateUserWithGoogleOrGithubService } from './use-case/create-user-with-google-or-github.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserWithEmail: CreateUserWithEmail,
    private readonly createUserWithGoogleOrGithubService: CreateUserWithGoogleOrGithubService,
    private readonly uploadFileToFirebaseStorage: UploadFileToFirebaseStorage,
  ) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('find-by-firebase-uid')
  @UseGuards(AuthGuard)
  async findByFirebaseUID(@FirebaseAuth() authUser: any): Promise<UserEntity> {
    return await this.userService.findByFirebaseUID(authUser.uid);
  }

  // 認証使わない(SSRの際に使用する)
  @Get(':firebaseUID')
  async findByFirebaseUIDWithoutFirebaseAuth(
    @Param('firebaseUID') firebaseUID: string,
  ) {
    return await this.userService.findByFirebaseUID(firebaseUID);
  }

  @Post()
  async createWithEmailAndPassword(
    @Body() input: CreateUserWithEmailInput,
  ): Promise<UserWithTokenEntity> {
    return await this.createUserWithEmail.handle(input);
  }

  @Post('create-with-google-or-github')
  @UseGuards(AuthGuard)
  async createWithGoogleOrGithub(
    @FirebaseAuth() authUser: any,
  ): Promise<UserEntity> {
    //TODO: authUserの型をそもそも判定しておきたい
    const input: CreateUserWithGoogleOrGithubInput = {
      firebaseUID: authUser.uid,
      email: authUser.email,
      name: authUser.name,
      imageUrl: authUser.picture,
    };
    return await this.createUserWithGoogleOrGithubService.handle(input);
  }

  @Put('update-by-firebase-uid')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('imageFile'))
  async update(
    @FirebaseAuth() authUser: any,
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() input: UpdateUserInput,
  ): Promise<any> {
    if (imageFile) {
      const imageUrl = await this.uploadFileToFirebaseStorage.handle(imageFile);
      input = { ...input, imageUrl };
    }

    return await this.userService.updateByFirebaseUID(authUser.uid, input);
  }
}
