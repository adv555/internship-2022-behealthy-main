import { RootState } from 'common/types/app/root-state.type';
import { AddFormButton } from 'components/common/AddFormButton/AddFormButton';
import { Button } from 'components/common/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExperienceActionCreator } from 'store/experience/experience.reducer';
import { PractitionerExperieceFormPart } from './PractitionerExperienceFormPart';
import { countries } from '../options/countries';
import { Typography } from 'components/common/Typography';
import { IWorkExperience } from 'common/types/app/WorkExperience';

interface FormValues {
  exp: IWorkExperience[];
}

export const PractitionerExperieceForms = () => {
  const [successUpdate, setSuccessUpdate] = useState(false);
  const { experienceList, experienceLoadError } = useSelector(
    (state: RootState) => state.work_experience,
  );
  const { data, isLoaded } = useSelector(
    (state: RootState) => state.practitioner,
  );
  const dispatch = useDispatch();

  const pushDataTemplate = {
    country: '',
    date_from: '',
    date_to: null,
    clinic_name: '',
    clinic_type: '',
    clinic_address: '',
    position: '',
    phone: '',
    family_practitioner_id: data?.id,
  };

  useEffect(() => {
    isLoaded && dispatch(ExperienceActionCreator.getExperience(data?.id));
  }, [dispatch, isLoaded]);

  const onSubmit = (values: FormValues) => {
    dispatch(ExperienceActionCreator.updateExperience(values.exp));
    setSuccessUpdate(true);
  };

  const removeWorkExperience = (id: number) => {
    if (id) {
      dispatch(ExperienceActionCreator.removeExperience(id));
    }
  };

  return (
    <Formik
      initialValues={{ exp: experienceList }}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <FieldArray
            name="exp"
            render={({ push, remove }) => (
              <>
                {values.exp.map((form: IWorkExperience, index: number) => (
                  <PractitionerExperieceFormPart
                    key={index}
                    index={index}
                    countries={countries}
                    handleChange={handleChange}
                    length={values.exp.length}
                    phoneValue={form.phone}
                    setFieldValue={setFieldValue}
                    removeForm={() => {
                      remove(index);
                      removeWorkExperience(form.id);
                    }}
                  />
                ))}
                <AddFormButton
                  onClick={() => push(pushDataTemplate)}
                  label="Add work place"
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
          {experienceLoadError && (
            <Typography type="Ag-13-medium" className="text-error mt-2">
              {experienceLoadError}
            </Typography>
          )}
          {!experienceLoadError && successUpdate && (
            <Typography type="Ag-13-medium" className="text-green mt-2">
              Education data was successfully updated
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};
