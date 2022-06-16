import { IEducation } from 'common/types/app/Education';
import { RootState } from 'common/types/app/root-state.type';
import { AddFormButton } from 'components/common/AddFormButton/AddFormButton';
import { Button } from 'components/common/Button/Button';
import { Typography } from 'components/common/Typography';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EducationActionCreator } from 'store/education/education.reducer';
import { countries } from '../options/countries';
import { PractitionerEducationFormPart } from './PractitionerEducationFormPart';

interface FromValues {
  edu: IEducation[];
}

export const PractitionerEducationForms = () => {
  const [successUpdate, setSuccessUpdate] = useState(false);
  const { educationList, educationLoadError } = useSelector(
    (state: RootState) => state.education,
  );
  const { data, isLoaded } = useSelector(
    (state: RootState) => state.practitioner,
  );
  const dispatch = useDispatch();

  const pushDataTemplate = {
    country: '',
    university: '',
    speciality: '',
    date_from: '',
    date_to: '',
    family_practitioners_id: data?.id,
  };

  useEffect(() => {
    isLoaded && dispatch(EducationActionCreator.getEducation(data?.id));
  }, [isLoaded]);

  const onSubmit = (values: FromValues) => {
    dispatch(EducationActionCreator.updateEducation(values.edu));

    setSuccessUpdate(true);
  };

  const removeEducation = (id: number) => {
    if (id) {
      dispatch(EducationActionCreator.removeEducation(id));
    }
  };

  return (
    <Formik
      initialValues={{ edu: educationList }}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, handleChange }) => (
        <Form>
          <FieldArray
            name="edu"
            render={({ push, remove }) => (
              <>
                {values.edu.map((form: IEducation, index: number) => (
                  <PractitionerEducationFormPart
                    key={index}
                    index={index}
                    countries={countries}
                    handleChange={handleChange}
                    length={values.edu.length}
                    removeForm={() => {
                      remove(index);
                      removeEducation(form.id);
                    }}
                  />
                ))}
                <AddFormButton
                  onClick={() => push(pushDataTemplate)}
                  label="Add education"
                  className="mb-10"
                />
              </>
            )}
          />
          <Button
            type="submit"
            label="Save"
            className="w-[100%] desktop:w-full"
          />
          {educationLoadError && (
            <Typography type="Ag-13-medium" className="text-error mt-2">
              {educationLoadError}
            </Typography>
          )}
          {!educationLoadError && successUpdate && (
            <Typography type="Ag-13-medium" className="text-green mt-2">
              Education data was successfuly updated
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};
