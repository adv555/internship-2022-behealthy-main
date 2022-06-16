import { api } from 'services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AppointmentsActionCreator } from './appointments.reducer';
import { IAppointment, IAppointmentEvent } from './types';

const getAppointmentsList = async () => {
  const appointmentsList = await api.get('/appointments');
  return appointmentsList.data;
};

const getAppointmentsListByPractitionerId = async (
  family_practitioner_id: number,
) => {
  const appointmentsList = await api.get(
    `/appointments/practitioner/${family_practitioner_id}`,
  );
  return appointmentsList.data;
};

const getAppointmentByDeclarationId = async (declarationId: number) => {
  const appointments = await api.get(
    `/appointments/declaration/${declarationId}`,
  );
  return appointments.data;
};

const postAppointment = async (appointment: IAppointmentEvent) => {
  const newAppointment = await api.post('/appointments', appointment);
  console.log(newAppointment);
  return newAppointment.data;
};

const updateAppointment = async (appointment: IAppointmentEvent) => {
  const updatedEvent = await api.patch(
    `/appointments/${appointment.id}`,
    appointment,
  );
  return updatedEvent.data;
};

const deleteAppointment = async (appointmentId: number) => {
  return await api.delete(`/appointments/${appointmentId}`);
};

function* getAppointmentsListWorker() {
  try {
    const appointmentsList: IAppointment[] = yield call(getAppointmentsList);

    yield put(
      AppointmentsActionCreator.appointmentsLoadSuccess(appointmentsList),
    );
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* getAppointmentByDeclarationIdWorker(
  action: ReturnType<typeof AppointmentsActionCreator.getAnAppointment>,
) {
  try {
    yield put(AppointmentsActionCreator.appointmentsStart());
    const appointment: IAppointment = yield call(
      getAppointmentByDeclarationId,
      action.payload.declarationId,
    );
    yield put(AppointmentsActionCreator.setAnAppointment(appointment));
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* getAppointmentsListByPractitionerIdWorker(
  action: ReturnType<
    typeof AppointmentsActionCreator.getPractitionerAppointmentsList
  >,
) {
  try {
    yield put(AppointmentsActionCreator.appointmentsStart());
    const appointmentsList: IAppointment[] = yield call(
      getAppointmentsListByPractitionerId,
      action.payload.family_practitioner_id,
    );
    yield put(
      AppointmentsActionCreator.setPractitionerAppointmentsList(
        appointmentsList,
      ),
    );
    yield put(AppointmentsActionCreator.appointmentsEnd());
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* postAppointmentWorker(
  action: ReturnType<typeof AppointmentsActionCreator.postNewAppointment>,
) {
  try {
    yield put(AppointmentsActionCreator.appointmentsStart());
    const appointment: IAppointmentEvent = yield call(
      postAppointment,
      action.payload,
    );
    yield put(AppointmentsActionCreator.setAnAppointmentEvent(appointment));
    yield put(AppointmentsActionCreator.appointmentsEnd());
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* updateAppointmentWorker(
  action: ReturnType<typeof AppointmentsActionCreator.updateAppointment>,
) {
  try {
    yield put(AppointmentsActionCreator.appointmentsStart());
    const appointment: IAppointmentEvent = yield call(
      updateAppointment,
      action.payload,
    );
    yield put(AppointmentsActionCreator.setAnAppointmentEvent(appointment));
    yield put(AppointmentsActionCreator.appointmentsEnd());
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* deleteAppointmentWorker(
  action: ReturnType<typeof AppointmentsActionCreator.deleteAppointment>,
) {
  try {
    yield put(AppointmentsActionCreator.appointmentsStart());
    yield call(deleteAppointment, action.payload);
    yield put(AppointmentsActionCreator.appointmentsEnd());
  } catch (e) {
    const error = e as Error;
    yield put(
      AppointmentsActionCreator.appointmentsError({
        error: error.message,
      }),
    );
  }
}

function* appointmentsDataWatcher() {
  yield takeEvery(
    AppointmentsActionCreator.getAppointments,
    getAppointmentsListWorker,
  );
  yield takeEvery(
    AppointmentsActionCreator.getAnAppointment,
    getAppointmentByDeclarationIdWorker,
  );
  yield takeEvery(
    AppointmentsActionCreator.postNewAppointment,
    postAppointmentWorker,
  );
  yield takeEvery(
    AppointmentsActionCreator.updateAppointment,
    updateAppointmentWorker,
  );
  yield takeEvery(
    AppointmentsActionCreator.deleteAppointment,
    deleteAppointmentWorker,
  );
  yield takeEvery(
    AppointmentsActionCreator.getPractitionerAppointmentsList,
    getAppointmentsListByPractitionerIdWorker,
  );
}

export { appointmentsDataWatcher };
