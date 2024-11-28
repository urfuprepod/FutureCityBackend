import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getUsers(@Query('page') page: string) {
    return await this.usersService.getUsers(+page);
  }

  @Post('/login')
  login(@Body() loginDto: LoginUserDto) {
    return this.usersService.login(loginDto);
  }

  @Post('/register')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
