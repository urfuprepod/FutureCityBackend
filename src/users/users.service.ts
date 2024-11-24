import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from './dto/pagination.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const currentUser = await this.userRepository.findOne({
      where: { login: dto.login },
    });
    if (currentUser) {
      throw new Error('Пользователь с таким логином уже существует');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return await this.generateToken(user);
  }

  async login(dto: LoginUserDto) {
    const candidate = await this.validateUser(dto);
    return this.generateToken(candidate);
  }

  async setAdmin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    user.isAdmin = true;
    await user.save();
    return user;
  }
  async getUsers(pagination: PaginationDto) {
    const offset = (pagination.page - 1) * 10;

    const { rows: users, count: total } =
      await this.userRepository.findAndCountAll({
        offset,
        limit: 10,
      });

    return {
      users,
      total,
      page: pagination.page,
      totalPages: Math.ceil(total / 10),
    };
  }

  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOne({where: {login: loginDto.login}})
    const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
    if (user && passwordEquals) {
        return user;
    }

    throw new UnauthorizedException({message: 'Неверно введен логин или пароль'})
  }
}
