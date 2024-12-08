import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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

  async toggleAdmin(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    user.isAdmin = !user.isAdmin;
    await user.save();
    return user;
  }
  async getUsers(page: number) {
    const offset = (page - 1) * 10;

    const { rows: users, count: total } =
      await this.userRepository.findAndCountAll({
        offset,
        limit: 10,
      });

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / 10),
    };
  }

  async getUserByToken(token: string) {
    const [bearer, cur] = token.split(' ');
    if (!bearer || bearer !== 'Bearer') {
      throw new Error('Invalid token');
    }
    const decodedPayload = this.jwtService.verify(cur);
    return decodedPayload;
  }

  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      isAdmin: user.isAdmin,
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Неверно введен логин или пароль',
    });
  }
}
