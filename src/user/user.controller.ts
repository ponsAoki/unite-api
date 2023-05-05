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

  @Post()
  async create(
    @Body() input: CreateUserWithEmailInput,
  ): Promise<UserWithTokenEntity> {
    return await this.createUserWithEmail.handle(input);
  }

  @Put()
  async update(
    @Headers('user-id') userId: string,
    @Body() input: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.update(userId, input);
  }
}
