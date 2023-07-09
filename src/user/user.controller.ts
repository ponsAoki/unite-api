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
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateFileToFirebaseStorage } from 'src/common/file/update-file-service';
import {
  SignInWithGithubInput,
  SignInWithGoogleInput,
} from './dto/sign-in-with-google-or-github.input';
import { SignInWithGoogleOrGithubService } from './use-case/sign-in-with-google-or-github.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserWithEmail: CreateUserWithEmail,
    private readonly signInWithGoogleOrGithubService: SignInWithGoogleOrGithubService,
    private readonly updateFileToFirebaseStorage: UpdateFileToFirebaseStorage,
  ) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.find(id);
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

  @Post('sign-in-with-google-or-github')
  @UseGuards(AuthGuard)
  async signInWithGoogleOrGithub(
    @FirebaseAuth() authUser: any,
    @Body() githubInput?: { githubAccount: string },
  ): Promise<UserEntity> {
    //TODO: authUserの型をそもそも判定しておきたい
    const signInInput: SignInWithGoogleInput | SignInWithGithubInput = {
      firebaseUID: authUser.uid,
      email: authUser.email,
      name: authUser.name,
      imageUrl: authUser.picture,
      githubAccount: githubInput.githubAccount,
    };

    return await this.signInWithGoogleOrGithubService.handle(signInInput);
  }

  @Put('update-by-firebase-uid')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('imageFile'))
  async update(
    @FirebaseAuth() authUser: any,
    @Body() input: UpdateUserInput,
    @UploadedFile() imageFile?: Express.Multer.File,
  ): Promise<any> {
    if (imageFile) {
      const user = await this.userService.findByFirebaseUID(authUser.uid);

      //firebaseのstorageに保存 & 画像url生成
      const newImageUrl = await this.updateFileToFirebaseStorage.handle(
        imageFile,
        user.imageUrl,
      );

      input = {
        ...input,
        imageUrl: newImageUrl,
        age: Number(input.age),
      };
    }

    return await this.userService.updateByFirebaseUID(authUser.uid, input);
  }
}
