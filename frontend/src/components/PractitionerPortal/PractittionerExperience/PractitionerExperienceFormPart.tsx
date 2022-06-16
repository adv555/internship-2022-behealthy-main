import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { Checkbox } from 'components/common/Checkbox/Checkbox';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import TextInputField from 'components/common/Input/TextInputField';
import { RemoveFormButton } from 'components/common/RemoveFormButton/RemoveFormButton';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { FC, useState } from 'react';
import { clinicTypes } from './options/clinicTypes';

interface FormPartProps {
  index: number;
  countries: {
    value: string;
    label: string;
  }[];
  handleChange: any;
  removeForm?(): void;
  setFieldValue?(...params: any): void;
  phoneValue?: string;
  length: number;
}

export const PractitionerExperieceFormPart: FC<FormPartProps> = ({
  index,
  countries,
  removeForm,
  handleChange,
  setFieldValue,
  phoneValue,
  length,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div className="border-t-2 border-t-gray-light pt-6 first:pt-0 first:border-0">
      {length && length > 1 && (
        <RemoveFormButton
          onClick={removeForm}
          label="Remove work experience"
          className="ml-auto mb-2"
        />
      )}
      <SelectField
        name={`exp.${index}.country`}
        label="Country"
        placeholder="Choose country of your work"
        options={countries}
        className="mb-6"
      />
      <Typography type="Ag-13-medium" className="mb-2.5 text-greyScaleGrey">
        {!active ? 'Years of work experience' : 'Start date'}
      </Typography>
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <BirthDateField
          name={`exp.${index}.date_from`}
          returnDate={handleChange}
          className=" w-full mb-6 md:mb-0"
          label=""
        />
        {!active && (
          <BirthDateField
            name={`exp.${index}.date_to`}
            returnDate={handleChange}
            className="w-full md:ml-8"
            label=""
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <Checkbox
          label="I am still working here"
          onChangeHandler={() => setActive(!active)}
          checked={active}
        />
      </div>
      <div className="mb-6">
        <TextInputField
          name={`exp.${index}.clinic_name`}
          label="Working place name"
          placeholder="Working place name"
        />
      </div>
      <SelectField
        name={`exp.${index}.clinic_type`}
        label="Working place type"
        placeholder="Choose working place type"
        options={clinicTypes}
        className="mb-6"
      />
      <div className="mb-6">
        <TextInputField
          name={`exp.${index}.clinic_address`}
          label="Working place address"
          placeholder="Working place address"
        />
      </div>
      <div className="mb-6">
        <PhoneInput
          label={'Clinic phone number'}
          id={`exp.${index}.phone`}
          placeholder="+380 12 345 67 89"
          value={phoneValue}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className="mb-10">
        <TextInputField
          name={`exp.${index}.position`}
          label="Your postition"
          placeholder="Your position"
        />
      </div>
    </div>
  );
};
