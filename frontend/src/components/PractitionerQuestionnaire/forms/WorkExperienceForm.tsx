import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikProps, FieldArray, getIn } from 'formik';
import { Button } from '../../common/Button/Button';
import FormHeader from '../../common/FormHeader/FormHeader';
import { selectOptionClinicType } from '../mock-data/select-options';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { AddButton, Icon } from '../AddButton';
import TextInputField from 'components/common/Input/TextInputField';
import { workExperienceSchema } from '../schemas/workExperienceSchema';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { WorkExperienceFormProps } from 'common/types/app/WorkExperience';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { PractitionerRegistrationActionCreator } from 'store/practitioner/practitionerRegistration.reducer';
import { countries } from 'components/PractitionerPortal/options/countries';
import { LoginActionCreator } from 'store/login/login.reducer';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import { Checkbox } from 'components/common/Checkbox/Checkbox';

const InitialValues: WorkExperienceFormProps = {
  workExperienceList: [
    {
      country: '',
      date_from: '',
      date_to: '',
      clinic_name: '',
      clinic_type: '',
      clinic_address: '',
      phone: '',
      position: '',
    },
  ],
};
export const WorkExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const workExperience = useSelector(
    (state: RootState) =>
      state.practitioner_registration.steps['workExperience'].payload,
  );

  const steps = useSelector(
    (state: RootState) => state.practitioner_registration.steps,
  );

  const userData = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if (workExperience !== null) {
      InitialValues.workExperienceList = workExperience;
    }
  }, [workExperience]);

  const onSubmitData = (values: WorkExperienceFormProps) => {
    dispatch(
      PractitionerRegistrationActionCreator.addStepPayload({
        key: 'workExperience',
        data: [...values.workExperienceList],
      }),
    );
  };

  return (
    <div className=" mt-[42px]  w-343 md:w-480 ">
      <div className="mb-3">
        <FormHeader title="Professional information" />
      </div>
      <div className="flex flex-col mb-3 mt-3">
        <Formik
          initialValues={InitialValues}
          validationSchema={workExperienceSchema}
          onSubmit={onSubmitData}
        >
          {(props: FormikProps<WorkExperienceFormProps>) => {
            const { values, dirty, errors, setFieldValue } = props;
            function getError(field: string) {
              return dirty ? getIn(errors, field) : '';
            }
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <FieldArray
                    name="workExperienceList"
                    validateOnChange={false}
                    render={(arrayHelpers) => (
                      <div className="flex flex-col gap-6">
                        {values.workExperienceList.map((item, index) => (
                          <div className="flex flex-col gap-6" key={index}>
                            <div className="flex flex-col gap-3">
                              <Typography type="h4" className={''}>
                                Work Experience
                              </Typography>
                              <SelectField
                                name={`workExperienceList[${index}].country`}
                                options={countries}
                                label={'Country'}
                                placeholder={'Choose country of your work'}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Typography
                                type="Ag-13-medium"
                                className="text-greyScaleGrey"
                              >
                                {!active
                                  ? 'Years of work experience'
                                  : 'Start date'}
                              </Typography>
                              <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="w-full">
                                  <BirthDateField
                                    error={getError(
                                      `workExperienceList[${index}].date_from`,
                                    )}
                                    className="w-full"
                                    label=""
                                    name={`workExperienceList[${index}].date_from`}
                                  />
                                </div>
                                <div className="w-full">
                                  {!active && (
                                    <BirthDateField
                                      error={getError(
                                        `workExperienceList[${index}].date_to`,
                                      )}
                                      className="w-full"
                                      label=""
                                      name={`workExperienceList[${index}].date_to`}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="flex mt-5">
                                <Checkbox
                                  label="I am still working here"
                                  onChangeHandler={() => {
                                    if (!active) {
                                      setFieldValue(
                                        `workExperienceList[${index}].date_to`,
                                        new Date()
                                          .toISOString()
                                          .substring(0, 10),
                                      );
                                    }
                                    setActive(!active);
                                  }}
                                  checked={active}
                                />
                              </div>
                            </div>
                            <TextInputField
                              key={'clinic_name'}
                              label={'Working place name'}
                              name={`workExperienceList[${index}].clinic_name`}
                              placeholder={'Working place name'}
                              className="w-480"
                            />
                            <SelectField
                              name={`workExperienceList[${index}].clinic_type`}
                              options={selectOptionClinicType}
                              label={'Working place type'}
                              placeholder={'Choose working place type'}
                            />
                            <TextInputField
                              key={'clinic_address'}
                              label={'Working place address'}
                              name={`workExperienceList[${index}].clinic_address`}
                              placeholder={'Working place address'}
                              className="w-480"
                            />
                            <PhoneInput
                              key={'clinic_phone'}
                              label={'Clinic phone number'}
                              id={`workExperienceList[${index}].phone`}
                              placeholder="+380 12 345 67 89"
                              setFieldValue={setFieldValue}
                              value={values.workExperienceList[index].phone}
                              error={getError(
                                `workExperienceList[${index}].phone`,
                              )}
                            />
                            <TextInputField
                              name={`workExperienceList[${index}].position`}
                              label="Your postition"
                              placeholder="Your position"
                            />

                            <div className="flex justify-between">
                              {values.workExperienceList.length ===
                                index + 1 && (
                                <AddButton
                                  label={'Add workplace'}
                                  onClick={() =>
                                    arrayHelpers.push({
                                      country: '',
                                      date_from: '',
                                      date_to: '',
                                      clinic_name: '',
                                      clinic_type: '',
                                      clinic_address: '',
                                      phone: '',
                                      position: '',
                                    })
                                  }
                                />
                              )}
                              {!(values.workExperienceList.length === 1) && (
                                <AddButton
                                  label={'Remove'}
                                  icon={Icon.MINUS}
                                  onClick={() => arrayHelpers.remove(index)}
                                  styles={
                                    values.workExperienceList.length ===
                                    index + 1
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
            label={workExperience === null ? 'Skip' : 'Finish Registration'}
            nameBtn="tertiary"
            onClick={() => {
              dispatch(
                PractitionerRegistrationActionCreator.registerPractitioner(
                  steps,
                ),
              );
              dispatch(
                LoginActionCreator.signUpLogin({
                  email: userData?.email,
                }),
              );
              navigate(AppRoute.PRACTITIONER_PORTAL, {
                replace: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
