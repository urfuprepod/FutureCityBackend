import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number = 1
}