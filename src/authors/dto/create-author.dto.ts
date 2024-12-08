import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Min } from 'sequelize-typescript';

export class CreateAuthorDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  biography?: string;
}
