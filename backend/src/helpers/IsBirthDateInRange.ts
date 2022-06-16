import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDateInRangeConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const maxDate = new Date();
    const minDate = new Date();
    const checkDate = new Date(date);
    minDate.setFullYear(minDate.getFullYear() - 122);
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (
      checkDate.getTime() >= minDate.getTime() &&
      checkDate.getTime() <= maxDate.getTime()
    ) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return "User's age must be between 18 and 122 years";
  }
}

export function IsBirthDateInRange(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateInRangeConstraint,
    });
  };
}
