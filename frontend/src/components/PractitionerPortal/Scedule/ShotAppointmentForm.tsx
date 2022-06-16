import { Button } from 'components/common/Button/Button';
import { Radio } from 'components/common/Radio/Radio';
import { Typography } from 'components/common/Typography';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPatientName } from 'store/patient/selectors';

interface AppointmentForm {
  practitionerName: string;
  closeModal: () => void;
  setDuration: (duration: string) => void;
  setType: (type: string) => void;
  setPatientName: (name: string) => void;
}

interface AppointmentFormProps {
  duration: string;
  type: string;
  patientName: string;
}

export const ShortAppointmentForm: React.FC<AppointmentForm> = ({
  practitionerName,
  closeModal,
  setDuration,
  setType,
  setPatientName,
}) => {
  const patientName = useSelector(getPatientName);

  const InitialValues: AppointmentFormProps = {
    duration: '',
    type: '',
    patientName: patientName,
  };
  const onSubmit = (values: AppointmentFormProps) => {
    // console.log(values.duration, values.type, values.patientName);
    closeModal();
    setDuration(values.duration);
    setType(values.type);
    setPatientName(values.patientName);
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
                children={`Family practitioner:  ${practitionerName}`}
                className={'mb-6'}
              />
              <div className="flex flex-col gap-10 mb-6 mt-5">
                <div className="flex flex-col mb-6">
                  <div className="flex flex-col mb-10">
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
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      type="Ag-18-semibold"
                      className={'mb-3 text-greyScaleMainBlack'}
                      children={'Type of the appointment'}
                    />

                    <div className="flex flex-row gap-6">
                      <Radio
                        name="type"
                        label="Offline"
                        onClick={() => setFieldValue('type', 'Offline')}
                      />
                      <Radio
                        name="type"
                        label="Online"
                        onClick={() => setFieldValue('type', 'Online')}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
