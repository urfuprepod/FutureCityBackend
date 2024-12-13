import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Max } from 'sequelize-typescript';

const currentYear = new Date().getFullYear();

// export class CreateDocumentDto {
//   @IsString({ message: 'Должно быть строкой' })
//   @Transform(({ value }) => value.trim())
//   title: string;

//   @IsInt()
//   year: number;

//   @IsArray()
//   // @ValidateNested({ each: true })
//   tagIds: number[];

//   @IsString()
//   file: string;

//   @IsInt()
//   futureStatusId: number;
// }

export class CreateDocumentDto {
  title: string;
  year: string;
  tagIds: string[];
  location: string;
  futureStatusId: string;
  authorIds: string[];
}