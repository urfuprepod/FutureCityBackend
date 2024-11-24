import { Transform } from "class-transformer";
import { IsString, } from "class-validator";


export class LoginUserDto {
    @IsString({ message: 'Должно быть строкой' })
    @Transform(({ value }) => value.trim())
    login: string;

    @IsString({ message: 'Должно быть строкой' })
    @Transform(({ value }) => value.trim())
    password: string;
}