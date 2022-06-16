import React, { useEffect } from 'react';
import { Formik, Form, FormikProps, FieldArray, getIn } from 'formik';
import { Button } from '../../common/Button/Button';
import FormHeader from '../../common/FormHeader/FormHeader';
import { educationSchema } from '../schemas/educationSchema';
import { Typography } from 'components/common/Typography';
import { SelectField } from 'components/common/Select/SelectField';
import { AddButton, Icon } from '../AddButton';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { RootState } from 'common/types/app/root-state.type';
import { EducationFormProps } from 'common/types/app/Education';
import { PractitionerRegistrationActionCreator } from 'store/practitioner/practitionerRegistration.reducer';
import TextInputField from 'components/common/Input/TextInputField';
import { countries } from 'components/PractitionerPortal/options/countries';

let InitialValues: EducationFormProps = {
  educationList: [
    {
      country: '',
      date_from: '',
      date_to: '',
      university: '',
      speciality: '',
    },
  ],
};
export const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const education = useSelector(
    (state: RootState) =>
      state.practitioner_registration.steps['education'].payload,
  );
  useEffect(() => {
    if (education !== null) {
      InitialValues.educationList = education;
    }
  }, [education]);

  const onSubmitData = (values: EducationFormProps) => {
    dispatch(
      PractitionerRegistrationActionCreator.addStepPayload({
        key: 'education',
        data: [...values.educationList],
      }),
    );

    dispatch(
      PractitionerRegistrationActionCreator.unlockStep({
        data: 'workExperience',
      }),
    );

    navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_WORK_EXPERIENCE, {
      replace: true,
    });
  };
  return (
    <div className=" mt-[42px]  w-343 md:w-480 ">
      <div className="mb-3">
        <FormHeader title="Professional information" />
      </div>
      <div className="flex flex-col mb-3 mt-3">
        <Formik
          initialValues={InitialValues}
          validationSchema={educationSchema}
          onSubmit={onSubmitData}
        >
          {(props: FormikProps<EducationFormProps>) => {
            const { values, dirty, errors, setFieldValue } = props;
            function getError(field: string) {
              return dirty ? getIn(errors, field) : '';
            }
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <FieldArray
                    name="educationList"
                    validateOnChange={false}
                    render={(arrayHelpers) => (
                      <div>
                        {values.educationList.map((item, index) => (
                          <div className="flex flex-col gap-6" key={index}>
                            <div className="flex flex-col gap-3">
                              <Typography type="h4" className={'mt-5'}>
                                Education
                              </Typography>
                              <SelectField
                                name={`educationList[${index}].country`}
                                options={countries}
                                label={'Country'}
                                placeholder={'Choose country of your education'}
                              />
                            </div>

                            <TextInputField
                              name={`educationList[${index}].university`}
                              label="University name"
                              placeholder="University name"
                            />
                            <TextInputField
                              name={`educationList[${index}].speciality`}
                              label="Speciality"
                              placeholder="Your speciality"
                            />
                            <div className="flex flex-col gap-1">
                              <Typography
                                type="Ag-13-medium"
                                className="text-greyScaleGrey"
                              >
                                Years of education
                              </Typography>
                              <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="w-full sm:w-1/2 self-start">
                                  <BirthDateField
                                    error={getError(
                                      `educationList[${index}].date_from`,
                                    )}
                                    className="w-full"
                                    label=""
                                    name={`educationList[${index}].date_from`}
                                  />
                                </div>

                                <div className="w-full sm:w-1/2 self-start">
                                  <BirthDateField
                                    error={getError(
                                      `educationList[${index}].date_to`,
                                    )}
                                    className="w-full"
                                    label=""
                                    name={`educationList[${index}].date_to`}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              {values.educationList.length === index + 1 && (
                                <AddButton
                                  label={'Add education'}
                                  onClick={() =>
                                    arrayHelpers.push({
                                      country: '',
                                      date_from: '',
                                      date_to: '',
                                      university: '',
                                      speciality: '',
                                    })
                                  }
                                />
                              )}
                              {!(values.educationList.length === 1) && (
                                <AddButton
                                  label={'Remove'}
                                  icon={Icon.MINUS}
                                  onClick={() => arrayHelpers.remove(index)}
                                  styles={
                                    values.educationList.length === index + 1
                                      ? 'justify-end'
                                      : ''
                                  }
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
                <div className=" mt-10">
                  <Button type="submit" label="Save" disabled={!dirty} />
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className=" mt-8">
          <Button
            type="button"
            label="Skip"
            nameBtn="tertiary"
            onClick={() => {
              dispatch(
                PractitionerRegistrationActionCreator.unlockStep({
                  data: 'workExperience',
                }),
              );
              navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_WORK_EXPERIENCE, {
                replace: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
