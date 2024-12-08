import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateIf, IsArray } from 'class-validator';

export class CreateAuthorDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  biography?: string;

  @IsOptional()
  @IsArray()
  @ValidateIf((obj) => Array.isArray(obj))
  @IsNumber({}, { each: true, message: 'Массив должен состоять только из id' })
  documents?: number[];
}
