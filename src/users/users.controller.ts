import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

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

  @Get('/current')
  async getCurrentUser(@Req() req: Request) {
    return this.usersService.getUserByToken(req.headers.authorization);
  }

  @Post('/register')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Put('/edit/:id')
  async editUser(@Param('id') id: string) {
    return await this.usersService.toggleAdmin(+id);
  }
}
