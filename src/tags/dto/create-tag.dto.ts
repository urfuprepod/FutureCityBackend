import { IsInt, IsString, MinLength } from 'class-validator';
import { Min } from 'sequelize-typescript';

export class CreateTagDto {
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(2, { message: 'Минимальная длина названия тега - 2 символа' })
  name: string;

  @IsInt()
  @Min(0)
  futureStatusId: number;
}
