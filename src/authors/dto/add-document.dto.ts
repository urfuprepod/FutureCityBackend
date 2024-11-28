import { IsInt, ValidateIf, IsArray, Min, IsNumber } from 'class-validator';

export class AddDocumentDto {
  @IsInt()
  @Min(0)
  authorId: number;

  @ValidateIf((obj) => !Array.isArray(obj))
  @IsInt()
  @Min(0)
  @ValidateIf((obj) => Array.isArray(obj))
  @IsArray()
  @IsNumber({}, { each: true, message: 'Массив должен состоять только из id' })
  documentsId: number | number[];
}
