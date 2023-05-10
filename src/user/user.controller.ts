import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
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
  async findById(
    @Headers('firebase-uid') firebaseUID: string,
  ): Promise<UserEntity> {
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
    @Headers('firebase-uid') firebaseUID: string,
    @Body() input: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateByFirebaseUID(firebaseUID, input);
  }
}
