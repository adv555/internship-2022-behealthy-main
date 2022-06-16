import { Button } from 'components/common/Button/Button';
import { Radio } from 'components/common/Radio/Radio';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { ErrorMessage, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppointmentsActionCreator } from 'store/appointments/appointments.reducer';
import { DataPickerBlock } from '../DataPicker/DataPickerBlock';
import { selectOptionPractitioners } from './select-options';

interface AppointmentForm {
  declarationId: number;
  closeModal: () => void;
}

interface AppointmentFormProps {
  declaration_id: number;
  duration: string;
  type: string;
  start_time: string;
  end_time: string;
}

const InitialValues: AppointmentFormProps = {
  declaration_id: 0,

  duration: '',
  type: '',
  start_time: '2022-06-10T16:30:00',
  end_time: '2022-06-10T17:30:00',
};

export const AppointmentForm: React.FC<AppointmentForm> = ({
  declarationId,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values: AppointmentFormProps) => {
    const event = {
      ...values,
      declaration_id: declarationId,
    };
    dispatch(AppointmentsActionCreator.postNewAppointment(event));
    closeModal();

    console.log(event);
  };
  return (
    <Formik initialValues={InitialValues} onSubmit={onSubmit}>
      {(props: FormikProps<AppointmentFormProps>) => {
        const { setFieldValue, dirty, resetForm } = props;
        return (
          <Form className="flex flex-col justify-between min-h-full pb-10">
            <div>
              <Typography
                type={'Ag-18-semibold'}
                children={'Family practitioner'}
                className={'mb-6'}
              />
              <div className="flex flex-col gap-6 mb-6 mt-5">
                <SelectField
                  name={'family_practitioner'}
                  options={selectOptionPractitioners}
                  label={'All practitioners'}
                  placeholder={'Choose a practitioner'}
                  className=" w-[276px]"
                />
                <div className="flex flex-row mb-6">
                  <div className="flex flex-col w-1/2">
                    <Typography
                      type="Ag-18-semibold"
                      className={' mb-3 text-greyScaleMainBlack'}
                      children={'Duration for the appointment'}
                    />

                    <div className="flex flex-row gap-6">
                      <Radio
                        name="duration"
                        label="30 min"
                        onClick={() => setFieldValue('duration', '30')}
                      />
                      <Radio
                        name="duration"
                        label="60 min"
                        onClick={() => setFieldValue('duration', '60')}
                      />
                    </div>
                    <ErrorMessage name="duration">
                      {(error) => (
                        <Typography
                          type="Ag-13-medium"
                          className={' text-secondaryRed mt-0.5'}
                          children={error}
                        />
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <Typography
                      type="Ag-18-semibold"
                      className={'mb-3 text-greyScaleMainBlack'}
                      children={'Type of the appointment'}
                    />

                    <div className="flex flex-row gap-6">
                      <Radio
                        name="type"
                        label="Online"
                        onClick={() => setFieldValue('type', 'Online')}
                      />
                      <Radio
                        name="type"
                        label="Offline"
                        onClick={() => setFieldValue('type', 'Offline')}
                      />
                    </div>
                    <ErrorMessage name="type">
                      {(error) => (
                        <Typography
                          type="Ag-13-medium"
                          className={' text-secondaryRed mt-0.5'}
                          children={error}
                        />
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div>
                  <Typography
                    type={'Ag-18-semibold'}
                    children={'Date for the appointment'}
                  />
                </div>
              </div>
              <div className=" mt-10">{/* <DataPickerBlock /> */}</div>
            </div>
            <div className="flex flex-row gap-5 justify-start">
              <Button
                nameBtn="decline"
                label="Cancel"
                className="w-40"
                onClick={() => {
                  resetForm();
                  closeModal();
                }}
                size="sm2"
              />
              <Button
                nameBtn="accept"
                type="submit"
                label="Save"
                className="w-40"
                size="sm2"
                disabled={!dirty}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
