import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() input: CreateUserInput): Promise<UserEntity> {
    return await this.userService.create(input);
  }
}
