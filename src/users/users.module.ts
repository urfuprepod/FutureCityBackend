import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'Ural_Federal_University',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtModule]
})
export class UsersModule {}
