import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Max } from 'sequelize-typescript';

const currentYear = new Date().getFullYear();

export class CreateDocumentDto {
  @IsString({ message: 'Должно быть строкой' })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsInt()
  @Min(1900)
  @Max(currentYear)
  year: number;

  @IsArray()
  @ValidateNested({ each: true })
  tagIds: number[];

  @IsInt()
  @Min(0)
  status: number;
}
