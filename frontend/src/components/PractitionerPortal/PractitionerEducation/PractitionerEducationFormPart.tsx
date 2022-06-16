import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import TextInputField from 'components/common/Input/TextInputField';
import { RemoveFormButton } from 'components/common/RemoveFormButton/RemoveFormButton';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { FC } from 'react';

interface FormPartProps {
  index: number;
  countries: {
    value: string;
    label: string;
  }[];
  handleChange: any;
  removeForm?(): void;
  length: number;
}

export const PractitionerEducationFormPart: FC<FormPartProps> = ({
  index,
  countries,
  handleChange,
  removeForm,
  length,
}) => {
  return (
    <div className="border-t-2 border-t-gray-light pt-6 first:pt-0 first:border-0">
      {length && length > 1 && (
        <RemoveFormButton
          onClick={removeForm}
          label="Remove education"
          className="ml-auto mb-2"
        />
      )}
      <SelectField
        name={`edu.${index}.country`}
        label="Country"
        placeholder="Choose country of your education"
        options={countries}
        className="mb-6"
      />
      <div className="mb-6">
        <TextInputField
          name={`edu.${index}.university`}
          label="University name"
          placeholder="University name"
        />
      </div>
      <div className="mb-6">
        <TextInputField
          name={`edu.${index}.speciality`}
          label="Speciality"
          placeholder="Your speciality"
        />
      </div>
      <Typography type="Ag-13-medium" className="mb-2.5 text-greyScaleGrey">
        Years of education
      </Typography>
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <BirthDateField
          name={`edu.${index}.date_from`}
          returnDate={handleChange}
          className="mb-6 md:mr-4 md:mb-0"
          label=""
        />
        <BirthDateField
          name={`edu.${index}.date_to`}
          returnDate={handleChange}
          className="md:ml-4"
          label=""
        />
      </div>
    </div>
  );
};
