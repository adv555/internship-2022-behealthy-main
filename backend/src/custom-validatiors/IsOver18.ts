import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsOver18' })
@Injectable()
export class UserIsOver18Rule implements ValidatorConstraintInterface {
  validate(birthdate: string) {
    const currentDate = Date.now();
    const epochDate = Date.parse(birthdate);
    const dateDifference = currentDate - epochDate;
    return dateDifference >= 568025136000 && dateDifference <= 3849948144000;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'User is younger than 18 or older 122';
  }
}

export function IsOver18(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOver18',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserIsOver18Rule,
    });
  };
}
