import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsBetween100YearsAgoAndNow' })
@Injectable()
export class IsBetween100YearsAgoAndNowRule
  implements ValidatorConstraintInterface
{
  validate(date: string) {
    const epochDate = Date.parse(date);
    const currentDate = Date.now();
    const dateDifference = currentDate - epochDate;
    return dateDifference > 0 && dateDifference < 3155695200000;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The date is more than 100 years or it`s a date in future';
  }
}

export function IsBetween100YearsAgoAndNow(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOBetween100YearsAgoAndNow',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBetween100YearsAgoAndNowRule,
    });
  };
}
