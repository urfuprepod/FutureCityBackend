import { IsArray, IsNumber } from "class-validator";

export class GetDocumentsByIdDto {
    @IsArray()
    @IsNumber({}, {each: true})
    ids: number[];
}