import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserWithEmailInput } from './dto/create-user-with-email.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserWithTokenEntity } from './entities/user-with-token.entity';
import { UserEntity } from './entities/user.entity';
import { CreateUserWithEmail } from './use-case/create-user-with-email';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserWithEmail: CreateUserWithEmail,
  ) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('find-by-firebase-uid')
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
  async create(
    @Body() input: CreateUserWithEmailInput,
  ): Promise<UserWithTokenEntity> {
    return await this.createUserWithEmail.handle(input);
  }

  @Put('update-by-firebase-uid')
  async update(
    @FirebaseAuth() authUser: any,
    @Body() input: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateByFirebaseUID(authUser.uid, input);
  }
}
