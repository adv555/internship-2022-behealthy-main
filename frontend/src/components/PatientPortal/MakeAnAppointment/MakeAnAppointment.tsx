import { Typography } from 'components/common/Typography';
import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout/Layout';
import { Modal } from '../Modal/Modal';
import { ShortAppointmentForm } from '../Forms';
import { ScheduleCalendar } from '../Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';

import { AppointmentsActionCreator } from 'store/appointments/appointments.reducer';
import {
  getPatientData,
  getPatientId,
  getPractitionerId,
  getPractitionerName,
} from 'store/patient/selectors';
import { Checkbox } from 'components/common/Checkbox/Checkbox';

export const MakeAnAppointment: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const patient = useSelector(getPatientData);
  const patientId = useSelector(getPatientId);
  const practitionerName = useSelector(getPractitionerName);
  const patientName = patient?.first_name + ' ' + patient?.last_name;

  const practitionerId = useSelector(getPractitionerId);
  const declarationId =
    patient.declarations?.find(
      (d) => d.status === 'ACTIVE' || d.status === 'REQUESTED',
    )?.id || 0;

  useEffect(() => {
    dispatch(AppointmentsActionCreator.getAppointments());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <div className=" flex justify-between items-center mb-5 mt-5">
          <div>
            <Typography type={'h4'} children={'Schedule'} />
          </div>

          <div>
            <div className="flex flex-col md:flex-row justify-between mb-5">
              <Typography
                type={'Ag-15-medium'}
                children={'Offline'}
                className="mr-2"
              />
              <Checkbox
                onChangeHandler={() => setActive(!active)}
                checked={active}
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <ScheduleCalendar
            openModal={() => setOpen(true)}
            declarationId={declarationId}
            practitionerId={practitionerId}
            patientId={patientId}
            patientName={patientName}
            appointmentDuration={'60'}
            appointmentType={active ? 'Offline' : 'Online'}
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
          />
        </div>
      </Modal>
    </>
  );
};
