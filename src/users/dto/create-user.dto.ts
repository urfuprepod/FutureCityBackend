import { Transform } from 'class-transformer';
import { IsString, Length, MinLength, Validate } from 'class-validator';
import { LoginValidator } from 'src/validators/hasLetterValidator';

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(5, { message: 'Логин должен состоять миниум из 5 символов' })
  @Transform(({ value }) => value.trim())
  @Validate(LoginValidator)
  login: string;

  @IsString({ message: 'Должно быть строкой' })
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString({ message: 'Должно быть строкой' })
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 символов' })
  readonly password: string;
}
