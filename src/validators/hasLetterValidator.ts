import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const lathinicLetter = /[A-z]/g;
const cyrillicRegExp = /[А-я]/g;

@ValidatorConstraint({ name: 'uniqueEmailArray', async: false })
export class LoginValidator implements ValidatorConstraintInterface {
  validate(login: string, args: ValidationArguments) {
    return lathinicLetter.test(login) && !cyrillicRegExp.test(login);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Должен содержать хотя бы одну букву';
  }
}
