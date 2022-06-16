import { Typography } from 'components/common/Typography';
import React, { useState } from 'react';
import { Layout } from '../Layout/Layout';
import { Button } from 'components/common/Button/Button';
import { Modal } from '../Modal/Modal';
import { ShortAppointmentForm } from '../ShotAppointmentForm';
import { ScheduleCalendar } from '../Calendar/Calendar';
// import { useDispatch } from 'react-redux';

// import { AppointmentsActionCreator } from 'store/appointments/appointments.reducer';
// import {
//   getPatientData,
//   getPatientId,
//   getPractitionerId,
//   getPractitionerName,
// } from 'store/patient/selectors';

export const PractitionerMakeAnAppointment: React.FC = () => {
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [patientName, setPatientName] = useState('');

  const declarationId = 0;
  const practitionerId = 0;
  const practitionerName = '';
  const patientId = 0;

  // const patient = useSelector(getPatientData);
  // const patientId = useSelector(getPatientId);
  // const practitionerName = useSelector(getPractitionerName);

  // const practitionerId = useSelector(getPractitionerId);
  // const declarationId =
  //   patient.declarations?.find(
  //     (d) => d.status === 'ACTIVE' || d.status === 'REQUESTED',
  //   )?.id || 0;

  // useEffect(() => {
  //   dispatch(AppointmentsActionCreator.getAppointments());
  // }, [dispatch]);

  return (
    <>
      <Layout>
        <div className=" flex justify-between items-center mb-5 mt-5">
          <div>
            <Typography type={'h4'} children={'Schedule'} />
          </div>

          <div>
            <Button
              nameBtn="decline"
              label="Set an appointment"
              className="w-[100%] desktop:w-[300px]"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        <div className="relative">
          <ScheduleCalendar
            openModal={() => setOpen(true)}
            declarationId={declarationId}
            practitionerId={practitionerId}
            patientId={patientId}
            patientName={patientName}
            appointmentDuration={duration}
            appointmentType={type}
          />
        </div>
      </Layout>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={'Set new appointment'}
      >
        <div className="flex flex-col justify-between h-full pb-10">
          <ShortAppointmentForm
            practitionerName={practitionerName}
            closeModal={() => setOpen(false)}
            setDuration={(duration) => setDuration(duration)}
            setType={(type) => setType(type)}
            setPatientName={(name) => setPatientName(name)}
          />
        </div>
      </Modal>
    </>
  );
};
